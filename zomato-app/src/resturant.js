import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orderonline.css'
import { Link, useParams } from 'react-router-dom';
import { Container } from './App';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const containerStyle={
        marginLeft:'2%'
    };

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/restaurant/${id}`);
                setRestaurant(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
                setError('Restaurant not found.');
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>; 
    }

    if (!restaurant) {
        return <p>Restaurant not found.</p>;
    }

    return (
        <div className='ResturantDetails'>
            <div className='navbar'>
                <Link className='navbar-img' to={'/'}>
                    <img src='https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png' alt='zomato' style={{width:'7vw',height:'7vh',marginTop:'3%',paddingLeft:'15vw'}}></img>
                </Link>
                <Container style={containerStyle}/>
            </div>
            <img src='https://b.zmtcdn.com/data/pictures/6/21250316/007a44d700c2993aff1f149514741b17.jpg' alt='resturant'></img>
            <h2 id='resname'>{restaurant.Restaurant_Name}</h2>
            <p id='location'>Location: {restaurant.City}</p>
            <p>Address: {restaurant.Address}</p>
            <p>Cuisine: {restaurant.Cuisines}</p>
            <p>Rating: {restaurant.Rating_text}</p>
            <p>Votes: {restaurant.Votes}</p>
            <p>AverageRating: {restaurant.Aggregate_rating}</p>
            <p>Has Online Delivery: {restaurant.Has_Online_delivery}</p>
        </div>
    );
};

export default RestaurantDetail;
