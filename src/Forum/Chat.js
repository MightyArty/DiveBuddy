import React from "react";
import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage"; /// REMEMEBER - > ONLY BIG LETTERS IN THE BEGINING
import "./Forum.css";
import { useApiContext } from "../hooks/useApiContext";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { apiCall } = useApiContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiCall("messages");
        console.log(data?.messages);
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddMessage = (message) => {
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
  };

  return (
    <>
      <div className="main-forum">
        <div className="container-forum">
          <h2>Forum</h2>
          {messages &&
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          <SendMessage handleAddMessage={handleAddMessage} scroll={scroll} />
          <span ref={scroll}></span>
        </div>
      </div>
    </>
  );
};
