import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import './container.css';
import './service.css';

import { Services } from './service';
import { Link} from 'react-router-dom';

const place = "Hyderabad"; 

const App = () => {
  return (
    <div className="App">
      <Brandlogo />
      <Services />
    </div>
  );
};

const Brandlogo = () => {
  const containerStyle = {
    marginLeft: '20%', 
  };

  return (
    <div className="brandlogo">
      <BrandImage />
      <Title />
      <Container style={containerStyle} />
    </div>
  );
};

const BrandImage = () => {
  return (
    <div className='brandlogoimghome'>
      <img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="brand logo" />
    </div>
  );
};

const Title = () => {
  return (
    <div className="title">
      <h4>Discover the best food & drinks in {place}</h4> {/* Interpolate place here */}
    </div>
  );
};

export const Container = ({ style }) => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
    useEffect(()=>{
        const handleSearch = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/api/restaurants/search?query=${query}`);
            console.log(response.data); 
            setResults(response.data);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
      handleSearch();
    },[]);
  return (
    <div className="search-container" style={style}>
      <input type="text" id="location-box" placeholder="Hyderabad" />
      <div className="separator"></div>
      <input type="text" id="search-box" placeholder="Search for restaurants, cuisine or a dish" />
        <button id="search-button">
          <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default App;
