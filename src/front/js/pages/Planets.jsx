import React from "react";

export const Planets = () => {


    return (

        <div className="container bg-dark mb-3">
            <h1 className="text-light text-center pt-4">
                Planets
            </h1>
               <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                <div className="col">
                    <div className="card border-dark my-3 mx-2 text-bg-dark">
                        <img className="card-img-top" alt="Tatooine" src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg" />
                        <div className="card-body">
                            <h5 className="card-title">
                                Tatooine
                            </h5>
                            <div className="d-flex justify-content-between">
                                <a className="btn btn-secondary" href="/planet/1">Details</a>
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