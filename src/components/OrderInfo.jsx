export default function OrderInfo({ order_id, user_id, order_status, date, phoneNumber, postalCode, city, address, onModify, onDelete }) {
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
                <button className="btn btn-sm btn-primary me-2" onClick={onModify}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Törlés</button>
             </td>
        </tr>
    )
}
