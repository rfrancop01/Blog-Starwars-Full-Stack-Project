import React from "react";
import starWarsUrl from "../../img/starwars-logo.png";



export const Characters = () => {


    return (

        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">
                Characters
            </h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                <div className="col">
                    <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                        <img alt="" src="https://starwars-visualguide.com/assets/img/characters/1.jpg" />
                        <div className="card-body">
                            <h5 className="card-title">
                                Luke Skywalker
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
            </div>
        </div>
    )
}