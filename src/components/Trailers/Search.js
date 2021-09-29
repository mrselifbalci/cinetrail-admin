import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactPlayer from "react-player";
import "../../styles/table.css";
import "../../styles/trailers.css";
require('dotenv').config();

export default function Search({apiBaseUrl}) {

const tmdbBaseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.API_KEY

const [query,setQuery]=useState('')
const [searchResults,setSearchResults]=useState('')
const[selectedMovie,setSelectedMovie]=useState('')
const [trailerUrl,setTrailerUrl]=useState('')
const[cast,setCast]=useState([])
const[crew,setCrew]=useState([])
const[genres,setGenres]=useState([])
const[director,setDirector]=useState('')
console.log(director)

const sendQuery=(query)=>{
  if(query.length!==0){
      axios.get(`${tmdbBaseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=tr-TR`)
      .then(res=>{
        console.log(res.data.results)
        setSearchResults(res.data.results)
      })
      .catch(err=>console.log(err))  
  }
        
}

const selectMovie=(id)=>{
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`)  
  .then(res=>{
       setSelectedMovie(res.data);
       setTrailerUrl(`https://www.youtube.com/watch?v=${res.data.videos.results[0].key}`)
       res.data.genres.map(genre=>{
        setGenres(genres=>[...genres,genre.name + " "])
       })
       
  })
  .catch(err=>console.log(err))

  axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)  
  .then(res=>{
    console.log(res.data)
    res.data.cast.slice(0,4).map(person=>{
      setCast(cast=>[...cast,person.name])
      setQuery('')
    })
    
  })
  
  .catch(err=>console.log(err)) 

  axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)  
  .then(res=>{
    res.data.crew.slice(0,4).map(person=>{
      setCrew(crew=>[...crew,person.name])
      setQuery('')
    })
    let filterDirector = res.data.crew.filter(item=>item.department==='Directing');
    let filterName=filterDirector.map(item=>item.name + " ").slice(0,3).toString()
    setDirector(filterName)
  })
  .catch(err=>console.log(err))
}

const uploadTrailer =()=>{
  const formData = new FormData();
  formData.append("title", selectedMovie.title);
  formData.append("type", "movie");
  formData.append("description", selectedMovie.overview);
  formData.append("imdb", selectedMovie.vote_average);
  formData.append("genre", JSON.stringify(genres));
  formData.append("cast", JSON.stringify(cast));
  formData.append("crew", JSON.stringify(crew));
  formData.append("mediaUrl", `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`);
  formData.append("year", selectedMovie.release_date.slice(0,4));
  formData.append("trailerUrl", trailerUrl);
  formData.append("director", director);
  axios.post(`${apiBaseUrl}/trailers`,formData)
  .then(res=>{
    console.log(res.data)
  })
  .catch(err=>console.log(err))
}


  return (
    <div className="search-imdb-container">
      <div className="search-imdb-form-container">
        <form>
          <label>Search Movie from IMDB</label>
          <input className="search-imdb-input"  type="text" onChange={(e)=>{setQuery(e.target.value);sendQuery(e.target.value)}}/>
        
        <div className={selectedMovie.length===0 ? "search-results-hide" : "trailer-banner-container"}>
          <p>Trailer Banner</p>
          <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`} alt="trailer-banner"/>
          <button onClick={uploadTrailer} className="submit-button search-submit-button">Upload Trailer</button>
        </div>
        
        </form>
      </div>
      <div className={query.length!==0 ?"search-results-show": "search-results-hide"} >
          {
            searchResults && searchResults.map(item=>{                        
              return <div className="each-movie" onClick={()=>selectMovie(item.id)}>                          
                <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png'} alt="pic" />                            
                <p>{item.title} ({item.release_date && item.release_date.slice(0,4)})</p>                            
              </div>})
          }        
      </div>
      <div className="search-imdb-info-container">
        {
          selectedMovie.length===0 
          ? <p className="not-selected-text">You have not selected any trailer yet.</p>
          : <div className="selected-movie-container"> 
              <div className="selected-movie-info-container">
                <h3>{selectedMovie.title}</h3>
                <p>Rating: {selectedMovie.vote_average}</p>
              </div>
              
              <ReactPlayer
                // className="modal-react-player"
                width="auto"
                url={trailerUrl}
              />
          </div>
        }
              
        {console.log(selectedMovie)}
      </div>
      
    </div> 
  )
}
 

