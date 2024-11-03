"use client";

import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { env } from "~/env";

interface Message {
  text: string;
  sender: "user" | "admin";
}

interface ChatButtonProps {
  user: User;
}

export function ChatButton({ user }: ChatButtonProps) {
  const [isChatOpen, setChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    console.log("Chat button clicked");
    setChatOpen(true);

    if (!socket) {
      const newSocket: Socket = io(env.NEXT_PUBLIC_API_URL, {
        query: { role: "client" },
        transports: ["websocket"],
        upgrade: false,
      });

      newSocket.on("messageFromAdmin", (data: { message: string }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: "admin" },
        ]);
      });

      newSocket.on("connect", () => {
        console.log("Connected to WebSocket Server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from WebSocket Server");
      });

      setSocket(newSocket);
    }
  };

  const handleCloseChat = () => {
    console.log("Chat closed");
    setChatOpen(false);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && socket) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      socket.emit("messageToAdmin", inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      setIsTransitioning(true);
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-16 right-16 z-50 flex flex-col items-center">
      {!isChatOpen ? (
        <div
          className="group relative flex h-16 w-16 items-center justify-center transition-transform duration-300 hover:scale-110 hover:from-gray-500 hover:to-gray-800"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            icon={faHeadset}
            className="h-14 w-14 animate-bounce text-purple-800"
          />
          <div className="absolute bottom-20 mb-2 whitespace-nowrap rounded-full bg-gray-800 px-4 py-2 text-center text-sm font-semibold opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
            ¡Chat with us!
          </div>
        </div>
      ) : (
        <div
          className={`flex h-96 w-96 flex-col rounded-lg border bg-zinc-800 bg-opacity-100 p-4 shadow-lg transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center justify-between border-b pb-2">
            <h4 className="text-lg font-semibold text-purple-500">
              GameVault - Admin
            </h4>
            <button className="text-white" onClick={handleCloseChat}>
              X
            </button>
          </div>
          <div className="mb-2 flex-1 overflow-y-auto border-b">
            <div key="" className={"p-2 text-left"}>
              <p className={"inline-block max-w-[70%] p-2"}>
                Admin: Hello, how can we help you?. We will be with you soon.
              </p>
            </div>
            <div className="flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <p className={`inline-block max-w-[70%] p-2`}>
                    {msg.sender === "user" ? `${user.name}:` : "Admin: "}
                    {msg.text}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-2 flex">
            <Input
              type="text"
              className="flex-1 rounded-lg border bg-white p-2"
              placeholder="Write your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" className="ml-2 font-bold text-purple-500">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
