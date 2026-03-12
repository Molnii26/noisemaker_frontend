import '../css/App.css'
import profilePic from "../../images/profile.png"
import { useState } from 'react'

import Header from "../components/Header";
import Footer from '../components/Footer';
import UserName from '../components/UserName';

function Fiokom() {
    const [username, setUsername] = useState('')
    return (
        <>
            <Header />

            <div className="fiokom">
                <img src={profilePic}/>
                <UserName 
                    type="text"
                    value={username}
                    setValue={setUsername}
                />
            </div>

            <Footer />
        </>

    )
}

export default Fiokom