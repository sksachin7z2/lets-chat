import React,{useState,useEffect} from 'react';
import queryString from 'query-string'
import { useLocation,useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../Infobar/InfoBar';
import Input from '../Input/Input';
import Message from '../Messages/Messages.js'
import TextContainer from '../TextContainer/TextContainer';
let socket;
function Chat() {
  let navigate=useNavigate();
  const [users, setUsers] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let location=useLocation();
  const [name, setName] = useState('');
const [room, setRoom] = useState(''); 
const ENDPOINT="http://localhost:5000";
  useEffect(() => {
    const {name,room}=queryString.parse(location.search);
        socket=io(ENDPOINT);
        setName(name);
        setRoom(room);
       socket.emit('join',{name,room},(error)=>{
        //  console.log(error)
        if(error) {
          navigate('/');
          alert(error);
        }
       });
      //  return ()=>{
      //    socket.emit('disconnect');
      //    socket.off();
      //
      //  }
  },[ENDPOINT,location.search,navigate]);
  // setUsers(users);
  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages,message]);
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  },[messages]);

  //function for sending message
  const sendMessage=(event)=>{
   event.preventDefault();
    if(message){
      socket.emit('sendMessage',message,new Date().toLocaleTimeString(),()=>setMessage(''))
    }
    
  }
  

  return (
  <>
  
  <div className='card'>

  <div className="row g-0">
    <div className="col-md-4 dnone" style={{borderRight:"2px solid black",overflow:"hidden scroll"}}>
    <TextContainer users={users} />
    </div>
  
   <div className='col-md-8' style={{height:"100vh"}}>
     
     <InfoBar room={room} setUsers={setUsers}/>
     <Message messages={messages} name={name}/>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}  />
      
   </div>
   </div>
  </div>
   
   
    </>
  );
}

export default Chat;
