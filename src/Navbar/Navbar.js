import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './navbar.css';
import { UserContext } from '../context/UserContext';

function Navbar() {

    // Check if the user is logged In
    const user = useContext(UserContext);
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <Link to="/" className="nav-link">
                        <span className="link-text logo-text">Fooduko</span>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="angle-double-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                        >
                            <g className="fa-group">
                                <path
                                    fill="currentColor"
                                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                    className="fa-secondary"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                    className="fa-primary"
                                ></path>
                            </g>
                        </svg>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <img src="https://image.flaticon.com/icons/png/128/589/589521.png" data-src="https://image.flaticon.com/icons/png/128/589/589521.png" srcSet="https://image.flaticon.com/icons/png/128/589/589521.png 4x" alt="House" title="House" />
                        <span className="link-text">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/recipes" className="nav-link">
                        <img src="https://image.flaticon.com/icons/png/128/3823/3823283.png" data-src="https://image.flaticon.com/icons/png/128/3823/3823283.png" srcSet="https://image.flaticon.com/icons/png/128/3823/3823283.png 4x" alt="Soup" />
                        <span className="link-text">Recipes</span>
                    </Link>
                </li>

                {/* Show user routes only when the user is logged in. */}
                {user != null ?
                    <>
                        <li className="nav-item">
                            <Link to={"/profile/" + user.uid} className="nav-link">
                                <img src="https://image.flaticon.com/icons/png/128/3638/3638191.png" data-src="https://image.flaticon.com/icons/png/128/3638/3638191.png" srcSet="https://image.flaticon.com/icons/png/128/3638/3638191.png 4x" alt="Player"></img>
                                <span className="link-text"> My Profile </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">
                                <img src="https://image.flaticon.com/icons/png/512/1082/1082434.png" data-src="https://image.flaticon.com/icons/png/512/1082/1082434.png" srcSet="https://image.flaticon.com/icons/png/512/1082/1082434.png 4x" alt="Player"></img>
                                <span className="link-text"> Logout </span>
                            </Link>
                        </li>
                    </>
                    : <li className="nav-item">
                        <Link to="/auth" className="nav-link">
                            <img src="https://image.flaticon.com/icons/png/128/272/272354.png" data-src="https://image.flaticon.com/icons/png/128/272/272354.png" alt="Login free icon" srcSet="https://image.flaticon.com/icons/png/128/272/272354.png 4x" />
                            <span className="link-text">Login</span>
                        </Link>
                    </li>}


                <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                        <img src="https://image.flaticon.com/icons/png/128/1034/1034255.png" data-src="https://image.flaticon.com/icons/png/128/1034/1034255.png" alt="Contact free icon" srcSet="https://image.flaticon.com/icons/png/128/1034/1034255.png 4x" />
                        <span className="link-text">Contant Us</span>
                    </Link>
                </li>
            </ul>
        </nav >

    );
}

export default Navbar;
