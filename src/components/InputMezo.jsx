function InputMezo({ label, type, value, placeholder, setValue }){
    return (
        <>
            <div className="input-mezo">
                <label>{label}</label>
                <input
                    className="form-control mt-2"
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </>
    )
}

export default InputMezo