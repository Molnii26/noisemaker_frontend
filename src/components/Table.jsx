import UserInfo from "./UserInfo";

export default function Table({ users, onModify, onDelete }) {
    return (
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
                    {users?.map(user => (
                        <UserInfo
                            key={user.User_Id}
                            user_id={user.User_Id}
                            username={user.Username}
                            email={user.Email}
                            onModify={onModify(user)}
                            onDelete={onDelete(user)}
                        />
                    ))}

                </tbody>
            </table>

            {/* <h2>Rendelések</h2>
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
            </table> */}
        </div>
    )
}