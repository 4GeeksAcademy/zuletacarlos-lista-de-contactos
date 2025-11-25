import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; 
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const myUser = "Carlos";

    // 1. Cargar contactos
    const loadContacts = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}/contacts`);
            
            if (response.status === 404) {
                console.log("No existe la agenda, creando una nueva...");
                await createAgenda();
                return;
            }

            const data = await response.json();
            dispatch({ type: "load_contacts", payload: data.contacts });

        } catch (error) {
            console.error("Error cargando contactos:", error);
        }
    };

    // 2. Crear agenda si hace falta
    const createAgenda = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}`, {
                method: "POST"
            });
            if (response.ok) {
                console.log("Agenda creada!");
                loadContacts();
            }
        } catch (error) {
            console.error("Error creando agenda:", error);
        }
    };

    // 3. Borrar contacto
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Seguro que quieres borrarlo?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myUser}/contacts/${id}`, {
                method: "DELETE"
            });
            
            if (response.ok) {
                console.log("Borrado con éxito");
                loadContacts(); // Recargamos la lista
            }
        } catch (error) {
            console.error("Error borrando:", error);
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
                                    onDelete={handleDelete} 
                                />
                            ))
                        ) : (
                            <div className="text-center p-5 bg-light border rounded">
                                <h3>📇</h3>
                                <p>No hay contactos. ¡Agrega uno!</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;