function UserName({ value, type, setValue }){
    return (
        <>
            <div className="userName-Text">
                <h2
                    className="userName-Box"
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </>
    )
}

export default UserName