import React, { useState } from "react";
import { useEffect,useRef } from "react";
import {db,auth} from '../firebase'
import {getDocs, collection , where} from 'firebase/firestore'
import { query } from "firebase/firestore";
import './ShowDives.css';


class FetchDivers extends React.Component {
  constructor(props) {
      
      super(props);
     
      this.state = {r: []}
      }
      
    componentDidMount() {
      const colRef = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      getDocs(colRef).then((snapshot) => {
          let rDives = [];
          console.log(snapshot)
          snapshot.docs.forEach(snap => {
              // snap.val() is the dictionary with all your keys/values from the 'students-list' path
             rDives.push({...snap.data()});
          });
          console.log(rDives[0])
          this.setState({ r: rDives[0].dives}); /// only the array full of dives of the current user 
        });
   }
    
   render(){
    return (
      <div >
        <table>
          <tr>
            <th>Confirmed</th>
            <th>Date</th>
            <th>Site</th>
            <th>Dive Duration</th>
            <th>Depth</th>
            <th>Special Equipment</th>
            <th>Note</th>
          </tr>
          {this.state.r.map(data =>  {
            
            return (
              <tr key={data.id}>
                <td>{data.confirmed}</td>
                <td>{data.date}</td>
                <td>{data.site}</td>
                <td>{data.dive_duration}</td>
                <td>{data.depth}</td>
                <td>{data.equipment}</td>
                <td>{data.note}</td>
                
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
  }
  export default FetchDivers;