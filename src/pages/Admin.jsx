import Header from "../components/Header";
import { useState, useEffect } from "react";
import '../css/App.css'
import Footer from "../components/Footer";
import Table from "../components/Table";
import { userEdit, deleteUser } from "../api";

const authFetch = (url, options = {}) => fetch(url, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers }
})

export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [categories, setCategory] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')

    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [User_Role, setRole] = useState('')

    const [Product_Name, setProductName] = useState('')
    const [ProductPrice, setProductPrice] = useState('')
    const [ProductDescription, setProductDescription] = useState('')
    const [Stock, setStock] = useState('')

    const [OrderStatus, setOrderStatus] = useState('')



    useEffect(() => {
        authFetch("http://127.0.0.1:3000/users/getAllUsers")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        authFetch("http://127.0.0.1:3000/orders/allOrders")
            .then(res => res.json())
            .then(data => setOrders(Array.isArray(data) ? data : data.orders ?? []))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        authFetch("http://127.0.0.1:3000/products/getAllProducts")
            .then(res => res.json())
            .then(data => setProducts(Array.isArray(data) ? data : data.products ?? []))
            .catch(err => console.error(err))
    }, [])

    async function onDelete(item) {
        if (item.Product_Id !== undefined) {
            if (!window.confirm(`Biztosan törölni akarod a "${item.Product_Name}" terméket?`)) return

            const res = await authFetch(`http://127.0.0.1:3000/products/deleteProduct/${item.Product_Id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.error) return alert(data.error)

            setProducts(prev => prev.filter(p => p.Product_Id !== item.Product_Id))
            return alert('Termék sikeresen törölve')
        }

        if (item.Order_Id !== undefined) {
            if (!window.confirm(`Biztosan törölni akarod a ${item.Order_Id} számú rendelést?`)) return

            const res = await authFetch(`http://127.0.0.1:3000/orders/deleteOrder/${item.Order_Id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.error) return alert(data.error)

            setOrders(prev => prev.filter(o => o.Order_Id !== item.Order_Id))
            return alert('Rendelés sikeresen törölve')
        }

        if (!window.confirm(`Biztosan törölni akarod a(z) "${item.Username}" felhasználót?`)) return

        const data = await deleteUser(item.User_Id)
        if (data.error) return alert(data.error)

        setUsers(prev => prev.filter(u => u.User_Id !== item.User_Id))
        return alert('Felhasználó sikeresen törölve')
    }

    function onModify(user) {
        setSelectedUser(user)
        setModalType('user')
        setUsername(user.Username)
        setEmail(user.Email)
        setRole(user.User_Role)
        setShowModal(true)
    }

    function onModifyOrder(order) {
        setSelectedUser(order)
        setModalType('order')
        setOrderStatus(order.Order_Status ?? '')
        setShowModal(true)
    }

    function onModifyProduct(product) {
        setSelectedUser(product)
        setModalType('product')
        setProductName(product.Product_Name)
        setProductPrice(product.ProductPrice)
        setProductDescription(product.ProductDescription)
        setStock(product.Stock)
        setShowModal(true)
    }

    function openAddProductModal() {
        setSelectedUser({})
        setModalType('addProduct')
        setProductName('')
        setProductPrice('')
        setProductDescription('')
        setStock('')
        setShowModal(true)
    }

    function onModifyCategory(category) {
        setSelectedUser(category)
        setModalType('category')
        setCategory(category.CategoryName)
        setShowModal(true)
    }

    async function handleSave() {
        if (modalType === 'user') await editUser(selectedUser.User_Id)
        if (modalType === 'order') await editOrder(selectedUser.Order_Id)
        if (modalType === 'product') await editProduct(selectedUser.Product_Id)
        if (modalType === 'category') await editCategory(selectedUser.Category_Id)
        if (modalType === 'addProduct') await addProduct()
    }

    async function editUser(User_Id) {
        const data = await userEdit(User_Id, Username, Email, User_Role)
        if (data.error) return alert(data.error)

        setUsers(prev => prev.map(u => u.User_Id === User_Id ? { ...u, Username, Email, User_Role } : u))
        setShowModal(false)
        alert('Felhasználó sikeresen módosítva')
    }

    async function editOrder(Order_Id) {
        const res = await authFetch(`http://127.0.0.1:3000/orders/orderStatusModify/${Order_Id}`, {
            method: 'PUT',
            body: JSON.stringify({ Order_Status: OrderStatus })
        })
        const data = await res.json()
        if (data.error) return alert(data.error)

        setOrders(prev => prev.map(o => o.Order_Id === Order_Id ? { ...o, Order_Status: OrderStatus } : o))
        setShowModal(false)
        alert('Rendelés sikeresen módosítva')
    }

    async function editProduct(Product_Id) {
        const res = await authFetch(`http://127.0.0.1:3000/products/modifyProduct/${Product_Id}`, {
            method: 'PUT',
            body: JSON.stringify({ Product_Name, ProductPrice, ProductDescription, Stock })
        })
        const data = await res.json()
        if (data.error) return alert(data.error)

        setProducts(prev => prev.map(p => p.Product_Id === Product_Id ? { ...p, Product_Name, ProductPrice, ProductDescription, Stock } : p))
        setShowModal(false)
        alert('Termék sikeresen módosítva')
    }

    async function addProduct() {
        if (!Product_Name || !ProductPrice || !ProductDescription || !Stock)
            return alert('Minden mezőt ki kell tölteni!')

        const res = await authFetch('http://127.0.0.1:3000/products/addProduct', {
            method: 'POST',
            body: JSON.stringify({ Product_Name, ProductPrice, ProductDescription, Stock })
        })
        const data = await res.json()
        if (data.error) return alert(data.error)

        setProducts(prev => [...prev, data.product ?? data])
        setShowModal(false)
        alert('Termék sikeresen hozzáadva')
    }

    async function editCategory(Product_Id) {
        const res = await authFetch(`http://127.0.0.1:3000/categories/modifyCategoryName/${Product_Id}`, {
            method: 'PUT',
            body: JSON.stringify({ Product_Name, ProductPrice, ProductDescription, Stock })
        })
        const data = await res.json()
        if (data.error) return alert(data.error)

        setProducts(prev => prev.map(p => p.Product_Id === Product_Id ? { ...p, Product_Name, ProductPrice, ProductDescription, Stock } : p))
        setShowModal(false)
        alert('Termék sikeresen módosítva')
    }

    function renderModalFields() {
        if (modalType === 'user') return (
            <>
                <label className="form-label fw-bold mt-2">Felhasználónév</label>
                <input className="form-control" value={Username} onChange={e => setUsername(e.target.value)} />

                <label className="form-label fw-bold mt-2">Email</label>
                <input className="form-control" type="email" value={Email} onChange={e => setEmail(e.target.value)} />

                <label className="form-label fw-bold mt-2">Szerepkör</label>
                <select className="form-select" value={User_Role} onChange={e => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </>
        )

        if (modalType === 'order') return (
            <>
                <label className="form-label fw-bold mt-2">Rendelés státusza</label>
                <select className="form-select" value={OrderStatus} onChange={e => setOrderStatus(e.target.value)}>
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                </select>
            </>
        )

        if (modalType === 'product' || modalType === 'addProduct') return (
            <>
                <label className="form-label fw-bold mt-2">Termék neve</label>
                <input className="form-control" value={Product_Name} onChange={e => setProductName(e.target.value)} placeholder="pl. Laptop" />

                <label className="form-label fw-bold mt-2">Ár</label>
                <input className="form-control" type="number" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} placeholder="pl. 299990" />

                <label className="form-label fw-bold mt-2">Leírás</label>
                <textarea className="form-control" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} rows={3} placeholder="Termék leírása..." />

                <label className="form-label fw-bold mt-2">Készlet</label>
                <input className="form-control" type="number" value={Stock} onChange={e => setStock(e.target.value)} placeholder="pl. 10" />
            </>
        )
    }

    return (
        <>
            <Header />

            <div className="d-flex justify-content-end px-3 my-2">
                <button className="btn btn-success" onClick={openAddProductModal}>+ Új termék</button>
            </div>

            <Table
                users={users}
                orders={orders}
                products={products}
                categories={categories}
                onDelete={onDelete}
                onModify={onModify}
                onModifyOrder={onModifyOrder}
                onModifyProduct={onModifyProduct}
                onModifyCategory={onModifyCategory}
            />

            {showModal && selectedUser && (
                <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5 className="mb-3">
                                {modalType === 'user' && 'Felhasználó szerkesztése'}
                                {modalType === 'order' && 'Rendelés szerkesztése'}
                                {modalType === 'product' && 'Termék szerkesztése'}
                                {modalType === 'category' && 'Termék szerkesztése'}
                                {modalType === 'addProduct' && 'Új termék hozzáadása'}
                            </h5>

                            {renderModalFields()}

                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Bezárás</button>
                                <button className="btn btn-primary" onClick={handleSave}>
                                    {modalType === 'addProduct' ? 'Hozzáadás' : 'Mentés'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            {error && <div className="alert alert-danger text-center my-2">{error}</div>}
            {message && <div className="alert alert-success text-center my-2">{message}</div>}
        </>
    )
}