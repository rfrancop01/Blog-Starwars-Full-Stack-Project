import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {

    const { store, actions} = useContext(Context)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate()

    const handleEmail = (event) => {setEmail(event.target.value)}
    const handlePassword = (event) => {setPassword(event.target.value)}

    const handleSignIn = async (event) =>{
        event.preventDefault();
        actions.setAlert({text: '', background: 'primary', visible: false})
        const dataToSend = { email, password };
        await actions.login(dataToSend);
        if (store.isLogged){
            navigate("/dashboard");
        }
    }

    return (
        <div className="card w-100 m-auto" style={{maxWidth: 330, padding: '1rem'}}>
            <form onSubmit={handleSignIn} className="container">
                <h1 className="h3 mb-3 fw-normal text-center mt-5 ">Log in</h1>
                <div className="form-floating mb-2">
                    <input 
                    value={email}
                    onChange={handleEmail}
                    type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div> 
                <div className="form-floating">
                    <input 
                    value={password}
                    onChange={handlePassword}
                    type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-warning w-100 py-2 my-3" type="submit">Sign in</button>
                <div className="fs-6 fw-lighter">You don't have account? 
                    <Link  to="/sign-up" className="ms-1 text-decoration-none"> Sign up </Link>
                </div>
            </form>
        </div>
    );
}