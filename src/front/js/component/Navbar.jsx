import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";

export const Navbar = () => {
	//Code JS
	return (

<nav className="navbar navbar-dark bg-dark mb-3">
    <div className="container-fluid d-flex justify-content-between mx-md-4 mt-4 mb-1">
        <div>
            <Link className="navbar-brand " to="/"><img className="rounded-circle" height="55" src={rigoImageUrl}/></Link>
        </div>
        <div>
            <ul className="nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link link-secondary" to="/contacts">Contacts</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link-secondary" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link-secondary" to="/todo-list">To Do List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link link-secondary" to="/login">Login</Link>
                </li>
            
            </ul>
        </div>
    </div>
</nav>
	);
};