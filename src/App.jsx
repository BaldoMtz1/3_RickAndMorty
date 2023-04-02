import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import LocationFilter from "./components/LocationFilter";
import LocationInfo from "./components/LocationInfo";
import ResidentList from "./components/ResidentList";
import getRandomNumer from "./utils/getRandomNumber";


const RESIDENT_PER_PAGE = 15

function App() {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState("");
  const [showError, setShowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState()

  const getDataDimension = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`;
      axios
        .get(URL)
        .then((res) => setLocation(res.data))
        .catch((err) => {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 2000);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const randomDimension = getRandomNumer();
    getDataDimension(randomDimension);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dimensionSearch = event.target.searchValue.value;
    getDataDimension(dimensionSearch);
  };

  const handleChangeInput = (event) => {
    setLocationName(event.target.value);
  };

  const getNewLocation = (URL, name) => {
    setLocationName(name);
    axios
      .get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err));
  };

  const getAllPages = () => {
    const arrayPages = [] 
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)
      
      
    }

    return arrayPages
  }

  

  


  useEffect(() => {

    const countResidents = location?.residents.length
    const cuantityPage = Math.ceil(countResidents / RESIDENT_PER_PAGE)

    setLastPage(cuantityPage);
    setCurrentPage(1)

  },[location])

  return (
    <div className="App">
      <div className="App_header">
        <img
          className="App_header_img"
          src= {"https://www.xtrafondos.com/wallpapers/rick-y-morty-escapando-de-portal-9235.jpg"}
          alt="foto Rick and Morty"
        />

        <div className="App_header-form" >
          <form onSubmit={handleSubmit}>
            <input
              className="search-dimension"
              id="searchValue"
              value={locationName}
              type="text"
              onChange={handleChangeInput}
              placeholder="search your dimension"
            />
            <button type="submit">Search</button>

            {showError ? <ErrorMessage /> : ""}
          </form>
        </div>
      </div>

      <div className="App_body">
        <LocationFilter
          locationName={locationName}
          getNewLocation={getNewLocation}
        />

        <LocationInfo location={location} />

        <ResidentList location={location} />
      </div>

      <ul className="current_pages">
        {
          getAllPages().map(page => (
            <li key={page}>{page}</li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
