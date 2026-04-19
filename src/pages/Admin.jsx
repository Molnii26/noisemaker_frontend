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
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [allUsers, setAllUsers] = useState(null)
    const [errorAllUsers, setErrorAllUsers] = useState('')

    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [User_Role, setRole] = useState('')

    const [Product_Id, setProductId] = useState('')
    const [Product_Name, setProductName] = useState('')
    const [ProductPrice, setProductPrice] = useState('')
    const [ProductDescription, setProductDescription] = useState('')
    const [Stock, setStock] = useState('')

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
            .then(data => {
                console.log("orders:", data) // ← nézd meg mi jön
                setOrders(Array.isArray(data) ? data : data.orders ?? [])
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:3000/products/getAllProducts")
            .then(res => res.json())
            .then(data => {
                console.log("products:", data) // ← nézd meg mi jön
                setProducts(Array.isArray(data) ? data : data.products ?? [])
            })
            .catch(err => console.error(err))
    }, [])


    async function onDelete(item) {
    if (item.Product_Id !== undefined) {

        const confirmDelete = window.confirm(`Biztosan törölni akarod a "${item.Product_Name}" terméket?`)
        if (!confirmDelete) return

        const res = await fetch(`http://127.0.0.1:3000/products/deleteProduct/${item.Product_Id}`, {
            method: 'DELETE'
        })
        const data = await res.json()

        if (data.error) return alert(data.error)

        setProducts(prev => prev.filter(p => p.Product_Id !== item.Product_Id))
        return alert('Termék sikeresen törölve')
    }

    if (item.Order_Id !== undefined) {
        // Rendelés törlése
        const confirmDelete = window.confirm(`Biztosan törölni akarod a ${item.Order_Id} számú rendelést?`)
        if (!confirmDelete) return

        const res = await fetch(`http://127.0.0.1:3000/orders/deleteOrder/${item.Order_Id}`, {
            method: 'DELETE'
        })
        const data = await res.json()

        if (data.error) return alert(data.error)

        setOrders(prev => prev.filter(o => o.Order_Id !== item.Order_Id))
        return alert('Rendelés sikeresen törölve')
    }

    // Felhasználó törlése
    const confirmDelete = window.confirm(`Biztosan törölni akarod a ${item.Username} felhasználót?`)
    if (!confirmDelete) return

    const data = await deleteUser(item.User_Id)
    if (data.error) return alert(data.error)

    setUsers(prev => prev.filter(u => u.User_Id !== item.User_Id))
    return alert('Felhasználó sikeresen törölve')
}

    async function onModify(user) {
        setSelectedUser(user)

        setUsername(user.Username)
        setEmail(user.Email)
        setRole(user.User_Role)

        setShowModal(true)
    }

    async function onModifyOrder(order) {
        setSelectedUser(order)

        setUsername(order.Username)
        setEmail(order.Email)
        setRole(order.User_Role)

        setShowModal(true)
    }

    async function onModifyProduct(product) {
        setSelectedUser(product)

        setProductId(product.Product_Id)
        setProductName(product.Product_Name)
        setProductPrice(product.ProductPrice)
        setProductDescription(product.ProductDescription)
        setStock(product.Stock)

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
            <Table users={users} orders={orders} products={products} onDelete={onDelete} onModify={onModify} />

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