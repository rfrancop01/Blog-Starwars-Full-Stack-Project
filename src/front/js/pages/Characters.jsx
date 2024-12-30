import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Characters = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const handleNextPage = () => {
        if (store.currentPage < store.totalPages) {
            actions.setPage(store.currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (store.currentPage > 1) {
            actions.setPage(store.currentPage - 1);
        }
    };


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
                                    <Link to={`/characters/${item.uid}`} className="btn btn-secondary">Details</Link>
                                    <span className="btn btn-outline-warning">
                                        <i className="far fa-heart fa-lg"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-primary"
                    onClick={handlePrevPage}
                    disabled={store.currentPage === 1}
                >
                    Anterior
                </button>
                <span>
                    Página {store.currentPage} de {store.totalPages}
                </span>
                <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    disabled={store.currentPage === store.totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}