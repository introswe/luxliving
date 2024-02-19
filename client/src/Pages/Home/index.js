import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Layout from '../Layout'; 
import './style.home.css';

import image1 from './images/home1.jpg'; 
import image2 from './images/home2.jpg'; 
import image3 from './images/home3.jpg';

import featured1 from './images/featured1.jpg';
import featured2 from './images/featured2.jpg';
import featured3 from './images/featured3.jpg';
import featured4 from './images/featured4.jpg';

const featuredFurniture = [
  { src: featured1, title: 'Bedrooms'}, 
  { src: featured2, title: 'Furniture'},
  { src: featured3, title: 'Living room'},
  { src: featured4, title: 'Storage & Organization'},
];

const images = [image1, image2, image3];


const HomePage = () => {
    const navigate = useNavigate();
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
    };

    const goToProducts = () => {
      navigate('/products');
    };

    return (
      <Layout>
      <h1 className="slogan"><span className="lux">Crafting Comfort,</span> Embodying Elegance</h1>
      <div className="home-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Furniture ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="featured-furniture">
        {featuredFurniture.map((item, index) => (
            <div key={index} className="featured-item" onClick={goToProducts}>
              <img src={item.src} alt={item.title} style={{cursor: 'pointer'}} />
              <p style={{cursor: 'pointer'}}>{item.title}</p> 
            </div>
        ))}
      </div>
    </Layout>
    );
  };

export default HomePage;
