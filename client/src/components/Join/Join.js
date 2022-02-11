import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import './Join.css'
function Join() {
 

const [name, setName] = useState('');
const [room, setRoom] = useState(''); 


  return <div className='joinOuterContainer'>

<div className='joinInnerContainer'>
  <h1 className='heading'>Join</h1>
  <div><input placeholder='username' type="text" className='joinInput' name="" id="" value={name} onChange={(event)=>{setName(event.target.value)}}/></div>  
  <div><input placeholder='room' type="text" className='joinInput' name="" id="" value={room} onChange={(event)=>{setRoom(event.target.value)}}/></div>  
  <Link onClick={event=>(!name|| !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
  <button className='button mt-20'type='submit'>Sign In</button>
  </Link>
  
  </div>      


  </div>;
}

export default Join