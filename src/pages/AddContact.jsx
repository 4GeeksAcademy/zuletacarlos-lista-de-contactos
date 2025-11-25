import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const navigate = useNavigate();
    const myUser = "Carlos";
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            method: "POST",
            body: JSON.stringify(contact),
            headers: { "Content-Type": "application/json" }
        };

        fetch(`https://playground.4geeks.com/contact/agendas/${myUser}/contacts`, config)
            .then(response => {
                if (response.ok) {
                    navigate("/"); 
                } else {
                    console.log("Error al guardar");
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Add a new contact</h1>
            
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" className="form-control" placeholder="Full Name"
                        name="name" onChange={handleChange} value={contact.name} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" placeholder="Enter email"
                        name="email" onChange={handleChange} value={contact.email} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter phone"
                        name="phone" onChange={handleChange} value={contact.phone} required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" className="form-control" placeholder="Enter address"
                        name="address" onChange={handleChange} value={contact.address} required 
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                
                <Link to="/" className="d-block mt-3 text-center">or get back to contacts</Link>
            </form>
        </div>
    );
};

export default AddContact;