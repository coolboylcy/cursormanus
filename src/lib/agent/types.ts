export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export interface Plan {
  id: string;
  tasks: Task[];
  context: string;
  created_at: Date;
  updated_at: Date;
}

export interface AgentContext {
  messages: Message[];
  currentPlan?: Plan;
  memory: {
    shortTerm: Message[];
    longTerm: Message[];
  }
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey: string;
  baseUrl: string;
} 