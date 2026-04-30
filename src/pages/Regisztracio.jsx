import { useState } from 'react'
import Footer from '../components/Footer'
import Gomb from '../components/Gomb'
import Header from '../components/Header'
import InputMezo from '../components/InputMezo'
import {useNavigate } from 'react-router-dom'
import '../css/App.css'
import { regisztracio } from '../api'

function Regisztracio() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [psw, setPsw] = useState('')
    const [psw2, setPsw2] = useState('')

    const [uzenet, setUzenet] = useState('')
    const navigate = useNavigate();

    async function onReg() {
        setUzenet('')

        if (!email || !username || !psw || !psw2) {
            return alert('Minden mezőt tölts ki!')
        }
        if (psw !== psw2) {
            return alert('A jelszavak nem egyeznek meg!')
        }
        try {
            const data = await regisztracio(username, email, psw)
            if (data.error) {
                return alert(data.error)
            }
            setUzenet(data.message)
            setTimeout(() => navigate('/bejelentkezes'), 500)

        } catch (err) {
            return alert('Nem sikerült kapcsolódni a backendhez.')
        }
    }
    return (
        <>
            <Header />
            <div className="container-reg" style={{ maxWidth: 620, marginTop: 60 }}>
                <h1 className="text-center">Regisztráció</h1>

                {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>}

                <InputMezo
                    label="Felhasználónév"
                    type="text"
                    value={username}
                    setValue={setUsername}
                    placeholder="John Doe"
                />


                <InputMezo
                    label="Email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    placeholder="valami@valami.hu"
                />

                <InputMezo
                    label="Jelszó"
                    type="password"
                    value={psw}
                    setValue={setPsw}
                    placeholder="*******"
                />

                <InputMezo
                    label="Jelszó megerősítése"
                    type="password"
                    value={psw2}
                    setValue={setPsw2}
                    placeholder="*******"
                />

                <div className="text-center mt-3">
                    
                        <Gomb
                            szin='btn btn-dark px-4'
                            onClick={onReg}
                            text='Regisztráció'
                        />
                   
                </div>

                <div className="text-center mt-3">
                    
                        <Gomb
                            szin='btn btn-ligth px-4'
                             onClick={() => navigate('/fooldal')}
                            text='Vissza a főoldalra'
                        />
                    
                </div>

                <div className="text-center mt-3">
                    <a href="/bejelentkezes">
                        <Gomb
                            szin='btn btn-ligth px-4'
                            onClick={() => navigate('/fooldal')}
                            text='Már van fiókom'
                        />
                    </a>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Regisztracio