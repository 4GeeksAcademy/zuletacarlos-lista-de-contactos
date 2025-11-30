import React from "react";

export const Modal = ({ show, onClose, onConfirm }) => {

    if (!show) return null;

    return (

        <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you sure?</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>If you delete this information, you will not recover it.</p>
                    </div>
                    <div className="modal-footer">
                        { }
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Back
                        </button>

                        { }
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};