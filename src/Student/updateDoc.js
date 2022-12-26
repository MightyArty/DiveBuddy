import {collection, getDocs, query, where, setDoc, doc} from 'firebase/firestore'
import {auth, db} from '../firebase'

export const UpdateDoc = async (date, site, equipment, dive_duration, depth, note) => {
    const usersCollection = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
    const user_doc = await getDocs(usersCollection);
    const user_data = user_doc.docs[0];

    const new_dive = {
        "date": date,
        "site": site,
        "equipment": equipment,
        "dive_duration": dive_duration,
        "depth": depth,
        "note": note,
        "confirmed": 'false'
    };
    
    // update doc user
    let dives = [...user_doc.docs[0].data().dives, new_dive];
    const docRef = doc(db, "users", user_data.id);
    const payload = { ...user_data.data(), dives };
    setDoc(docRef, payload);
}
