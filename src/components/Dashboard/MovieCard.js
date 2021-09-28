import axios from "axios";
import React,{useState, useEffect} from "react";
import { BsArrowLeft, BsArrowRight,BsFillEyeFill,BsLayers } from "react-icons/bs";

const url= "https://image.tmdb.org/t/p/w342"
export default function MovieCard({apiBaseUrl}) {
const [imageIndex, setImageIndex]= useState(0);
const[movieCard, setMovieCard]=useState([]);
// console.log(movieCard[1].watchedCount)
const handleRightSwipe = ()=> {
  imageIndex < movieCard.length-6
   ?setImageIndex(imageIndex + 1)
   :setImageIndex(0);
};
const handleLeftSwipe = ()=> {
  imageIndex === 0
  ?setImageIndex(movieCard.length-6)
  :setImageIndex(imageIndex - 1)
   
};
useEffect(()=>{
  axios
  .get(`${apiBaseUrl}/movies?limit=35`)
  .then((res)=>{
    // console.log(res.data.response)
    setMovieCard(res.data.response);
  
  })
  .catch((err)=>console.log(err));
},[]);

  return (
   <div className="movie-cards-wrapper">
        <div className="movie-card-header">
            <div className="movie-card-header-title">
              <h4>Top Rated Movies</h4> 
            </div>
            <div className="movie-card-header-button-container" >
              <div className="movie-card-header-buttons" onClick={handleLeftSwipe}>
                <button className="submit-button"><BsArrowLeft/> </button>
              </div>
              <div className="movie-card-header-buttons" onClick={handleRightSwipe}>
                <button className="submit-button"><BsArrowRight/> </button>
              </div>          
            </div>
       </div>
      <div>
       <hr style={{ borderColor: "var(--bg-dark)" }} />

      <div className="movie-card-group"> 
          <div className="movie-item">
            <div className="movie-item-image-container">
                <img src={movieCard.length !==0 && url + movieCard[imageIndex].image_path} alt="movie"/>
            </div>
            <div className="movie-item-info">
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex].original_title.slice(0,17)}...`}</p>
                </div>
            
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex].watchedCount ? movieCard[imageIndex].watchedCount : "no views"}</p>
                </div> 
            </div>
          </div>
          <div className="movie-item">
            <div className="movie-item-image-container">
               <img src={movieCard.length !==0 && url + movieCard[imageIndex+1].image_path} alt="movie"/>
            </div>
              
            <div className="movie-item-info">
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex+1].original_title.slice(0,17)}...`}</p>
                </div>
              
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex +1].watchedCount ? movieCard[imageIndex +1].watchedCount : "no views"}</p>
                </div>
            </div>
         
          </div>
          <div className="movie-item">
            <div className="movie-item-image-container">
              <img src={movieCard.length !==0 && url + movieCard[imageIndex+2].image_path} alt="movie"/>
            </div>
              
            <div className="movie-item-info"> 
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex+2].original_title.slice(0,17)}...`}</p>
                </div>
                
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex +2].watchedCount ? movieCard[imageIndex +2].watchedCount : "no views"}</p>
                </div>
            </div>
          </div>
          <div className="movie-item">
             <div className="movie-item-image-container">
                <img src={movieCard.length !==0 && url + movieCard[imageIndex+3].image_path} alt="movie"/>
              </div>
              <div className="movie-item-info">
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex+3].original_title.slice(0,17)}...`}</p>
                </div>
                
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex +3].watchedCount ? movieCard[imageIndex +3].watchedCount : "no views"}</p>
                </div>
              </div>
          </div>
          <div className="movie-item">
             <div className="movie-item-image-container">
                <img src={movieCard.length !==0 && url + movieCard[imageIndex+4].image_path} alt="movie"/>
              </div>
              <div className="movie-item-info">
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex+4].original_title.slice(0,17)}...`}</p>
                </div>
                
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex +4].watchedCount ? movieCard[imageIndex +4].watchedCount : "no views"}</p>
                </div>
              </div>
          </div>
          <div className="movie-item">
             <div className="movie-item-image-container">
                <img src={movieCard.length !==0 && url + movieCard[imageIndex+5].image_path} alt="movie"/>
              </div>
              <div className="movie-item-info">
                <div className="movie-item-title">
                  <p>{`${movieCard.length !==0 && movieCard[imageIndex+5].original_title.slice(0,17)}...`}</p>
                </div>
                
                <div className="movie-item-view">
                   <BsFillEyeFill className="movie-item-view-icon"/>
                   <p>{movieCard.length!==0 && movieCard[imageIndex +5].watchedCount ? movieCard[imageIndex +5].watchedCount : "no views"}</p>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
  );
}
