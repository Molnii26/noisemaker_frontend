import "../css/App.css"
import NavBar from "./NavBar"

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout, whoAmI } from "../api";

function Header() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState(' ')


    useEffect(() => {
        async function load() {
            const data = await whoAmI()

            if (data.error) {
                return setErrorUser(data.error)
            }
            return setUser(data)
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setErrorUser(data.error)
        }

        setUser(null)
        navigate('/bejelentkezes')
    }
    return (
        <div className="header">
            <a className="cim" href='/fooldal' rel="noopener noreferrer">
                <h1 className="cim-text">NOISEMAKER</h1>
            </a>
            
            <div>
                <NavBar user={user} onLogout={onLogout} />
            </div>

        </div>
    )
}

export default Header 