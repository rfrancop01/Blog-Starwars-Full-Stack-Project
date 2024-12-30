import React, { useContext } from "react";
import starWarsUrl from "../../img/starwars-logo.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

    const { store, actions } = useContext(Context)

    const handleRemoveFavorite = (name) => {
        actions.removeFavorite(name);
    };

    return (

        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container-fluid d-flex justify-content-between mx-md-4 mt-4 mb-1">
                <div>
                    <Link className="navbar-brand " to="/"><img height="40" src={starWarsUrl} /></Link>
                </div>
                <div>
                    <ul className="nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link link-secondary" to="/characters">Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-secondary" to="/planets">Planets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-secondary" to="/starships">Starships</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-secondary" to="/contacts">Contacts</Link>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Favorites
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                                        {store.favorites.length}
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end">
                                    {store.favorites.length === 0 ? (
                                        <li>
                                            <span className="dropdown-item">No favorites selected</span>
                                        </li>
                                    ) : (
                                        store.favorites.map((favorite) => (
                                            <li key={`${favorite.uid}-${favorite.type}`} className="dropdown-item d-flex justify-content-between">
                                                <span>{favorite.name} - {favorite.type}</span>
                                                <button
                                                    className="btn btn-danger btn-sm ms-4"
                                                    onClick={() => handleRemoveFavorite(favorite.name)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};