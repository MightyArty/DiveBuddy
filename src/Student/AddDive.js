import './AddDive.css';
import {useEffect, useState} from 'react';
import {collection, getDocs, addDoc, query, where, setDoc, onSnapshot} from 'firebase/firestore'
import {auth, db} from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { user } from 'firebase/auth';

// const Add_dive = async () => { 
//   const usersCollection = query(collection(db, "users"), where("email", "==", "example2@gmail.com"));
//   const user_doc = await getDocs(usersCollection);
//   const queryData = user_doc.docs.map((detail) => ({
//     ...detail.data(),
//     id: detail.id,
// }));
//   //console.log(queryData);
//   let details = [1,2];
//   setDoc(usersCollection, details);
// }

function App() {
  const [user, loading, error] = useAuthState(auth);

  const [count, setCount] = useState(1);
  const [date, setDate] = useState('');
  const [site, setSite] = useState('');
  const [equipment, setEquipment] = useState('');
  const [dive_duration, setDiveDuration] = useState();
  const [depth, setDepth] = useState();
  const [note, setNote] = useState('');

  return (    
    <form>  
    <div className='main-AddDive'>
      <div>
        Diving Number: {count} {()=>setCount(count + 1)}
      </div>
      <div>
        Date: <input required type="Date" className='block'
         value={date} onChange={(e)=>setDate(e.target.value)}/>

        Site: <input required type="text" className='block'
         value={site} onChange={(e)=>setSite(e.target.value)}/>

        Special equipment: <input type="text"
         value={equipment} onChange={(e)=>setEquipment(e.target.value)}/>
      </div>
      <div>
        Dive duration (minutes): <input required type="number" className='block'
         value={dive_duration} onChange={(e)=>setDiveDuration(e.target.value)}/>

        Depth (m) = <input required type="number"
         value={depth} onChange={(e)=>setDepth(e.target.value)}/>
      </div>
      <div>
        Note:<br/>
        <textarea rows='4' value={note} onChange={(e)=>setNote(e.target.value)}></textarea>
      </div>
      <button /*onClick={Add_dive}*/ className='neon-btn'>Add Dive</button>
    </div>
    </form>
    
  );
}

export default App;
