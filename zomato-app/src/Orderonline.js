import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './orderonline.css';
import { Container } from './App';

export const Navbar = () => {
    const containerStyleorderonline = {
        marginLeft: '2%',
    };
    return (
        <div className='navbar'>
            <Link to={'/'}>
                <img src='https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png' alt='zomato'></img>
            </Link>
            <Container style={containerStyleorderonline} />
        </div>
    );
}

const foodItemImagesList = [
    'https://b.zmtcdn.com/data/pictures/0/18582430/c337c8225efdba2907337df38cfa76c4.jpg',
    'https://b.zmtcdn.com/data/pictures/0/18657420/0d9c1cdf9964b255c4d6c1c50035766b.jpg',
    'https://b.zmtcdn.com/data/pictures/0/18657420/dcf0f06919558317229ac034b252823e.jpg',
    'https://b.zmtcdn.com/data/pictures/chains/0/18657420/16b4e1bd319600dda2388701fa7992a8.png',
    'https://b.zmtcdn.com/data/pictures/0/18657420/8969cf9f25a90f2715a01d80c42b62c7.jpeg',
    'https://b.zmtcdn.com/data/pictures/3/2100843/0aea4e8da17dfdb2ef6ac1787c89a806.jpg',
    'https://b.zmtcdn.com/data/reviews_photos/b3b/d9f6fe25c56b5d7342593b447ef63b3b_1547481606.jpg',
    'https://b.zmtcdn.com/data/reviews_photos/d43/74d469c06747d622dd494eac07ae0d43_1701763901.jpg',
    'https://b.zmtcdn.com/data/pictures/2/2100712/91c452b01a7da56727855bac3777f3ab.jpg',
];

const Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(6);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/restaurants?page=${page}&limit=${limit}`);
                const restaurantData = response.data.map((restaurant, index) => ({
                    ...restaurant,
                    foodItemImage: foodItemImagesList[Math.floor(Math.random() * 10)], // Selecting a food item image based on index
                }));
                setRestaurants(restaurantData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [page, limit]);

    const handleNext = () => {
        setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <h2 style={{ marginTop: '2%' }}>List of Restaurants</h2>
            {loading && <p>Loading...</p>}
            {restaurants && (
                <div className="restaurant-cards-container">
                    {restaurants.map((restaurant) => (
                        <Link key={restaurant.Restaurant_ID} to={`/restaurant/${restaurant.Restaurant_ID}`} className="restaurant-card-link">
                            <div className="restaurant-card">
                                <img className="restaurant-image" src={restaurant.foodItemImage} alt={`Food item`} />
                                <h3>{restaurant.Restaurant_Name}</h3>
                                <p>Location: {restaurant.City}</p>
                                <p>Cuisine: {restaurant.Cuisines}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className='prevNextbtn'>
                <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Restaurant;
