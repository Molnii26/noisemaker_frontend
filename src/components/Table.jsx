import Gomb from "./Gomb";
import OrderInfo from "./OrderInfo";
import ProductInfo from "./ProductInfo";
import UserInfo from "./UserInfo";

export default function Table({ users, orders, products, onModify, onModifyOrder, onModifyProduct, onDelete }) {
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
                            onModify={() => onModify(user)}
                            onDelete={() => onDelete(user)}
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
                    {orders?.map(order => (
                        <OrderInfo
                            key={order.Order_Id}
                            user_id={order.User_Id}
                            order_id={order.Order_Id}
                            order_status={order.Order_Status}
                            date={order.Date}
                            phoneNumber={order.PhoneNumber}
                            postalCode={order.Postal_Code}
                            city={order.City}
                            address={order.StreetHousenumber}
                            onModify={() => onModifyOrder(order)}
                            onDelete={() => onDelete(order)}
                        />
                    ))}
                </tbody>
            </table>

            <h2>Termékek</h2>
            <table className="table-admin">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Név</th>
                        <th>Leírás</th>
                        <th>Ár</th>
                        <th>Készlet</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => (
                        <ProductInfo
                            key={product.Product_Id}
                            product_id={product.Product_Id}
                            product_name={product.Product_Name}
                            description={product.ProductDescription}
                            product_price={product.ProductPrice}
                            stock={product.Stock}
                            onModify={() => onModifyProduct(product)}
                            onDelete={() => onDelete(product)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}