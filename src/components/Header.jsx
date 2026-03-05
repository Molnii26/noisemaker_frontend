import "../css/App.css"
import NavBar from "./NavBar"

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { whoAmI } from "../api";

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
        navigate('/')
    }
    return (
        <div className="header">
            <a className="cim" href='/fooldal' rel="noopener noreferrer">
                <h1 className="cim-text">NOISEMAKER</h1>
            </a>
            <div className="kereses">
                <div class="topnav">
                    <input type="text" placeholder="Keresés..." />

                </div>

            </div>
            {/* <a className="register" href='/regisztracio' rel="noopener noreferrer">
                <img className="reg" src="../images/reg.svg" alt="Reg" />
            </a>
            <a className="cart-link" href='/kosar' rel="noopener noreferrer">
                <img className="cart" src="../images/cart-white.svg" alt="Cart Icon" />
            </a> */}
            <div>
                <NavBar user={user} onLogout={onLogout} />
                {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}
            </div>

        </div>
    )
}

export default Header