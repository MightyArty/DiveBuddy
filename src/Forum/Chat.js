import React from "react";
import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import SendMessage from "./SendMessage"; /// REMEMEBER - > ONLY BIG LETTERS IN THE BEGINING
import "./Forum.css";
import { useNavigate } from "react-router-dom";

const style = {
  main: `flex flex-col p-[10px]`,
};

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const scroll = useRef();

  /*תתרחש רק פעם אחת  const q = query(collection(db, 'messages'), orderBy('timestamp')); אנחנו רוצים שהשורה 
  שבא אנחנו  
  */
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp")); // reference to the wanted collection - only render ones
    onSnapshot(q, (querySnapshot) => {
      // real time listiner to the wanted collection
      console.log("here you are ");
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log({ messages });
      setMessages(messages);
    });
  }, []);

  return (
    <>
      <div className="main-forum">
        <div className="container-forum">
          <h2>Forum</h2>
          {messages &&
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          <SendMessage scroll={scroll} />
          <span ref={scroll}></span>
        </div>
      </div>
    </>
  );
};
