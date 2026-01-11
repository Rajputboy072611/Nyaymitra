import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  if (sender === 'user') {
    return (
      <div className="flex gap-3 justify-end max-w-3xl ml-auto animate-slide-up">
        <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-sm shadow-lg max-w-2xl">
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-slate-300">
          <User className="w-5 h-5 text-slate-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 max-w-3xl animate-slide-up">
      <div className="w-9 h-9 bg-gradient-to-br from-sky-100 to-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border border-sky-50">
        <Bot className="w-5 h-5 text-sky-600" />
      </div>
      <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex-1">
        <div 
          className="text-sm leading-relaxed text-slate-700 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};
