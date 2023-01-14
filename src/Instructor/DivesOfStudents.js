import React from "react";
import {db} from '../firebase'
import {getDocs, collection , where} from 'firebase/firestore'
import { query } from "firebase/firestore";
import './DivesOfStudents.css';
import {  setDoc, doc} from 'firebase/firestore'

 
class DivesOfStudents extends React.Component{

  constructor(props) {    
      super(props);
      this.state = {data:  [],
      fdives : {}}
  }

   componentDidMount() {
      const colRef = query(collection(db, "users"), where("title", "==", "Student"));
      let isConfirmed = false;
      let dive_data = [];
      const fdives2 = {};
      getDocs(colRef).then((snapshot) => {
          
          snapshot.docs.forEach(snap => {
              var id  =snap.data().id 
              snap.data().dives.forEach(dive =>{
                  isConfirmed = dive.confirmed;
                  if(isConfirmed == false){
                       dive_data.push(dive);
                       fdives2[dive.id] = id
                  };

              }) 
              
          });
            this.setState({data: dive_data });

        })
  }

  
  async handleConfirmed(dive) {
    
      const usersCollection = query(collection(db, "users"), where("name", "==", dive.name))
      const user_doc = await getDocs(usersCollection);
      const user_data = user_doc.docs[0];
    
      let dives = user_doc.docs[0].data().dives
      dives.forEach(_dive=>{
          if(_dive.id === dive.id){
            _dive.confirmed = true;
          }
      })
      const docRef = doc(db, "users", user_data.id);
      const payload = { ...user_data.data(), dives };
      setDoc(docRef, payload);
  }


    render(){   
    return (
      <div className="main-DivesOfStudents">
      <div> 
        <table>
          <tbody>
            <th>dive_id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Site</th>
            <th>Dive Duration</th>
            <th>Depth</th>
            <th>Special Equipment</th>
            <th>Note</th>
          {this.state.data.map(dive =>  {
             return (
              <tr key={dive.id}>
                <td>{dive.id}</td>
                <td>{dive.name}</td>
                <td>{dive.email}</td>
                <td>{dive.date}</td>
                <td>{dive.site}</td>
                <td>{dive.dive_duration}</td>
                <td>{dive.depth}</td>
                <td>{dive.equipment}</td>
                <td>{dive.note}</td>
                <td><button className="neon-btn" onClick={() => this.handleConfirmed(dive)}>Confirmed</button></td>
              </tr> 
            )
          })}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
 export default DivesOfStudents;