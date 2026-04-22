export default function UserInfo({ user_id, username, email, role, onModify, onDelete }) {
    const productObject = {
        User_Id: user_id,
        Username: username,
        Email: email,
        Role: role,
    }
    return (
        
        <tr>
            <td>{user_id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>

            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={onModify}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={onDelete}>Törlés</button>
             </td>
        </tr>
    )
}
