export default function UserInfo({ user_id, username, email, role, onModify, onDelete }) {
    const userObject = {
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
                <button className="btn btn-sm btn-primary me-2" onClick={() => onModify(userObject)}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(userObject)}>Törlés</button>
             </td>
        </tr>
    )
}
