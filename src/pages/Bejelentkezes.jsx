import { bejelentkezes } from "../api";
import Gomb from "../components/Gomb";
import InputMezo from "../components/InputMezo";
import '../css/App.css'


import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bejelentkezes() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')

    const [uzenet, setUzenet] = useState('')

    async function onLogin() {
        setUzenet('')

        if (!email || !psw) {
            return alert('Minden mezőt tölts ki!')
        }
        try {
            const data = await bejelentkezes(email, psw)
            if (data.error) {
                return alert(data.error)
            }
            setUzenet(data.message)
            setTimeout(() => navigate('/'), 2000)

        } catch (err) {
            
            return alert('Nem sikerült kapcsolódni a backendhez.')
        }
    }

    return (
        <>
            <Header />
            <div className="container-log" style={{ maxWidth: 520, marginTop: 60 }}>
                <h1 className="text-center">Bejelentkezés</h1>

                {uzenet && <div className="siker">{uzenet}</div>}

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
                    <Gomb text='Belépés' onClick={onLogin} />
                </div>

                <div className="text-center mt-3">
                    <a href="/fooldal">
                        <Gomb
                            onClick=''
                            text='Vissza a főoldalra'
                        />
                    </a>
                </div>

                <div className="text-center mt-3">
                    <a href="/regisztracio">
                        <Gomb
                            onClick=''
                            text='Még nincs fiókom'
                        />
                    </a>
                </div>
            </div>
            <Footer />
        </>

    )
}