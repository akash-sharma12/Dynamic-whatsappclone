import React, { useEffect, useState } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi'
import './SidebarChat.css'
import { db } from '../../../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { onSnapshot, serverTimestamp,  query,  orderBy} from 'firebase/firestore';





function SidebarChat({ id, name, addNewChat }) {

  const [messages, setMessages] = useState("");


  useEffect(() => {                                                                                                                                                                                                                                           
    if (id) {
      const messagesCollectionRef = collection(db, 'rooms', id, 'messages');
      const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'desc'));
  
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, [id]);
  

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      const docRef = await addDoc(collection(db, 'rooms'), {
        name: roomName,
      });
      console.log("Document written with ID: ", docRef.id);
    }
  };

  // const createChat = () =>{

  //   const roomName = prompt("Please enter name for chat room");
  //   if(roomName) {
  //      db.collection("rooms").add({
  //       name: roomName,
  //      });
  //     }
  //   }
  return !addNewChat ? (

    <Link to={`/rooms/${id}`}>
      <div>
        <div className="sidebarchat__info">

          <div className='userfacechat'> <BiSolidUserCircle /></div>


          <div className="chatinfo">
            <h3 className='username'>{name}</h3>
            <p className='lastmessage'>{messages[0]?.message}</p>

          </div>
          <p className='multiuser'>10:04</p>


        </div>
      </div>
    </Link>
  ) :

    (
      <div onClick={createChat} className='sidebarChat'>
        <h2>Add new Chat</h2>
      </div>
    )

}
export default SidebarChat;