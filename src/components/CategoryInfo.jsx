export default function CategoryInfo({ category_id, categoryName, onModify, onDelete }) {
    const categoryObject = {
        Category_Id: category_id,
        CategoryName: categoryName
    }
    return (
        
        <tr>
            <td>{category_id}</td>
            <td>{categoryName}</td>

            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModify(categoryObject)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(categoryObject)}>Törlés</button>
             </td>
        </tr>
    )
}
