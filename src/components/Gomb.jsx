export default function Gomb({ onClick, text }){
    return (
        <>
            <button className="gombok" onClick={onClick}>
            {text}
        </button>
        </>
    )
}