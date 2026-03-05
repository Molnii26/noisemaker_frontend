function InputMezo({ label, type, value, placeholder, setValue }){
    return (
        <>
            <div className="input-mezo">
                <label className="mb-5">{label}</label>
                <input
                    className="form-control"
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