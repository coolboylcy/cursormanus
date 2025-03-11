import { NextRequest, NextResponse } from 'next/server';
import { Agent } from '@/lib/agent/Agent';

const agent = new Agent({
  model: 'deepseek-chat',
  temperature: 0.7,
  maxTokens: 1000,
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseUrl: 'https://api.deepseek.com/v1'
});

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    const response = await agent.processInput(input);
    const currentPlan = agent.getCurrentPlan();
    const context = agent.getContext();

    return NextResponse.json({
      response,
      plan: currentPlan,
      context
    });
  } catch (error) {
    console.error('Error processing agent request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 