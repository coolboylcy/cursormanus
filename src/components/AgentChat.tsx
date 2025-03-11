'use client';

import { useState, useRef, useEffect } from 'react';
import { Plan, Task } from '@/lib/agent/types';

interface AgentResponse {
  response: string;
  plan?: Plan;
  context: {
    messages: Array<{
      role: string;
      content: string;
    }>;
  };
}

export default function AgentChat() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from agent');
      }

      const data: AgentResponse = await response.json();
      
      setMessages(prev => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: data.response }
      ]);
      
      if (data.plan) {
        setCurrentPlan(data.plan);
      }
      
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'in_progress':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'failed':
        return '✗';
      case 'in_progress':
        return '⋯';
      default:
        return '○';
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] flex flex-col p-2">
      <div className="flex-1 min-h-0 grid grid-cols-[2fr,1fr] gap-2">
        <div className="flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg mb-2 ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-auto'
                    : 'bg-gray-100 mr-auto'
                } max-w-full`}
              >
                <div className="text-xs text-gray-500">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Processing..." : "Type your request..."}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              className={`px-3 py-1 bg-blue-500 text-white rounded text-sm ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Send'}
            </button>
          </form>
        </div>

        <div className="overflow-y-auto bg-gray-50 rounded-lg p-2">
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-xs">
              {error}
            </div>
          )}

          {currentPlan && (
            <>
              <h3 className="font-semibold text-sm mb-1">Current Plan</h3>
              <div className="text-xs text-gray-500 mb-1">
                {new Date(currentPlan.created_at).toLocaleString()}
              </div>
              <ul className="space-y-1">
                {currentPlan.tasks.map((task: Task) => (
                  <li
                    key={task.id}
                    className={`flex items-center space-x-1 text-xs ${getTaskStatusColor(task.status)}`}
                  >
                    <span>{getTaskStatusIcon(task.status)}</span>
                    <span className="flex-1 break-words">{task.description}</span>
                    <span className="text-xs text-gray-500">
                      ({task.status})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 