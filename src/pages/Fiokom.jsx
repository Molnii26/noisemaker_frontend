import '../css/App.css'
import profilePic from "../../images/profile.png"
import { useState, useEffect } from 'react'

import Header from "../components/Header";
import Footer from '../components/Footer';

import { whoAmI } from '../api';

function Fiokom() {
    
    const [user, setUser] = useState('')

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

    //console.log(user);
    return (
        <>
            <Header />

            <div className="fiokom">
                <img src={profilePic}/>
                <h1 className='fiokom-cim'>Felhasználónév</h1>
                <p className='text-light'>{user.Username}</p>

                <h1 className='fiokom-cim'>Email</h1>
                <p className='text-light'>{user.Email}</p>

                <h1 className='fiokom-cim'>Szerepe</h1>
                <p className='text-light'>{user.User_Role}</p>
            </div>

            <Footer />
        </>

    )
}

export default Fiokom