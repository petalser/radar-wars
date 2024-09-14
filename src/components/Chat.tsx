import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { socket } from "../config/socket";

interface ChatProps {
  room: string;
}

const Chat = ({ room }: ChatProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setChat((prev) => [...prev, message]);

      console.log(message);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    if (!message) return;
    socket.emit("chatMessage", { text: message, room });

    inputRef.current.value = "";
  };

  return (
    <div>
      {chat.map((message, index) => (
        <p key={index}>
          {message.user}: {message.text}
        </p>
      ))}
      <form onSubmit={handleSendMessage}>
        <input type="text" ref={inputRef} />
        <button>Send message</button>
      </form>
    </div>
  );
};

const StyledChat = styled(Chat)``;

export default StyledChat;
