import React from "react";

export const Planet = () => {

    return (

        <div className="container bg-dark">
            <div className="card my-2  bg-dark text-light">
                <div className="row g-0">
                    <h1>Alderaan</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img className="img-fluid rounded" src="https://starwars-visualguide.com/assets/img/planets/2.jpg" />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <p><strong>Diameter: </strong>12500</p>
                            <p><strong>Rotation Period: </strong>24</p>
                            <p><strong>Orbital Period: </strong>364</p>
                            <p><strong>Gravity: </strong>1 standard</p>
                            <p><strong>Population: </strong>2000000000</p>
                            <p><strong>Climate: </strong>temperate</p>
                            <p><strong>Terrain: </strong>grasslands, mountains</p>
                            <p><strong>Surface water: </strong>40</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}