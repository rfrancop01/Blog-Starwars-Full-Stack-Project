import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Characters = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);


    return (

        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">Characters</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {store.characters.map((item) =>
                    <div key={item.uid} className="col">
                        <div className="card mx-2 my-2">
                            <img alt="" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {item.name}
                                </h5>
                                <div className="d-flex justify-content-between">
                                    <a className="btn btn-secondary" href="/character/1">Details</a>
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