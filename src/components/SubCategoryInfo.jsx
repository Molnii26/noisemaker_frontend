export default function SubCategoryInfo({ subCategory_id, category_id, SubCategoryName, onModifySub, onDeleteSub }) {
    const subcategoryObject = {
        Subcategory_Id: subCategory_id,
        Category_Id: category_id,
        Subcategory_Name: SubCategoryName
    }
    return (

        <tr>
            <td>{subCategory_id}</td>
            <td>{category_id}</td>
            <td>{SubCategoryName}</td>

            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModifySub(subcategoryObject)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDeleteSub(subcategoryObject)}>Törlés</button>
            </td>
        </tr>
    )
}
