import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/messages.css'
// import ReactPlayer from "react-player";
export default function MessageDetails({apiBaseUrl}) {
    const { id } = useParams();
    const [data,setData]=useState([])
    const [firstname,setFirstName]=useState([])
    const [lastname,setLastName]=useState([])
    const [content,setContent]=useState([])
    const [email,setEmail]=useState([])
 useEffect(() => {
     axios
     .get(`${apiBaseUrl}/messages/${id}`)
     .then((res)=>{
          console.log(res.data)
         setData(res.data)
         setFirstName(res.data.firstname)
         setLastName(res.data.lastname)
         setContent(res.data.content)
         setEmail(res.data.email)
     })      
     .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        <div className="message-detail-container">
         <div className="message-detail-wrapper">
                {/* {!data.isActive? */}
            <h2> From: <span>{firstname}</span> <span>{lastname}</span> Email: <span>{email}</span></h2> 
                <p>{content}</p>
                 {/* <button className='submit-button' type='button'>Reply</button>&nbsp; &nbsp;  */}
                    <Link to="/messages"><button className="submit-button back-to-trailers-btn"> Back to Messages List</button></Link>  
         </div>
        </div>
    )
}