import Header from "../components/Header";
import { useState, useEffect } from "react";
import '../css/App.css'
import Footer from "../components/Footer";
import Table from "../components/Table";
import { userEdit, deleteUser } from "../api";
console.log(deleteUser);



export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [allUsers, setAllUsers] = useState(null)
    const [errorAllUsers, setErrorAllUsers] = useState('')

    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [User_Role, setRole] = useState('')

    console.log(users);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/users/getAllUsers")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:3000/orders/allOrders")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err))
    }, [])


    async function onDelete(user) {


        const confirmDelete = window.confirm(`Biztosan törölni akarod a ${user.Username} felhasználót?`)

        if (!confirmDelete) {
            return
        }
        const data = await deleteUser(user.User_Id)

        if (data.error) {
            return alert(errorAllUsers)
        }

        setUsers(prev => prev.filter(u => u.User_Id !== user.User_Id))

        return alert('Sikeres törlés')
    }

    async function onModify(user) {
        setSelectedUser(user)

        setUsername(user.Username)
        setEmail(user.Email)
        setRole(user.User_Role)

        setShowModal(true)
    }

    async function editUser(User_Id) {
        setErrorAllUsers('')

        const data = await userEdit(User_Id, Username, Email, User_Role)

        if (data.error) {
            setErrorAllUsers(data.error)
            return alert(errorAllUsers)
        }

        return alert('Sikeres módosítás')
    }


    return (
        <>
            <Header />
            <Table users={users} onDelete={onDelete} onModify={onModify} />

            {showModal && selectedUser && (
                <div className='modal d-block' tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Szerkesztés</h5>

                            <label className="form-label fw-bold">Username: </label>
                            <input
                                type="text"
                                className='form-control'
                                value={selectedUser.Username}
                                placeholder='John Doe'
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label className="form-label fw-bold">Role: </label>
                            <input
                                type="text"
                                className='form-control'
                                value={selectedUser.User_Role}
                                placeholder='admin/user'
                                onChange={(e) => setRole(e.target.value)}
                            />

                            <label className="form-label fw-bold">Email: </label>
                            <input
                                type="email"
                                className='form-control'
                                value={selectedUser.Email}
                                placeholder='example@example.com'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="d-flex justify-content-between">
                                <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Bezárás</button>

                                <button type='button' className='btn btn-primary' onClick={() => editUser(selectedUser.User_Id)}>Módosít</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            {error && <div className="alert alert-danger text-center my-2">{error}</div>}
            {message && <div className="alert alert-success text-center my-2">{message}</div>}
        </>
    );
}