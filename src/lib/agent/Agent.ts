import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { AgentConfig, AgentContext, Message, Plan, Task } from './types';

export class Agent {
  private config: AgentConfig;
  private context: AgentContext;
  private api: any;

  constructor(config: AgentConfig) {
    this.config = config;
    this.context = {
      messages: [],
      memory: {
        shortTerm: [],
        longTerm: []
      }
    };
    this.api = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
  }

  private async generateResponse(messages: Message[], systemPrompt?: string) {
    try {
      const allMessages = systemPrompt 
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : messages;

      const response = await this.api.post('/chat/completions', {
        model: this.config.model,
        messages: allMessages,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw error;
    }
  }

  private async createPlan(userInput: string): Promise<Plan> {
    const systemPrompt = `You are a task planning assistant. Your role is to:
1. Analyze the user's request carefully
2. Break it down into 5-6 clear, actionable tasks
3. Ensure tasks are sequenced logically
4. Consider dependencies between tasks
5. Make tasks specific and measurable
6. The final task should always be "Generate a comprehensive summary report"

Format each task as a clear, actionable item on a new line.
IMPORTANT: Break down the request into AT MOST 6 tasks, including the final summary task.`;

    const planningPrompt = `Given the following user request, create a detailed plan of 5-6 tasks to accomplish it:
    
${userInput}

Break this down into specific, actionable tasks. Each task should be clear and achievable.
Consider any dependencies between tasks.
IMPORTANT: The last task must be to generate a comprehensive summary report of all findings and results.`;

    const planningMessage: Message = {
      role: 'user',
      content: planningPrompt
    };

    const planResponse = await this.generateResponse([...this.context.messages, planningMessage], systemPrompt);
    let tasks: Task[] = planResponse.split('\n')
      .filter((line: string) => line.trim())
      .map((task: string) => ({
        id: uuidv4(),
        description: task.replace(/^\d+\.\s*/, '').trim(), // Remove leading numbers
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      }));

    // Ensure we have at most 6 tasks
    tasks = tasks.slice(0, 6);
    
    // Ensure the last task is for generating a summary report
    if (!tasks[tasks.length - 1].description.toLowerCase().includes('summary') &&
        !tasks[tasks.length - 1].description.toLowerCase().includes('report')) {
      tasks.push({
        id: uuidv4(),
        description: 'Generate a comprehensive summary report of all findings and results',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date()
      });
      tasks = tasks.slice(0, 6); // Ensure we still have at most 6 tasks
    }

    return {
      id: uuidv4(),
      tasks,
      context: userInput,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  private async executeTask(task: Task): Promise<string> {
    const systemPrompt = task.description.toLowerCase().includes('summary') || 
                        task.description.toLowerCase().includes('report')
      ? `You are a report generation assistant. Your role is to:
1. Review all previous tasks and their outputs
2. Synthesize the information into a coherent narrative
3. Present findings in a clear, structured format
4. Include relevant data and insights
5. Provide actionable conclusions and recommendations

Format the report with clear sections, bullet points where appropriate, and a professional tone.`
      : `You are a task execution assistant. Your role is to:
1. Understand the task and its context thoroughly
2. Provide detailed, step-by-step guidance
3. Consider potential challenges and solutions
4. Give practical, actionable advice
5. Maintain context awareness with previous tasks`;

    const taskPrompt = task.description.toLowerCase().includes('summary') || 
                      task.description.toLowerCase().includes('report')
      ? `Generate a comprehensive summary report based on all completed tasks:

Context: ${this.context.currentPlan?.context}

Previous tasks and their results:
${this.context.messages
  .filter(m => m.role === 'assistant')
  .map(m => m.content)
  .join('\n\n')}

Please provide a well-structured report that synthesizes all the information and presents clear conclusions.`
      : `Execute the following task based on the current context:
    
Task: ${task.description}
Context: ${this.context.currentPlan?.context}

Previous completed tasks:
${this.context.currentPlan?.tasks
  .filter(t => t.status === 'completed')
  .map(t => `- ${t.description}`)
  .join('\n')}

Provide a detailed response on how to accomplish this task.`;

    const taskMessage: Message = {
      role: 'user',
      content: taskPrompt
    };

    return this.generateResponse([...this.context.messages, taskMessage], systemPrompt);
  }

  public async processInput(userInput: string): Promise<string> {
    // Add user input to context
    this.context.messages.push({
      role: 'user',
      content: userInput
    });

    try {
      // Create plan if none exists
      if (!this.context.currentPlan) {
        this.context.currentPlan = await this.createPlan(userInput);
        const firstTask = this.context.currentPlan.tasks[0];
        firstTask.status = 'in_progress';
        const response = await this.executeTask(firstTask);
        firstTask.status = 'completed';
        firstTask.updated_at = new Date();

        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        };
        this.context.messages.push(assistantMessage);
        this.updateMemory(assistantMessage);

        // Automatically execute next task
        return this.processInput('continue');
      }

      // Execute all pending tasks
      const pendingTasks = this.context.currentPlan.tasks.filter(task => task.status === 'pending');
      
      if (pendingTasks.length === 0) {
        // All tasks completed, reset plan
        this.context.currentPlan = undefined;
        return "All tasks completed! You can start a new request.";
      }

      // Execute the next pending task
      const nextTask = pendingTasks[0];
      nextTask.status = 'in_progress';
      
      try {
        const response = await this.executeTask(nextTask);
        nextTask.status = 'completed';
        nextTask.updated_at = new Date();

        // Add response to context
        const assistantMessage: Message = {
          role: 'assistant',
          content: response
        };
        this.context.messages.push(assistantMessage);
        this.updateMemory(assistantMessage);

        // If there are more tasks, automatically continue
        if (pendingTasks.length > 1) {
          return this.processInput('continue');
        }

        return response;
      } catch (error) {
        nextTask.status = 'failed';
        throw error;
      }
    } catch (error) {
      console.error('Error processing input:', error);
      throw error;
    }
  }

  private updateMemory(message: Message) {
    // Add to short-term memory
    this.context.memory.shortTerm = [...this.context.memory.shortTerm, message];
    
    // Move older messages to long-term memory if short-term memory is full
    if (this.context.memory.shortTerm.length > 10) {
      const oldestMessages = this.context.memory.shortTerm.splice(0, this.context.memory.shortTerm.length - 10);
      this.context.memory.longTerm = [...this.context.memory.longTerm, ...oldestMessages];
      
      // Keep only last 50 messages in long-term memory
      if (this.context.memory.longTerm.length > 50) {
        this.context.memory.longTerm = this.context.memory.longTerm.slice(-50);
      }
    }
  }

  public getCurrentPlan(): Plan | undefined {
    return this.context.currentPlan;
  }

  public getContext(): AgentContext {
    return this.context;
  }

  public resetPlan(): void {
    this.context.currentPlan = undefined;
  }

  public async retryFailedTask(): Promise<string> {
    if (!this.context.currentPlan) {
      throw new Error('No current plan exists');
    }

    const failedTask = this.context.currentPlan.tasks.find(task => task.status === 'failed');
    if (!failedTask) {
      throw new Error('No failed tasks to retry');
    }

    failedTask.status = 'pending';
    failedTask.updated_at = new Date();
    return this.processInput(this.context.currentPlan.context);
  }
} 