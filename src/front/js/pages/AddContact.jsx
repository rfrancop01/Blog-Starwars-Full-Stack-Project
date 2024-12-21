import React from "react";
import { Link } from "react-router-dom";


export const AddContact = () => {
    const baseURL = "https://playground.4geeks.com/contact/agendas";
    const slug = "Ricardo";

    const newContact = async () =>{
        
    }


    return (
        <div className="container my-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="exampleInputFullName" aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                    <input type ="tel" id="phone" name="phone" pattern="+34-[0-9]{3}[0-9]{3}[0-9]{3}" required className="form-control" aria-describedby="phoneHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                    <input type="address" className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" />
                </div>
                <button type="submit" className="btn btn-primary container">Save</button>
            </form>
            <Link to="/Contacts">or get back to contacts </Link>
        </div>

    )
}