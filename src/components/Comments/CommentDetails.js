import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/comments.css'

export default function CommentDetails({apiBaseUrl}) {
    const { id } = useParams();
    const [data,setData]=useState([])
    const [firstname,setFirstName]=useState([])
    const [lastname,setLastName]=useState([])    

 useEffect(() => {
     axios
     .get(`${apiBaseUrl}/comments/${id}`)
     .then((res)=>{
         console.log(res.data)
         setData(res.data.response[0])
         setFirstName(res.data.response[0].userId[0].firstname)
         setLastName(res.data.response[0].userId[0].lastname)
       
     })      
     .catch((err) => {
        console.log(err);
    });
 }, []) 
    return (
        <div className="comment-detail-container">
         <div className="comment-detail-wrapper">
                {!data.isActive?
            <h2> Comment was blocked. Reason: <span>{data.reasonToBlock}</span></h2> 
            :null
            }
                <div>
                    <div className="comment-author-container">
                            <h1>{firstname} {lastname}</h1>
                    </div>
                        <h2>{data.content}</h2> 
                </div>        
                    <Link to="/commentlist"><button className="submit-button back-to-trailers-btn"> Back to Comment List</button></Link>  
         </div>     
        </div>
    )
}