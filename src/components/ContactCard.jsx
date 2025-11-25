import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center bg-light">
                    <img
                        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                        className="img-fluid rounded-circle p-3"
                        alt="Profile"
                        style={{ width: "140px", height: "140px", objectFit: "cover" }}
                    />
                </div>

                <div className="col-md-7">
                    <div className="card-body h-100 d-flex flex-column justify-content-center">
                        <h5 className="card-title mb-3 fs-4">{contact.name}</h5>
                        <p className="text-secondary mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                        <p className="text-secondary mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                        <p className="text-secondary mb-0"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                    </div>
                </div>

                <div className="col-md-2 d-flex flex-column justify-content-center align-items-center gap-3 py-3 border-start">
                    { }
                    <button className="btn btn-outline-dark border-0" onClick={() => alert("Editar todavía no está listo")}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>

                    { }
                    <button className="btn btn-outline-danger border-0" onClick={() => onDelete(contact.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;