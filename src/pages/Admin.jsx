import Header from "../components/Header";
import { useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import OrderInfo from "../components/OrderInfo";
import '../css/App.css'
import Footer from "../components/Footer";



export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
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

    async function deleteUser(id) {
        try {
            const data = await deleteUser(id)
            if (!data.ok) {
                return setError(data.error)
            }
            else {
                return setMessage(data.message)
            }
        } catch (err) {
            setError('Nem sikerült kapcsolódni a backendhez.')
        }
    }
    
    async function onDelete(id) {
        setError('')
        setMessage('')

        try {
            await deleteUser(id)
            setUsers(users.filter(user => user.User_Id !== id))
            setMessage('Sikeres törlés!')
        } catch (err) {
            console.log(err);
            setError('Hiba történt a törlés során.')
        }
    }

    // async function onModify(id) {

    // }

    return (
        <>
            <Header />

            <div className="adminpanel">
                <h2>Felhasználók</h2>
                <table className="table-admin">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Név</th>
                            <th>Email</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <UserInfo
                                key={user.User_Id}
                                user_id={user.User_Id}
                                username={user.Username}
                                email={user.Email}
                                onDelete={onDelete()}
                            />
                        ))}

                    </tbody>
                </table>

                <h2>Rendelések</h2>
                <table className="table-admin">
                    <thead>
                        <tr>
                            <th>Rendelés ID</th>
                            <th>ID</th>
                            <th>Rendelés Státusz</th>
                            <th>Dátum</th>
                            <th>Telefonszám</th>
                            <th>Irányítószám</th>
                            <th>Város</th>
                            <th>Cím</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <OrderInfo
                                key={order.User_Id}
                                id={order.User_Id}
                                order_id={order.Order_Id}
                                order_status={order.Order_Status}
                                date={order.Date}
                                phoneNumber={order.PhoneNumber}
                                postalCode={order.Postal_Code}
                                city={order.City}
                                address={order.StreetHousenumber}
                                onDelete={onDelete()}
                            />
                        ))}

                    </tbody>
                </table>
            </div>

            <Footer/>

            {error && <div className="alert alert-danger text-center my-2">{error}</div>}
            {message && <div className="alert alert-success text-center my-2">{message}</div>}
        </>
    );
}