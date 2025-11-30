import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { Modal } from "../components/Modal.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const myUser = "Carlos";

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const loadContacts = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}/contacts`);

            if (response.status === 404) {
                await createAgenda();
                return;
            }

            const data = await response.json();
            dispatch({ type: "load_contacts", payload: data.contacts });
        } catch (error) {
            console.error(error);
        }
    };

    const createAgenda = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}`, {
                method: "POST"
            });
            if (response.ok) {
                loadContacts();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openDeleteModal = (id) => {
        setIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}/contacts/${idToDelete}`, {
                method: "DELETE"
            });

            if (response.ok) {
                loadContacts();
                setShowModal(false);
                setIdToDelete(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">

                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/new-contact">
                            <button className="btn btn-success">Add new contact</button>
                        </Link>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        {store.contacts && store.contacts.length > 0 ? (
                            store.contacts.map((contact) => (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                    onDelete={openDeleteModal}
                                />
                            ))
                        ) : (
                            <div className="text-center p-5 bg-light rounded border">
                                <h3>📇</h3>
                                <p>No Contacts. ¡Add New!</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Home;