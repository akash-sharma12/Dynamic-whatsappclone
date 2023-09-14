import React, { useState, useEffect } from 'react';
import './Chat.css';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineMore } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { PiMicrophoneFill } from 'react-icons/pi';
import { IoIosAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';
import firebase from "../../firebase"
import {  doc,  onSnapshot, addDoc, serverTimestamp,  collection,  query,  orderBy,  getFirestore,} from 'firebase/firestore';

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const firestore = getFirestore(); // Get Firestore instance
      const roomDocRef = doc(firestore, 'rooms', roomId);
      const messagesCollectionRef = collection(roomDocRef, 'messages');
      const messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'asc'));

      const roomUnsubscribe = onSnapshot(roomDocRef, (snapshot) => {
        if (snapshot.exists()) {
          setRoomName(snapshot.data().name);
        } else {
          console.log('Room document does not exist.');
        }
      });



      const messagesUnsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

      return () => {
        roomUnsubscribe();
        messagesUnsubscribe();
      };
    }
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
  
    const roomCollectionRef = collection(db, 'rooms', roomId, 'messages');
  
    await addDoc(roomCollectionRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });
  
    setInput('');
  };
  

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="userface">
          <BiSolidUserCircle />
        </div>
        <div className="headerinfo">
          <h3 className="username1">{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
          
          <div className="three-dotted">
            <AiOutlineMore />
          </div>
          <div className="searchicon">
            <BiSearchAlt2 />
          </div>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${ message.name === user.displayName && 'chat__reciever'}`} key={message.id}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="time__stamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        {/* Add more chat messages here */}
      </div>

      <div className="chat__footer">
        <div className="addsign">
          <IoIosAdd />
        </div>
        <input
          type="text"
          className="input-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} type="Submit">
          Send
        </button>
        <div className="microphone">
          <PiMicrophoneFill />
        </div>
      </div>
    </div>
  );
}

export default Chat;
