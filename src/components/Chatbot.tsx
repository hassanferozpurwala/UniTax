import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Define Gemini API response interface
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm UniTax AI powered by Gemini. How can I help with your tax questions today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Your Gemini API key - using Vite's environment variable format
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
  
  // Updated API URL and model name based on latest Gemini API
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent';

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const fetchGeminiResponse = async (userQuestion: string): Promise<string> => {
    try {
      console.log('Fetching response from Gemini API...');
      console.log(`API URL: ${GEMINI_API_URL}?key=***`); // Log URL without the actual key
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are UniTax AI, a helpful assistant for university students with tax questions.
                  Follow these guidelines when answering:
                  1. Use simple, everyday language avoiding complex tax jargon
                  2. Explain concepts as if talking to someone with no tax knowledge
                  3. Give short simple answers, then elaborate if asked
                  
                  User question: ${userQuestion}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error details:', errorData);
        return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
      }

      const data: GeminiResponse = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error fetching from Gemini:', error);
      return "I'm sorry, there was an error connecting to my knowledge base. Please try again later.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from Gemini AI
      const aiResponse = await fetchGeminiResponse(userMessage.text);
      
      const botMessage: Message = {
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error in AI response:', error);
      
      const errorMessage: Message = {
        text: "I'm sorry, I encountered an error while processing your question. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'} text-white transition-all duration-300 z-50`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
      
      {/* Chat window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Chat header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-medium">UniTax AI Assistant</h3>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs sm:max-w-sm p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                }`}
              >
                <div className="flex items-start">
                  {!message.isUser && (
                    <MessageSquare className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.isUser && (
                    <User className="h-5 w-5 ml-2 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-bl-none">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a tax question..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`p-2 rounded-r-md transition-colors ${
              isLoading || inputValue.trim() === '' 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            disabled={isLoading || inputValue.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;