import React, { useEffect, useState} from "react";
import axios from "axios";
import Widgets from './Widgets';
import MovieCard from './MovieCard';
import Doughnut2 from "./Doughnut2";
import RecentView from "./RecentView";
import '../../styles/dashboard.css'
import moment from "moment";

export default function Dashboard({apiBaseUrl}) { 
    const[users, setUsers] = useState('');
    const[todaysUsers, setTodaysUsers] = useState('');
    const[lists, setLists] = useState('');
    const[todaysLists, setTodaysLists] = useState('');
    

    console.log(users)
    console.log(lists)

    useEffect(() => {
        axios
          .get(`${apiBaseUrl}/users`)
          .then((res) => {
              // console.log(res.data.pages);
            setUsers(res.data.total);
            // console.log(res.data.response);
            // var today = new Date();
            // var yesterday = new Date(today.getTime() - (1000*60*60*24));
            // console.log(today);
            // console.log(yesterday);
            
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

const getlastUsers = ()=>{
  let hours = moment().hours();
  let years = moment().year();
  let months = moment().month();
  let days = moment().days();
  let minutes = moment().minutes();
  let seconds = moment().seconds();
let allDate = `${years}-${months}-${days}T${hours}:${minutes}:${seconds}`
  console.log(allDate )
}
getlastUsers()      

      useEffect(() => {
        axios.get(`${apiBaseUrl}/lists`)
        .then((res) => {
          setLists(res.data.total);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (    
        <div className="dashboard-container">
            <div className="dashboard-row1"> 
                    <div className="dashboard-row1-col1">
                        <div className="widget-wrapper">
                           <Widgets apiBaseUrl={apiBaseUrl} users={users} lists={lists}/>
                        </div>
                        <div className="moviecard-wrapper">
                          <MovieCard apiBaseUrl={apiBaseUrl}/>
                        </div>
                    </div>
                   
            </div>
            <div className="dashboard-row2">
                    <div className="doughnut2-wrapper">
                        <Doughnut2 apiBaseUrl={apiBaseUrl} />
                    </div>
            </div>
            <div className="dashboard-row3">
                <div className="recentview-wrapper">
                    <RecentView apiBaseUrl={apiBaseUrl} />
                </div>
                    
            </div>
        <br />
        <br />
     </div>
    )
}
