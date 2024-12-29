import React from "react";

export const Starship = () => {

    return (

        <div className="container bg-dark">
            <div className="card my-2  bg-dark text-light mt-3">
                <div className="row g-0">
                    <h1>CR90 corvette</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img className="img-fluid rounded" src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg" />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <p><strong>Model: </strong>CR90 corvette</p>
                            <p><strong>Starship class: </strong>corvette</p>
                            <p><strong>Manufacturer: </strong>Corellian Engineering Corporation</p>
                            <p><strong>Cost in credits: </strong>3500000</p>
                            <p><strong>Length: </strong>150</p>
                            <p><strong>Crew: </strong>30-165</p>
                            <p><strong>Passengers: </strong>600</p>
                            <p><strong>Max atmosphering speed: </strong>950</p>
                            <p><strong>Hyperdrive rating: </strong>2.0</p>
                            <p><strong>MGLT: </strong>60</p>
                            <p><strong>Cargo capacity: </strong>3000000</p>
                            <p><strong>Consumables: </strong>1 year</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}