import "./Forum.css";
import {auth, db} from '../firebase'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import {useRef} from 'react'

const style = {
  message:
    "flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full",
  name: "fixed  mt-[-4rem] text-gray-600 text-xs", /// the name text
  // sent: 'bg-[#395dff] text-white fle-row-reverse text-end float-right rounded-bl-full',
  // received :  'bg -[#e5e5ea] text-black float-left rounded-br-full'
};

const Message = ({ message }) => {
  /* עיצוב ההודעה בפורום (חלון לבן פלוס שם למעלה פלוס הטקסט של ההודעה)
קודם כל דולים מהבסיס נתונים לתוך משתנה סטייט שהוא רשימה את כל  ההודעות שנשלחו ולאחר מכן שולחים אותן אחת אחת לפונקציה 
זו שמדפיסה אותם בצורה אלגנטית על המסך 
*/

  return (
    <div>
      <div className="message-forum">
        <div className="name-forum">{message.name}</div>
        <div>{message.text} </div>
      </div>
    </div>
  );
};

export default Message;
