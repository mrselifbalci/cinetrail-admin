import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { div, Row, Col } from "react-bootstrap";
import { MdLocalMovies, MdChildCare } from "react-icons/md";
import { FaTheaterMasks, FaHatCowboy , FaRegLaughBeam } from "react-icons/fa";
import { GiSkullCrossedBones } from "react-icons/gi";
import { GiJetpack, GiPistolGun, GiDesert, GiVintageRobot, GiMusicalNotes, GiFilmProjector, GiClown, GiZeusSword, GiCastle } from "react-icons/gi";
import { TiGroup } from "react-icons/ti";
import { RiHeartsLine } from "react-icons/ri";
import { BiTargetLock } from "react-icons/bi";
import axios from "axios";
// export default class Doughnut2 extends React.Component {
const Doughnut2 = ({ apiBaseUrl }) => {
  const [data, setData] = useState([]);
  const genres = data.flat(2)
  const findTopGenres = (genre) => {
    let getGenres = genre.flat(2);
    let countGenres = {
      action: 0,
      adventure: 0,
      animation: 0,
      comedy: 0,
      crime: 0,
      documentary: 0,
      drama: 0,
      family: 0,
      fantasy: 0,
      history: 0,
      horror: 0,
      music: 0,
      mystery: 0,
      romance: 0,
      scienceFiction: 0,
      tvMovie: 0,
      thriller: 0,
      war: 0,
      western: 0,
      others: 0,
    };
    // console.log(getGenres.length);
    for (let i = 0; i <= getGenres.length; i++) {
      getGenres[i] === "Action" || getGenres[i] === "Action "
        ? (countGenres.action = countGenres.action + 1)
        : getGenres[i] === "Adventure" || getGenres[i] === "Adventure "
        ? (countGenres.adventure = countGenres.adventure + 1)
        : getGenres[i] === "Animation" || getGenres[i] === "Animation "
        ? (countGenres.animation = countGenres.animation + 1)
        : getGenres[i] === "Comedy" || getGenres[i] === "Comedy "
        ? (countGenres.comedy = countGenres.comedy + 1)
        : getGenres[i] === "Crime" || getGenres[i] === "Crime "
        ? (countGenres.crime = countGenres.crime + 1)
        : getGenres[i] === "Documentary" || getGenres[i] === "Documentary "
        ? (countGenres.documentary = countGenres.documentary + 1)
        : getGenres[i] === "Drama" || getGenres[i] === "Drama "
        ? (countGenres.drama = countGenres.drama + 1)
        : getGenres[i] === "Family" || getGenres[i] === "Family "
        ? (countGenres.family = countGenres.family + 1)
        : getGenres[i] === "Fantasy" || getGenres[i] === "Fantasy "
        ? (countGenres.fantasy = countGenres.fantasy + 1)
        : getGenres[i] === "History" || getGenres[i] === "History "
        ? (countGenres.history = countGenres.history + 1)
        : getGenres[i] === "Horror" || getGenres[i] === "Horror "
        ? (countGenres.horror = countGenres.horror + 1)
        : getGenres[i] === "Music" || getGenres[i] === "Music "
        ? (countGenres.music = countGenres.music + 1)
        : getGenres[i] === "Romance" || getGenres[i] === "Romance "
        ? (countGenres.romance = countGenres.romance + 1)
        : getGenres[i] === "Science Fiction" ||
          getGenres[i] === "Science Fiction "
        ? (countGenres.scienceFiction = countGenres.scienceFiction + 1)
        : getGenres[i] === "TV Movie" || getGenres[i] === "TV Movie "
        ? (countGenres.tvMovie = countGenres.tvMovie + 1)
        : getGenres[i] === "Thriller" || getGenres[i] === "Thriller "
        ? (countGenres.thriller = countGenres.thriller + 1)
        : getGenres[i] === "War" || getGenres[i] === "War "
        ? (countGenres.war = countGenres.war + 1)
        : getGenres[i] === "Western" || getGenres[i] === "Western "
        ? (countGenres.western = countGenres.western + 1)
        : (countGenres.others = countGenres.others + 1);
    }
    var sortable = [];
    for (var item in countGenres) {
      sortable.push([item, countGenres[item]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    return sortable.slice(0, 6);
  };
  let topCategories = findTopGenres(data);
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/trailers`)
      .then((res) => {
        res.data.response.map((item) =>
          setData((data) => [...data, item.genre])
        );
        // setData(res.data.response.genre);
        // console.log(res.data.response[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const state = {
    labels: [
      topCategories[0][0],
      topCategories[1][0],
      topCategories[2][0],
      topCategories[3][0],
      topCategories[4][0],
      topCategories[5][0],
    ],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#e20e02",
          '#F4D03F',
          "#1E8449",
          "#884EA0",
          "#D35400",
          "#0014a0",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#003350",
          "#501800",
        ],
        data: [
          topCategories[0][1],
          topCategories[1][1],
          topCategories[2][1],
          topCategories[3][1],
          topCategories[4][1],
          topCategories[5][1],
        ]
      },
    ],
  };
  const icons=(genre)=>{
    if (genre==="drama"){return  <FaTheaterMasks />
    }else if (genre==="family"){return  <TiGroup />
    }else if (genre==="comedy"){return   <GiClown />
    }else if (genre==="action"){return  <BiTargetLock />
    }else if (genre==="adventure"){return  <MdLocalMovies />
    }else if (genre==="animation"){return  <MdChildCare /> 
    }else if (genre==="crime"){return  <GiPistolGun />
    }else if (genre==="documentary"){return  <GiDesert />
    }else if (genre==="fantasy"){return  <GiZeusSword />
    }else if (genre==="history"){return  <GiCastle />
    }else if (genre==="horror"){return  <GiSkullCrossedBones />
    }else if (genre==="music"){return  <GiMusicalNotes />
    }else if (genre==="romance"){return  <RiHeartsLine />
    }else if (genre==="scienceFiction"){return  <GiVintageRobot />
    }else if (genre==="tvMovie"){return  <GiFilmProjector />
    }else if (genre==="thriller"){return  <FaRegLaughBeam />
    }else if (genre==="war"){return  <GiJetpack/>
    }else if (genre==="western"){return  <FaHatCowboy />
    }else {
    return <MdLocalMovies />
    }
      } 
  return (
    <div className="doughnut2-wrapper">
      <div className="doughnut2-header-wrapper">
        <p className="doughnut2-title"> Top Category </p>
        <select>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <hr style={{ borderColor: "var(--bg-dark)" }} />
      <div className="doughnut2-row2">
        <div className="doughnut2-chart-container">
          <Doughnut
            data={state}
            height="300px"
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "left",
                border: "none",
              },
            }}
          />
        </div>
        <div className="doughnut2-info-container">
          <div className="doughnut2-info-item">
            <div  className="mini-divs-icon">
              {icons(topCategories[0][0])}
            </div>
            <div className="doughnut2-genre-percentage">
              <p>{ topCategories[0][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[0][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
          <div className="doughnut2-info-item">
            <div className="mini-divs-icon">
            {icons(topCategories[1][0])}
              {/* <MdLocalMovies /> */}
            </div>
                        <div className="doughnut2-genre-percentage">
              <p>{ topCategories[1][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[1][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
          <div className="doughnut2-info-item">
            <div className="mini-divs-icon">
            {icons(topCategories[2][0])}
              {/* <MdChildCare /> */}
            </div>
            <div className="doughnut2-genre-percentage">
              <p>{ topCategories[2][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[2][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
          <div className="doughnut2-info-item">
            <div className="mini-divs-icon">
            {icons(topCategories[3][0])}
              {/* <FaRegLaughBeam /> */}
            </div>
            <div className="doughnut2-genre-percentage">
              <p>{topCategories[3][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[3][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
          <div className="doughnut2-info-item">
            <div className="mini-divs-icon">
            {icons(topCategories[4][0])}
              {/* <FaRegSmile /> */}
            </div>
            <div className="doughnut2-genre-percentage">
              <p>{topCategories[4][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[4][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
          <div className="doughnut2-info-item">
            <div className="mini-divs-icon">
            {icons(topCategories[5][0])}
              {/* <GiSkullCrossedBones /> */}
            </div>
            <div className="doughnut2-genre-percentage">
              <p>{ topCategories[5][0].toUpperCase()}</p>
              <p>{"+" + Math.floor(topCategories[5][1]*100/genres.length) +'%'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Doughnut2;