import './home.css';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

// Sections of HomePage
import IntroSection from './Intro.js';
import RecipeSection from './RecipeSection.js';

class Home extends Component {
    // Parallax Effect
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { pass: true });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const parallax = document.querySelector('.parallax');
        let scrollPosition = window.pageYOffset;
        parallax.style.transform = 'translateY(' + scrollPosition * 0.7 + 'px)';
    }

    render() {
        return (
            <div className="home">
                <IntroSection />
                <RecipeSection />
            </div>
        );
    }
}

export default Home;