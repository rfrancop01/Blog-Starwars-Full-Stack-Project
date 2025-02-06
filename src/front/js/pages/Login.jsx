import React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {

    return (
        <div className="form-signin w-100 m-auto" style={{maxWidth: 330, padding: '1rem'}}>
            <form className="container">
                <h1 className="h3 mb-3 fw-normal text-center mt-5 text-light">Log in</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2 mt-4" type="submit">Sign in</button>
            </form>
        </div>
    );
}