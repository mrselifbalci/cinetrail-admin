import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router'
import { GiHamburgerMenu, GiFiles } from "react-icons/gi";
import { RiContactsBookLine } from "react-icons/ri";
import { BsQuestionSquare, BsInfoSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { BsFillEyeFill, BsFillHouseDoorFill, BsFillStarFill, BsChatFill, BsFillPeopleFill, BsCardList, BsFilm, BsChevronRight, BsEnvelope } from "react-icons/bs";
import { IoNotificationsOutline } from 'react-icons/io5';
import {MdViewList} from 'react-icons/md'
import '../../styles/header.css'
import swal from 'sweetalert';

export default function Header({ isLoggedIn, setIsLoggedIn, apiBaseUrl, url, token }) {
  const history = useHistory()
  const [adminInfo, setAdminInfo] = useState('')
  const [sidebarClass, setSidebarClass] = useState(true)
  const [profileInfoClass, setProfileInfoClass] = useState(false)
  const [messagesIconClass, setMessagesIconClass] = useState(false)
  const [notificationsIconClass, setNotificationsIconClass] = useState(false)
  // const [categoryClassname, setCategoryClassname] = useState(false)
  const [trailerClassname, setTrailerClassname] = useState(false)
  const [pagesClassname, setPagesClassname] = useState(false)
  const [faqClassname, setFaqClassname] = useState(false)
  // const [categoryArrowClass, setCategoryArrowClass] = useState(true)
  const [trailerArrowClass, setTrailerArrowClass] = useState(true)
  const [pagesArrowClass, setPagesArrowClass] = useState(true)
  const [faqArrowClass, setFaqArrowClass] = useState(true)
  const [unreadMessages, setUnreadMessages] = useState([])
  const [unreadNotifications, setUnreadNotifications]=useState([])
  const [isRead, setIsRead]=useState(true)
// console.log(unreadNotifications)
  const toggleSidebarClass = () => {
    setSidebarClass(!sidebarClass)
  }
  const toggleProfileClass = () => {
    setProfileInfoClass(!profileInfoClass)
    setMessagesIconClass(false)
    setNotificationsIconClass(false)
  }
  //messages 
  const toggleMessagesIconClass = () => {
    setMessagesIconClass(!messagesIconClass)
    setNotificationsIconClass(false)
    setProfileInfoClass(false)
  } 
  //notifications
  const toggleNotificationsClass = () => {
    setNotificationsIconClass(!notificationsIconClass)
    setMessagesIconClass(false)
    setProfileInfoClass(false)
  }
const toggleDropdown = (section) => {
    switch (section) {
      case "trailer":
        setTrailerClassname(!trailerClassname)
        setTrailerArrowClass(!trailerArrowClass)
        break;
      // case "category":
      //   setCategoryClassname(!categoryClassname)
      //   setCategoryArrowClass(!categoryArrowClass)
      //   break;
      case "faq":
        setFaqClassname(!faqClassname)
        setFaqArrowClass(!faqArrowClass)
        break;
      case "pages":
        setPagesClassname(!pagesClassname)
        setPagesArrowClass(!pagesArrowClass)
        break;
      default: return null
    }
  }
  // const logout = (e) => {
  //   e.preventDefault()
  //   localStorage.removeItem('userinfo')
  //   localStorage.removeItem('token')
  //   history.push('/signout')
  //   window.location.reload() 
  // }
  const logout = (e) => {
    e.preventDefault()
    swal({
      title: "Are you sure to log out?",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('userinfo')
        localStorage.removeItem('token')
        history.push('/')
        window.location.reload() 
        swal("You are successfully logged out!!", {
          icon: "success",
        });
      } 
    });
  }
  const messgesStatusChangeHandle = (id) => {
    history.push(`/singlemessage/${id}`)
         const updatedmessage = {
          isRead:isRead
        }
      axios.put(`${apiBaseUrl}/messages/${id}`, updatedmessage)
          .then(res => {
              window.location.reload()
          })
          .catch(err => { console.log(err) })
  }
  const notificationsHandle = (id) => {
    // history.push(`/singlemessage/${id}`)
    // setIsReadNotification(true)
         const updatedNotification = {
          isRead:isRead,
        }
      axios.put(`${apiBaseUrl}/notifications/${id}`, updatedNotification)
          .then(res => {
              window.location.reload()
          })
          .catch(err => { console.log(err) })  
  }
  useEffect(() => {
    setAdminInfo(JSON.parse(localStorage.getItem('userinfo')))
  }, [])
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/messages`)
      .then((res) => {
        let unreadMessagess = res.data.response.filter((item) => item.isRead === false)
        setUnreadMessages(unreadMessagess);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/notifications`)
      .then((res) => {
        let unreadNotifications = res.data.response.filter((item) => item.isRead === false)
        setUnreadNotifications(unreadNotifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  return (
    <div className="header-container">
      <div className="top-header-container">
        <div className="header-logo-container">
          <a href="/dashboard" className="logo-text">CINETRAIL</a>
          <div className="hamburger-icon" onClick={toggleSidebarClass}>
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="header-profile-container">
        <button type='button' onClick={toggleNotificationsClass} className='icon-button'>
          <IoNotificationsOutline onClick={() => console.group('notification clicked')} className="notification-icon" />
          <span className='notifications-icon-badge'>{unreadNotifications.length}</span>
          </button>
          <div  className={notificationsIconClass ? "notification-container-open" : "notification-container-closed"}>
            <div className='notification-title'>New notifications</div>
            {unreadNotifications.map((e, k) =>
              <div className='notification-list' onClick={()=>notificationsHandle(e._id)} key={e.index}>
                <p style={{ color: '#e20e02' }}>{e.title}</p>
                <p>{e.content}</p>
              </div>
            )}
          </div>
          <button type='button' onClick={toggleMessagesIconClass} className='icon-button'>
            <BsEnvelope className="envelope-icon" />
            <span className='messages-icon-badge'>{unreadMessages.length}</span>
          </button>
          <div  className={messagesIconClass ? "message-notification-container-open" : "message-notification-container-closed"}>
            <div className='message-notification-title'>New messages</div>
            {unreadMessages.map((e, k) =>
              <div className='message-list' onClick={()=>messgesStatusChangeHandle(e._id)} key={e.index}>
                <p style={{ color: '#e20e02' }}>{e.firstname} {e.lastname}</p>
                <p>{e.subject}</p>
                <p>{e.content.slice(0, 45)}</p>
              </div>
            )}
          </div>
          <img className="header-profile-img" src={url} alt="pic" onClick={toggleProfileClass} />
          <div className={profileInfoClass ? "profile-info-container-open" : "profile-info-container-closed"}>
            <div className='logout-title'>Welcome {adminInfo.firstname}</div>
            <div className="logout-text"><p onClick={logout}>Logout</p></div>
          </div>
        </div>
      </div>
      <div className={sidebarClass === true ? "sidebar-container" : "sidebar-container-overlay"}>
        <div className="menu-item"><a href="/dashboard"><BsFillHouseDoorFill /> Dashboard</a></div>
        <div className="menu-item" onClick={(e) => { toggleDropdown("trailer") }}>
          <div> <BsFilm /> Trailer</div>
          <div>
            <BsChevronRight className={trailerArrowClass === true ? "sidebar-right-arrow" : "sidebar-down-arrow"} onClick={(e) => { toggleDropdown("trailer") }} />
          </div>
        </div>
        <div className={trailerClassname === false ? "dropdown-closed" : "dropdown-open"}>
          <div className="dropdown-item"> <BsFillPlusSquareFill /> <a href="/addtrailer">Add Trailer</a></div>
          <div className="dropdown-item"> <BsFillEyeFill /> <a href="/trailers">Trailer List</a></div>
        </div>
        <div className="menu-item"><a href="/ratings"> <BsFillStarFill /> Rating</a></div>
        <div className="menu-item"><a href="/commentlist"> <BsChatFill /> Comments</a></div>
        <div className="menu-item"><a href="/userlist"> <BsFillPeopleFill /> User</a></div>
        <div className="menu-item"><a href="/lists"> <MdViewList /> Lists</a></div>
        <div className="menu-item"> <RiContactsBookLine /> <a href="/messages">&nbsp;Messages</a></div>
        {/* <div className="menu-item" onClick={(e) => { toggleDropdown("category") }} >
          <div><BsCardList /> Category</div>
          <div>
            <BsChevronRight className={categoryArrowClass === true ? "sidebar-right-arrow" : "sidebar-down-arrow"} onClick={(e) => { toggleDropdown("category") }} />
          </div>
        </div>
        <div className={categoryClassname === false ? "dropdown-closed" : "dropdown-open"}>
          <div className="dropdown-item"><BsFillPlusSquareFill /> <a href="/addcategory">Add Category</a></div>
          <div className="dropdown-item"> <BsFillEyeFill /> <a href="/categories"> Category List</a></div>
        </div> */}
        <div className="menu-item" onClick={(e) => { toggleDropdown("faq") }}>
          <div> <BsQuestionSquare /> Faq</div>
          <div>
            <BsChevronRight className={faqArrowClass === true ? "sidebar-right-arrow" : "sidebar-down-arrow"} onClick={(e) => { toggleDropdown("faq") }} />
          </div>
        </div>
        <div className={faqClassname === false ? "dropdown-closed" : "dropdown-open"}>
          <div className="dropdown-item"> <BsFillPlusSquareFill /> <a href="/addfaq">Add FAQ</a></div>
          <div className="dropdown-item"> <BsFillEyeFill /> <a href="/faqs">FAQ List</a></div>
        </div>
        <div className="menu-item" onClick={(e) => { toggleDropdown("pages")}}>
          <div> <GiFiles /> Pages </div>
              <div >
            <BsChevronRight className={pagesArrowClass === true ? "sidebar-right-arrow" : "sidebar-down-arrow"}  />
          </div>
        </div>
        <div className={pagesClassname === false ? "dropdown-closed" : "dropdown-open"}>
          <div className="dropdown-item"> <BsInfoSquare /> <a href="/about">About Us</a></div>
          <div className="dropdown-item"> <BsInfoSquare /> <a href="/privacypolicy">Privacy Policy</a></div>
          <div className="dropdown-item"> <BsInfoSquare /> <a href="/termsofuse">Terms of Use</a></div>
          <div className="dropdown-item"> <BsInfoSquare /> <a href="/contactinfo">Contact Info</a></div>
        </div>
      </div>
    </div>
  )
}