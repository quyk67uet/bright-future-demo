"use client";
import axios from "axios";
import React, { useState } from "react";
import { MessageCircle, X, Send, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      content:
        "Xin chào! Tôi có thể giúp bạn với dự đoán tiết kiệm năng lượng, tư vấn lắp đặt hoặc hỗ trợ kỹ thuật. Bạn muốn biết gì?",
    },
  ]);

  const sampleQuestions = [
    "Dự đoán tiết kiệm của tôi cho tuần tới là gì?",
    "Cách cải thiện hiệu suất của tấm pin mặt trời?",
    "Cần bảo trì gì cho các tấm pin mặt trời?",
  ];
  interface ChatRequest {
    message: string;
    session_id?: string;
    language?: string;
    create_new_session?: boolean;
  }

  interface ChatResponse {
    message: string;
    is_complete: boolean;
    chat_history: {
      role: string;
      content: string;
    }[];
  }

  const sendChatRequest = async (
    chatRequest: ChatRequest
  ): Promise<ChatResponse> => {
    try {
      const response = await axios.post<ChatResponse>(
        "http://localhost:8000/chatbot/chat",
        chatRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error sending chat request:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    let answer = "";
    if (message.trim()) {
      // Add user message
      setChatHistory([...chatHistory, { type: "user", content: message }]);
      try {
        const chatRequest: ChatRequest = {
          message: message,
          session_id: "string",
          language: "string",
          create_new_session: false,
        };
        const response = await sendChatRequest(chatRequest);
        answer =
          response["chat_history"][response["chat_history"].length - 1][
            "content"
          ];
      } catch (error) {
        console.error("There was an error making the request!", error);
      }

      // Simulate bot response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            content: answer,
          },
        ]);
      }, 1000);

      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 shadow-xl">
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Solar Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                  onClick={() => setIsExpanded(false)}
                />
              ) : (
                <ChevronUp
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                  onClick={() => setIsExpanded(true)}
                />
              )}
              <X
                className="w-5 h-5 cursor-pointer hover:opacity-80"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          {isExpanded && (
            <>
              {/* Chat History */}
              <CardContent className="h-80 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Sample Questions */}
              <div className="px-4 py-2 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full hover:bg-purple-200"
                      onClick={() => setMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
