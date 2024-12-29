import React from "react";

export const Character = () => {

    return (

        <div className="container bg-dark">
            <div className="card my-2  bg-dark text-light">
                <div className="row g-0">
                    <h1>Luke Skywalker</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5 mt-2">
                        <img className="img-fluid rounded-start" src="https://starwars-visualguide.com/assets/img/characters/1.jpg" />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <p><strong>Height: </strong>172</p>
                            <p><strong>Mass: </strong>77</p>
                            <p><strong>Hair color: </strong>blond</p>
                            <p><strong>Skin color: </strong>fair</p>
                            <p><strong>Eye color: </strong>blue</p>
                            <p><strong>Birth year: </strong></p>
                            <p><strong>Gender: </strong>male</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}