import { useState } from 'react'
import Footer from '../components/Footer'
import Gomb from '../components/Gomb'
import Header from '../components/Header'
import InputMezo from '../components/InputMezo'
import '../css/App.css'
import { regisztracio } from '../api'

function Regisztracio() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [psw, setPsw] = useState('')

    const [uzenet, setUzenet] = useState('')
    
    async function onReg() {
        setUzenet('')

        if (!email || !username || !psw) {
            return alert('Minden mezőt tölts ki!')
        }

        try {
            const data = await regisztracio(username, email, psw)
            if (data.error) {
                return alert(data.error)
            }
            setUzenet(data.message)
            
        } catch (err) {           
            return alert('Nem sikerült kapcsolódni a backendhez.')        
        }
    }
    return (
        <>
            <Header />
            <div className="container-log" style={{ maxWidth: 520, marginTop: 60 }}>
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

                <div className="text-center mt-3">
                    <a href="/fooldal">
                        <Gomb
                            szin='btn btn-dark px-4'
                            onClick={onReg}
                            text='Regisztráció'
                        />
                    </a>
                </div>

                <div className="text-center mt-3">
                    <a href="/fooldal">
                        <Gomb
                            szin='btn btn-ligth px-4'
                            onClick=''
                            text='Vissza a főoldalra'
                        />
                    </a>
                </div>

                <div className="text-center mt-3">
                    <a href="/bejelentkezes">
                        <Gomb
                            szin='btn btn-ligth px-4'
                            onClick=''
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