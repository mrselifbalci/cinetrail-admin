import React, { useState, useEffect} from 'react';
import './styles/App.css'
import {
	BrowserRouter as Router,
	Route, 
	Switch,
} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Signin from './components/Auth/Signin';
import Dashboard from './components/Dashboard/Dashboard'
import Trailers from './components/Trailers/Trailers';
import TrailerDetails from './components/Trailers/TrailerDetails'
import AddTrailer from './components/Trailers/AddTrailer'
import Comments from './components/Comments/Comments';
import Users from './components/Users/Users';
import Messages from './components/Messages/Messages';
import MessageDetails from './components/Messages/MessageDetails';
import Ratings from './components/Rating/Ratings';
import Faqs from './components/Faq/Faq';
import About from './components/Pages/About';
import Privacy from './components/Pages/Privacy';
import Terms from './components/Pages/Terms';
import ContactInfo from './components/Pages/ContactInfo';
import AddFaq from './components/Faq/AddFaq';
import CommentDetails from './components/Comments/CommentDetails';
import Signout from './components/Auth/Signout';
import List from './components/List/List';
import ListDetails from './components/List/ListDetails';
import Search from './components/Trailers/Search';



function App() {
 const [apiBaseUrl,setApiBaseUrl]=useState('https://movieapp-server.herokuapp.com')
 const [isLoggedIn,setIsLoggedIn]=useState(false)
 const [url,setUrl]=useState('')
 const [token,setToken]=useState('')
 useEffect(() => {
     setToken(JSON.parse(localStorage.getItem('token')))
	 setUrl(JSON.parse(localStorage.getItem('url')))
 }, [])
  return ( 
    <div className="App">
      <Router>
	  <Route
				         exact path="/"
				         render={() => <Signin apiBaseUrl={apiBaseUrl} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUrl={setUrl} token={token}/>}
				        />
	  <Route
				         exact path="/signout"
				         render={() => <Signout apiBaseUrl={apiBaseUrl} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUrl={setUrl} token={token}/>}
				        />
          {
			   isLoggedIn || token ? 
			   <div>
			   <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} apiBaseUrl={apiBaseUrl} url={url} token={token}/> 
			   <Switch>
              <div className="content-wrapper"> 
			   <Route
				         exact path="/dashboard"
				         render={() => <Dashboard apiBaseUrl={apiBaseUrl} />}
				        />   
                <Route
				         exact path="/trailers"
				         render={() => <Trailers apiBaseUrl={apiBaseUrl} />}
				        />
                <Route
				         exact path="/trailerdetails/:id"
				         render={() => <TrailerDetails apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route 
				         exact path="/addtrailer"
				         render={() => <AddTrailer apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/commentlist"
				         render={() => <Comments apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/commentdetails/:id"
				         render={() => <CommentDetails apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/userlist"
				         render={() => <Users apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/messages"
				         render={() => <Messages apiBaseUrl={apiBaseUrl}/>}
				        />
								<Route
				         exact path="/singlemessage/:id"
				         render={() => <MessageDetails apiBaseUrl={apiBaseUrl}/>}
				        />
                <Route
				         exact path="/ratings"
				         render={() => <Ratings apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/lists"
				         render={() => <List apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/listdetails/:id"
				         render={() => <ListDetails apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				         exact path="/faqs"
				         render={() => <Faqs apiBaseUrl={apiBaseUrl}/>}
				        />
				<Route
				  exact path="/addfaq"
				  render={() => <AddFaq apiBaseUrl={apiBaseUrl} />}
				/>
				<Route
						exact path="/about"
						render={() => <About apiBaseUrl={apiBaseUrl} />}
						/>
				<Route
						exact path="/privacypolicy"
						render={() => <Privacy apiBaseUrl={apiBaseUrl}/>}
						/>
				<Route
						exact path="/termsofuse"
						render={() => <Terms apiBaseUrl={apiBaseUrl}/>}
						/>
				<Route
						exact path="/contactinfo"
						render={() => <ContactInfo apiBaseUrl={apiBaseUrl}/>}
						/>
              </div> 
			  
          </Switch>
		  <Footer apiBaseUrl={apiBaseUrl}/> 
		  </div>
			   : null
		  }
      </Router>
      
    </div>
  );
}
export default App;