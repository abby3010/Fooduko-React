import React from 'react';
import homebg from './side picture.jpg'
import './intro.css';

const Intro = () => {
    return (
        <section className="Banner" alt="homebg">
            <img src={homebg} alt="homebg" className="parallax" />
            <div className="content">
                <h2>FOODUKO</h2>
                <div className="para">
                    Hey Foodie!! Surfing over internet to find what to eat?
                    Hang on and take a pit-stop here to find out exotic, mouth watering, Indian delicacies.
                            Have a look at our different collections and choose what you would like to eat today.<br /><br />
                    <div className="search">
                        <label htmlFor="search-input"> Search Bar </label>
                        <input type="text" id="search-input" name="input-box" className="search-input" placeholder="Search your food" />
                        <button className="search-btn" type="submit" onClick={() => { console.log("Search Clicked") }}>Let's Eat</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Intro