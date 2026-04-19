export default function ProductInfo({ product_id, product_name, description, product_price, stock, onModify, onDelete }) {
    return (
        <tr>
            <td>{product_id}</td>
            <td>{product_name}</td>
            <td>{description}</td>
            <td>{product_price}</td>
            <td>{stock}</td>

            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModifyProduct(product_id)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(product_id)}>Törlés</button>
            </td>
        </tr>
    )
}