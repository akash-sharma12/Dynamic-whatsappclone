import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { BiSolidUserCircle, BiSolidMessageDetail, BiLoaderCircle } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io'
import { AiOutlineMore } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs';
import SidebarChat from './SidebarChat/SidebarChat';
import { db } from '../../firebase'; 
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../../StateProvider';




function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'rooms'), snapshot => {
            
    
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))

                
            )
            })

            return () => {
                unsubscribe();

            }
        
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
            <div className="userface">
  < BiSolidUserCircle/>  
</div>
                <div className="dotted">
                    <AiOutlineMore/>
                </div>
                <div className='message'>
                    <BiSolidMessageDetail/>
                </div>

                <div className='status'>
                    <BiLoaderCircle/>
                 </div>

                <div className='communities'>
                    <IoIosPeople/>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchcontainer">
                    <input className='inputbar' placeholder="Search or Start a new chat" type="text" />
                    <div className='filtericon'>
                        <BsFilter/>
                    </div>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name}/>

                ))}
            </div>
        </div>
    );
}

export default Sidebar;






// img src={user?.photoURL} alt="User" 
