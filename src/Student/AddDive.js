import './AddDive.css';
import {useState} from 'react';
import {UpdateDoc} from './updateDoc';


/**A page that allows the user to fill in details about
 * a dive he has performed, and insert it into a json array
 * named "dives" which is under the user's id in firestore. */

function App() {
  const [date, setDate] = useState('');
  const [site, setSite] = useState('');
  const [equipment, setEquipment] = useState('');
  const [dive_duration, setDiveDuration] = useState('');
  const [depth, setDepth] = useState('');
  const [note, setNote] = useState('');
  
  return (    

    <form onSubmit={(e)=> {e.preventDefault(); UpdateDoc(date, site, equipment, dive_duration, depth, note)}}>  
    <div className='main-AddDive'>
      <div>
        Date: <input type="Date" required={true} className='block'
         value={date} onChange={(e)=>setDate(e.target.value)}/>

        Site: <input type="text" required={true} className='block'
         value={site} onChange={(e)=>setSite(e.target.value)}/>

        Special equipment: <input type="text"
         value={equipment} onChange={(e)=>setEquipment(e.target.value)}/>
      </div>
       <div>
        Dive duration (minutes): <input type="number" required={true} className='block'
         value={dive_duration} onChange={(e)=>setDiveDuration(e.target.value)}/>

        Depth (m) = <input type="number" required={true}
         value={depth} onChange={(e)=>setDepth(e.target.value)}/>
      </div>
      <div>
        Note:<br/>
        <textarea rows='4' value={note} onChange={(e)=>setNote(e.target.value)}></textarea> 
      </div>
      <button type="submit" className='neon-btn'>Add Dive</button>
    </div>
    </form>
    
  );
}

export default App;
