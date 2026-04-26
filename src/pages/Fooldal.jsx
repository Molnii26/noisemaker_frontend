import '../css/App.css'

import Header from "../components/Header";
import Body from '../components/Body';
import Video from "../../video/background_video.mp4"
import Footer from '../components/Footer';
import { useState, useEffect } from 'react'
import { whoAmI } from '../api';


function Fooldal() {
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

    return (
        <>
            <Header />
            <div className='udvozlo' id='fadeInUp-animation'>
                <h1 className='fooldalText'>Üdvözlünk {user.Username} a <br />  NoiseMaker <br /> oldalán!</h1>

            </div>

            <Body />
            <video id="background-video" autoPlay loop muted>
                <source src={Video} type="video/mp4" />
            </video>
            <Footer />
        </>

    )
}

export default Fooldal