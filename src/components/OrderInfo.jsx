export default function OrderInfo({ order_id, user_id, order_status, date, phoneNumber, postalCode, city, address, onModify, onDelete }) {
    const productObject = {
        Order_Id: order_id,
        User_Id: user_id,
        Order_Status: order_status,
        Date: date,
        PhoneNumber: phoneNumber,
        Postal_Code: postalCode,
        City: city,
        StreetHousenumber: address
    }
    return (
        <tr>
            <td>{order_id}</td>
            <td>{user_id}</td>
            <td>{order_status}</td>
            <td>{date}</td>
            <td>{phoneNumber}</td>
            <td>{postalCode}</td>
            <td>{city}</td>
            <td>{address}</td>
            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModify(productObject)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(productObject)}>Törlés</button>
             </td>
        </tr>
    )
}
