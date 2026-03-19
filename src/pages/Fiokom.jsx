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
                <p className='text-light'>{user.Username}</p>
                <p className='text-light'>{user.Email}</p>
                <p className='text-light'>{user.User_Id}</p>
                <p className='text-light'>{user.User_Role}</p>
            </div>

            <Footer />
        </>

    )
}

export default Fiokom