import Header from "../components/Header"
import Footer from "../components/Footer"
import Table from "../components/Table"
import { useState, useEffect } from "react"
import {
    getAllUsers, userEdit, deleteUser,
    getProducts, addProduct, editProduct, deleteProduct,
    getAllOrders, editOrderStatus, deleteOrder
} from "../api"

export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)

    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [User_Role, setRole] = useState('user')
    const [Product_Name, setProductName] = useState('')
    const [ProductPrice, setProductPrice] = useState('')
    const [ProductDescription, setProductDescription] = useState('')
    const [Stock, setStock] = useState('')
    const [OrderStatus, setOrderStatus] = useState('pending')

    useEffect(() => {
        getAllUsers().then(d => setUsers(Array.isArray(d) ? d : [])).catch(console.error)
        getAllOrders().then(d => setOrders(Array.isArray(d) ? d : [])).catch(console.error)
        getProducts().then(d => setProducts(Array.isArray(d) ? d : [])).catch(console.error)
    }, [])

    async function onDelete(item) {
        if (item.Product_Id !== undefined) {
            if (!window.confirm(`Törlöd a "${item.Product_Name}" terméket?`)) return
            const data = await deleteProduct(item.Product_Id)
            if (data.error) return alert(data.error)
            setProducts(prev => prev.filter(p => p.Product_Id !== item.Product_Id))
            return alert('Termék törölve')
        }
        if (item.Order_Id !== undefined) {
            if (!window.confirm(`Törlöd a ${item.Order_Id}. rendelést?`)) return
            const data = await deleteOrder(item.Order_Id)
            if (data.error) return alert(data.error)
            setOrders(prev => prev.filter(o => o.Order_Id !== item.Order_Id))
            return alert('Rendelés törölve')
        }
        if (!window.confirm(`Törlöd a(z) "${item.Username}" felhasználót?`)) return
        const data = await deleteUser(item.User_Id)
        if (data.error) return alert(data.error)
        setUsers(prev => prev.filter(u => u.User_Id !== item.User_Id))
        alert('Felhasználó törölve')
    }

    function openModal(type, item = {}) {
        setSelectedItem(item)
        setModalType(type)
        if (type === 'user') {
            setUsername(item.Username ?? '')
            setEmail(item.Email ?? '')
            setRole(item.User_Role ?? 'user')
        }
        if (type === 'order') setOrderStatus(item.Order_Status ?? 'pending')
        if (type === 'product' || type === 'addProduct') {
            setProductName(item.Product_Name ?? '')
            setProductPrice(item.ProductPrice ?? '')
            setProductDescription(item.ProductDescription ?? '')
            setStock(item.Stock ?? '')
        }
        setShowModal(true)
    }

    async function handleSave() {
        if (modalType === 'user') {
            const data = await userEdit(selectedItem.User_Id, Username, Email, User_Role)
            if (data.error) return alert(data.error)
            setUsers(prev => prev.map(u =>
                u.User_Id === selectedItem.User_Id
                    ? { ...u, Username, Email, User_Role }
                    : u
            ))
            setShowModal(false)
            alert('Felhasználó módosítva')
        }
        if (modalType === 'order') {
            const data = await editOrderStatus(selectedItem.Order_Id, OrderStatus)
            if (data.error) return alert(data.error)
            setOrders(prev => prev.map(o =>
                o.Order_Id === selectedItem.Order_Id
                    ? { ...o, Order_Status: OrderStatus }
                    : o
            ))
            setShowModal(false)
            alert('Rendelés módosítva')
        }
        if (modalType === 'product') {
            const data = await editProduct(selectedItem.Product_Id, {
                Product_Name, ProductPrice, ProductDescription, Stock
            })
            if (data.error) return alert(data.error)
            setProducts(prev => prev.map(p =>
                p.Product_Id === selectedItem.Product_Id
                    ? { ...p, Product_Name, ProductPrice, ProductDescription, Stock }
                    : p
            ))
            setShowModal(false)
            alert('Termék módosítva')
        }
        if (modalType === 'addProduct') {
            if (!Product_Name || !ProductPrice || !ProductDescription || !Stock)
                return alert('Minden mezőt ki kell tölteni!')
            const data = await addProduct({ Product_Name, ProductPrice, ProductDescription, Stock })
            if (data.error) return alert(data.error)
            setProducts(prev => [...prev, data.product ?? data])
            setShowModal(false)
            alert('Termék hozzáadva')
        }
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
                <label className="form-label fw-bold mt-2">Státusz</label>
                <select className="form-select" value={OrderStatus} onChange={e => setOrderStatus(e.target.value)}>
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s =>
                        <option key={s} value={s}>{s}</option>
                    )}
                </select>
            </>
        )
        if (modalType === 'product' || modalType === 'addProduct') return (
            <>
                <label className="form-label fw-bold mt-2">Termék neve</label>
                <input className="form-control" value={Product_Name} onChange={e => setProductName(e.target.value)} />
                <label className="form-label fw-bold mt-2">Ár</label>
                <input className="form-control" type="number" value={ProductPrice} onChange={e => setProductPrice(e.target.value)} />
                <label className="form-label fw-bold mt-2">Leírás</label>
                <textarea className="form-control" value={ProductDescription} onChange={e => setProductDescription(e.target.value)} rows={3} />
                <label className="form-label fw-bold mt-2">Készlet</label>
                <input className="form-control" type="number" value={Stock} onChange={e => setStock(e.target.value)} />
            </>
        )
    }

    const modalTitle = {
        user: 'Felhasználó szerkesztése',
        order: 'Rendelés szerkesztése',
        product: 'Termék szerkesztése',
        addProduct: 'Új termék hozzáadása'
    }

    return (
        <>
            <Header />
            <div className="d-flex justify-content-end px-3 my-2">
                <button className="btn btn-success" onClick={() => openModal('addProduct')}>+ Új termék</button>
            </div>
            <Table
                users={users}
                orders={orders}
                products={products}
                onDelete={onDelete}
                onModify={item => openModal('user', item)}
                onModifyOrder={item => openModal('order', item)}
                onModifyProduct={item => openModal('product', item)}
            />
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5 className="mb-3">{modalTitle[modalType]}</h5>
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
        </>
    )
}