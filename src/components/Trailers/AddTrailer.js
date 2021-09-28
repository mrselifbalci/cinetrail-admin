import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../../styles/table.css'
import '../../styles/trailers.css' 
import Search from './Search'

export default function AddTrailer({apiBaseUrl}) {
const tmdbBaseUrl = 'https://api.themoviedb.org/3'
const apiKey = "e15d510497f0c76895f1c76ac17b08d4"
  const history = useHistory();
  const [showItems, setShowItems] = useState("items-not-visible");
  const [movieItems, setMovieItems] = useState("items-visible");
  const [image, setImage] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  // const [banner, setBanner] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  // const [episodeTitle, setEpisodeTitle] = useState("");
  const [year, setYear] = useState("");
  // const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState(""); 
  // const [totalSeasons, setTotalSeasons] = useState("");
  // const [seasonNumber, setSeasonNumber] = useState("");
  // const [episodeNumber, setEpisodeNumber] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cast, setCast] = useState([]);
  // const[genres,setGenres]=useState([])
  const [genre, setGenre] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState([1]);
  const [watchMovieTitle, setwatchMovieTitle] = useState("");
  const [watchMovieLink, setwatchMovieLink] = useState("");
  const [watchMovie, setWatchMovie] = useState([]);
  const [director, setDirector] = useState("");
  const [imdb, setImdb] = useState("");
  const [added , setAdded]=useState(false)
//   const[selectedMovie,setSelectedMovie]=useState('')
//   const [query,setQuery]=useState('')
// const [searchResults,setSearchResults]=useState('')

  
  console.log(selectedGenres);
console.log(image)

  const addMore = () => {
    setNumber((number) => [...number, 1]);
    setAdded(false)
  };


  const addSite = (e) => {
    e.preventDefault();
    let newLink ={title: watchMovieTitle, link: watchMovieLink };
    setWatchMovie((watchMovie) => [
      ...watchMovie,newLink
    ])
    
    // window.location.reload();
    setAdded(true)
  };
  useEffect(() => {
    // console.log(watchMovie);
  }, [watchMovie]);

  useEffect(() => {
    axios
      .get(`${tmdbBaseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then((res) => {
        setGenre(res.data.genres);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectGenre = (e) => {
    console.log(e.target.name)
    if (!selectedGenres.includes(e.target.name)) {
      setSelectedGenres((selectedGenres) => [...selectedGenres, e.target.name]);
    } else {
      const index = selectedGenres.indexOf(e.target.name);
      setSelectedGenres(
        selectedGenres.filter((item) => selectedGenres.indexOf(item) !== index)
      );
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "movie") {
      setShowItems("items-not-visible");
      setMovieItems("items-visible");
    } else if (e.target.value === "show") {
      setShowItems("items-visible");
      setMovieItems("items-not-visible");
    } else {
      setMovieItems("items-visible");
      setShowItems("items-not-visible");
    }
    setType(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("mediaUrl", mediaUrl);
    // formData.append("bannerId", banner);
    formData.append("type", type);
    formData.append("title", title);
    // formData.append("duration", duration);
    formData.append("ageRestriction", ageRestriction);
    // formData.append("totalSeasons", totalSeasons);
    formData.append("year", year);
    // formData.append("seasonNumber", seasonNumber);
    // formData.append("episodeTitle", episodeTitle);
    // formData.append("episodeNumber", episodeNumber);
    formData.append("trailerUrl", trailerUrl);
    formData.append("description", description);
    formData.append("director", director);
    formData.append("imdb", imdb);
    formData.append("cast", cast);
    formData.append("tags", tags);
    formData.append("genre", JSON.stringify(selectedGenres));
    // formData.append("genre", selectedGenres);
    formData.append("websiteId", JSON.stringify(watchMovie));
    await axios
      .post(`${apiBaseUrl}/trailers`, formData)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    history.push("/trailers");
  };

  const cancelUpload = (e) => {
    e.preventDefault();
    setImage("");
    // setBanner("");
    setType("");
    setTitle("");
    // setEpisodeTitle("");
    setYear("");
    // setDuration("");
    setDescription("");
    setAgeRestriction("");
    // setTotalSeasons("");
    // setSeasonNumber("");
    // setEpisodeNumber("");
    setTrailerUrl("");
    setDirector("");
    setImdb("");
    
  };
  return (
  <div className="trailer-component-wrapper ">
    <div className="add-trailer-container">
      <div className="add-trailer-title-text">
          <h1>Add Trailer</h1>
      </div>

<div style={{minHeight:"300px"}}>
  <Search apiBaseUrl={apiBaseUrl}/>
</div>

      <div className="add-trailer-website-container">
          <div className="add-trailer-website-text">
              <h4>Add a website to watch the whole movie... </h4>
          </div>
          <div className="add-trailer-website-form-container">
                    {number.map((item)=>{
                      return <form onSubmit={addSite} className="add-trailer-add-website-form">
                              <input onChange={(e)=>setwatchMovieTitle(e.target.value)} placeholder="title of the website" className="add-trailer-add-website-form-input"/>
                              <input onChange={(e)=>setwatchMovieLink(e.target.value)}   placeholder="link"/>
                              <button className="add-trailer-website-button submit-button " type="submit" >{added?'Added':'Add'}</button>
                        </form>
                    })}
          </div>
          <div className="add-trailer-button-container">
             <button className="add-trailer-website-addmore submit-button" onClick={addMore}>Add More Websites</button> 
             
          </div>
          
      </div>
      

      <form className="add-trailer-form-container" onSubmit={handleSubmit}>
        <div className="add-trailer-category">
            <select  onChange={handleChange}>
              <option value="">Trailer Type</option>
              <option value="movie">Movie</option>
              <option value="show">Show</option>
            </select>
        </div>  
        <div className="add-trailer-main">
            <div className="add-trailer-main-column-one">
              <div className="add-trailer-item">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="add-trailer-item">
                <label>Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="add-trailer-item">
                <label>Release Year</label>
                <input value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
              {/* <div className="add-trailer-item">
                <label>Duration</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)}/>
              </div> */}
              <div className="add-trailer-item">
                  <label>Movie Image</label>
                <input type="file" onChange={(e) => {setMediaUrl(e.target.files[0]);}}/>
              </div>
              {/* <div className="add-trailer-item">
                <label>Movie Banner</label>
                <input type="file" onChange={(e) => {setBanner(e.target.files[0]);}}/>
              </div> */}
              <div className="add-trailer-item">
                <label>Age Restriction</label>
                  <input value={ageRestriction} onChange={(e) => setAgeRestriction(e.target.value)}/>
                </div>
                  <label>Genre</label>
              <div className="genre-wrapper" >
                  {genre && genre.map((item) => {
                    return (
                      <div className="genre-input-container" onClick={(e) => selectGenre(e)}>
                        <input type="checkbox" value={item.name} name={item.name + " "}id={item._id}/>
                        <label  htmlFor={item.name}>{item.name}</label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="add-trailer-main-column-two">
              <div className={showItems}>
                <div className="add-trailer-item">
                  <label>Trailer Url</label>
                    <input value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)}/>
                </div>
                <div className="add-trailer-item">
                  <label>Cast</label>
                  <input value={cast} onChange={(e) => setCast(e.target.value.split(","))}/>
                </div>
                <div className="add-trailer-item">
                  <label>Tags</label>
                  <input value={tags} onChange={(e) => setTags(e.target.value.split(","))}/>
                </div>
                <div className="add-trailer-item">
                  <label>Director</label>
                  <input value={director} onChange={(e) => setDirector(e.target.value)}/>
                </div>
                {/* <div className="add-trailer-item">
                  <label>Imdb</label>
                  <input value={imdb} onChange={(e) => setImdb(e.target.value)}/>
                </div> */}
                {/* <div className="add-trailer-item">
                  <label>Total Number of Seasons</label>
                  <input value={totalSeasons} onChange={(e) => setTotalSeasons(e.target.value)}/>
                </div> */}
                {/* <div className="add-trailer-item">
                  <label>Season Number</label>
                  <input value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)}/>
                </div> */}
                {/* <div className="add-trailer-item">
                  <label>Episode Title</label>
                  <input value={episodeTitle} onChange={(e) => setEpisodeTitle(e.target.value)}/>
                </div> */}
                {/* <div className="add-trailer-item">
                  <label>Episode Number</label>
                  <input value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)}/>
                </div> */}
                <div>
                  {isLoading ? (
                    <p className="loading-text">
                      Uploading the show trailer...
                    </p>
                  ) : null}
                </div>
              </div>
              <div className={movieItems}>
                <div className="add-trailer-item">
                <label>Trailer Url</label>
                  <input value={trailerUrl} onChange={(e) => setTrailerUrl(e.target.value)}/>
                </div>
                <div className="add-trailer-item">
                <label>Cast</label>
                  <input value={cast} onChange={(e) => setCast(e.target.value.split(","))}/>
                </div>
                <div className="add-trailer-item">
                <label>Tags</label>
                  <input value={tags} onChange={(e) => setTags(e.target.value.split(","))}/>
                </div>
                <div className="add-trailer-item">
                <label>Director</label>
                  <input value={director} onChange={(e) => setDirector(e.target.value)}/>
                </div>
                {/* <div className="add-trailer-item">
                <label>Search in TMDB</label>
                  <input type ='text' value={title||tmdb} onChange={(e) => setTmdb(e.target.value)}/>
                  <input type ='submit' value='SEARCH' onClick={callSearchFunction} />

                </div> */}
                </div>
                <div>
                <div className="add-trailer-item">
                <label>Imdb</label>
                  <input value={imdb} onChange={(e) => setImdb(e.target.value)}/>
                </div>
                <div>
                  {isLoading ? (
                    <p className="loading-text">
                      Uploading the movie trailer...
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
        </div>
        <div className="add-trailer-buttons">
          <div>
            <button className="submit-button add-trailer-button-items" type="submit">
              Submit
            </button>
          </div>
          <div>
            <button className="cancel-button add-trailer-button-items" onClick={cancelUpload}>
              Cancel
            </button>
          </div>
          
        </div>
      </form>
{/* <form>
<div className="add-trailer-item">
<label>Search in TMDB</label>
                  <input type ='text' value={searchValue} onChange={handleSearchInputChanges}/>
                  <input type ='submit' value='SEARCH' onClick={callSearchFunction} />

                </div>
                
                
                <div className="add-trailer-item">
                <label>Imdb</label>
                  <input value={imdb} onChange={(e) => setImdb(e.target.value)}/>
                </div>
</form> */}
      </div>
    </div>
  );
}
