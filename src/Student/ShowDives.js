import React, { useState } from "react";
import { useEffect,useRef } from "react";
import {db,setAllDocs} from '../firebase'
import {getDocs, collection , where} from 'firebase/firestore'
import { query } from "firebase/firestore";
import './ShowDives.css';


class FetchDivers extends React.Component {
  constructor(props) {
      
      super(props);
     
      this.state = {r: []}
      }
      
    componentDidMount() {
     
      console.log('marcow')
      const colRef = query(collection(db, "Names"), where("name", "==", "tom"));
      getDocs(colRef).then((snapshot) => {
          let rDives = [];
          console.log(snapshot)
          snapshot.docs.forEach(snap => {
              // snap.val() is the dictionary with all your keys/values from the 'students-list' path
             rDives.push({...snap.data()});
          });
          console.log(rDives[0])
          this.setState({ r: rDives[0].dive}); /// only the array full of dives of the current user 
        });
   }
    
   render(){
    return (
      <div >
        <table>
          <tr>
          <th>DiveN</th>
            <th>partner</th>
            <th>date</th>
            <th>diveTime</th>
            <th>max_depth</th>
            <th>confirmed</th>
            <th>site</th>
          </tr>
          {this.state.r.map(data =>  {
            
            return (
              <tr key={data.id}>
                <td>{data.DiveN}</td>
                <td>{data.Partner}</td>
                <td>{data.date}</td>
                <td>{data.DiveTime}</td>
                <td>{data.MaxDepth}</td>
                <td>{data.confirmed}</td>
                <td>{data.Site}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
  }
  export default FetchDivers;