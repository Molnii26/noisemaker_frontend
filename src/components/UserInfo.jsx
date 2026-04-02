export default function UserInfo({ user_id, username, email, role, onModify, onDelete }) {
    return (
        <tr>
            <td>{user_id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>

            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={onModify}>Szerkesztés</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(user_id)}>Törlés</button>
             </td>
        </tr>
    )
}
