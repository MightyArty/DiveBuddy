import React, { useState } from "react";
import { auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Forum.css";
import { useRef } from "react";
import { getDocs, getFirestore } from "firebase/firestore";

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-red-500`,
};

const SendMessage = () => {
  const name = useRef();
  const [input, setInput] = useState("");
  /// getting name from database
  const db = getFirestore();
  const colRef = collection(db, "users");
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      var user_data = doc.data();
      var user_email = user_data.email;
      if (user_email === auth.currentUser.email) {
        name.current = user_data.name;
      }
    });
  });

  const send_func = (event) => {
    event.preventDefault();
    const { uid, displayName } = auth.currentUser;
    addDoc(collection(db, "messages"), {
      text: input,
      name: name.current,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <form onSubmit={send_func} className="form-forum">
      Enter your message
      <input
        className={style.input}
        onChange={(event) => setInput(event.target.value)} ///change ths state of input to the value of what a user writen
        value={input}
        type="text"
        placeholder="Message"
      />
      <button className="button-forum">Send</button>
    </form>
  );
};

export default SendMessage;
