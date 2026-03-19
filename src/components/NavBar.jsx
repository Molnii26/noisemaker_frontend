import { Link, Navigate, useNavigate } from 'react-router-dom'

import Gomb from './Gomb'

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user
    //console.log(isLoggedIn);
    //console.log(user);
    const isAdmin = user?.User_Role === 'Admin'
    //console.log(isAdmin);

    const navigate = useNavigate()
    const navToKosar = () => navigate('/kosar')
    const navToAdmin = () => navigate('/adminpanel')
    const navToFiokom = () => navigate('/fiokom')
    const navToBejelentkezes = () => navigate('/bejelentkezes')

    return (
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between py-3">

                <div className="d-flex align-items-center gap-3">

                    {isLoggedIn ? (
                        <>
                            <Gomb onClick={navToFiokom} className='px-3 py-1 text-decoration-none rounded text-dark fs-4' text="Fiókom">
                            </Gomb>

                            <Gomb onClick={navToKosar} className='px-3 py-1 text-decoration-none rounded text-dark fs-4' text="Kosár">
                            </Gomb>

                            {isAdmin && <Gomb onClick={navToAdmin} className='px-3 py-1 text-decoration-none rounded text-dark fs-4' text="Admin panel">
                            </Gomb>}

                            <Gomb className='px-3 py-1 text-decoration-none rounded text-dark fs-4' onClick={onLogout} text='Kijelentkezés' />
                        </>
                    ) : (
                        <>
                            <Gomb onClick={navToBejelentkezes} className='px-3 py-1 text-decoration-none rounded text-dark fs-4' text="Bejelentkezés"></Gomb>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}