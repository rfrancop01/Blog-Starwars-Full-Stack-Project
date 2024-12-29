import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Characters = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);


    return (

        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Characters</h1>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2">
                {store.characters.map((item) =>
                    <div key={item.uid} className="col">
                        <div className="card mx-2 my-2 border border-0">
                            <img alt="" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {item.name}
                                </h5>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/characters/${item.uid}`}>
                                    <a className="btn btn-secondary">Details</a>
                                    </Link>
                                    <span className="btn btn-outline-warning">
                                        <i className="far fa-heart fa-lg">
                                        </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                )}
            </div>
        </div>
    )
}