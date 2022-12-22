import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import LocationFilter from "./components/LocationFilter";
import LocationInfo from "./components/LocationInfo";
import ResidentList from "./components/ResidentList";
import getRandomNumer from "./utils/getRandomNumber";

function App() {
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState("");
  const [showError, setShowError] = useState(false);

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

  return (
    <div className="App">
      <div className="App_header">
        <img
          className="App_header_img"
          src={
            "https://s3-alpha-sig.figma.com/img/f757/e216/34f8ffb34b0055d2a2a34bc10390c23c?Expires=1672617600&Signature=DoSytUADF3aiu4lzt7FlUrPrlAGU8XI34my5yrvd6WQklHXZdkijBMXW3GIJa95M5hMHZaR6aMRTi1SmOvAUM1O8ienM-3bLnPmyWQp4IId7dFo7BQr3~B8ztWgwDPQjNF8Q9RJXxZl6AKywGuKZ-2jN3N-w-GaMhoqWXXGY82Fe-SAALS~juFLvBuuufl3GHXhOQRkig83ANpftq4PiQ4dnKgD~CklAhSmK7D3i8Ki3b~vUEGEAULHuUNQ6wYFO5QGcZe084ATH4I6OZktkROtCTn3xp7XZyTF1yAwtezLqaQFpCTOYN47pgY4TjzTu8ZZKNsbQn5IfPaF2N18fGA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          }
          alt=""
        />

        <div className="App_header-form" >
          <form onSubmit={handleSubmit}>
            <input
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
    </div>
  );
}

export default App;
