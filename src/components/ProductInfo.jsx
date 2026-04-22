export default function ProductInfo({ product_id, product_name, description, product_price, stock, onModify, onDelete }) {
    
    const productObject = {
        Product_Id: product_id,
        Product_Name: product_name,
        ProductDescription: description,
        ProductPrice: product_price,
        Stock: stock
    }

    return (
        <tr>
            <td>{product_id}</td>
            <td>{product_name}</td>
            <td>{description}</td>
            <td>{product_price}</td>
            <td>{stock}</td>
            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModify(productObject)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(productObject)}>Törlés</button>
            </td>
        </tr>
    )
}