"use client";

import { CornerDownLeft, Mic, Paperclip, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface ClientMessage {
  clientId: string;
  messages: string[];
}

export default function ChatboxAdmin() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [clients, setClients] = useState<Map<string, ClientMessage>>(new Map());
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      query: { role: "admin" },
    });

    newSocket.on(
      "messageFromClient",
      (data: { clientId: string; message: string }) => {
        setClients((prev) => {
          const clientMessages = prev.get(data.clientId) || {
            clientId: data.clientId,
            messages: [],
          };
          clientMessages.messages.push(data.message);
          return new Map(prev).set(data.clientId, clientMessages);
        });
      },
    );

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh on form submission
    if (socket && selectedClientId && messageInput.trim()) {
      socket.emit("messageToClient", {
        clientId: selectedClientId,
        message: messageInput,
      });
      setMessageInput("");
    }
  };

  // Extraer mensajes del cliente seleccionado
  const currentClientMessages = selectedClientId
    ? clients.get(selectedClientId)?.messages
    : [];

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Chat Box</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <div className="mx-auto w-full max-w-md rounded-lg bg-background shadow">
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold">Customers messages</h2>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="p-4">
                  {currentClientMessages?.map((message, index) => (
                    <div
                      key={index}
                      className="mb-6 flex items-start space-x-4"
                    >
                      <Avatar>
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Client {selectedClientId}
                        </p>
                        <div className="mt-1 flex items-center">
                          <p className="truncate text-sm text-muted-foreground">
                            {message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) || <p>No messages</p>}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1" />
            <form
              onSubmit={handleSendMessage}
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
