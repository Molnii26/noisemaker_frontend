import { Link } from 'react-router-dom'

import Gomb from './Gomb'

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user
    //console.log(isLoggedIn);

    const isAdmin = user?.role === 'Admin'

    return (
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between py-3">

                <div className="d-flex align-items-center gap-3">

                    {isLoggedIn ? (
                        <>
                            <Link to='/fiokom' className='px-3 py-1 text-decoration-none rounded text-dark fs-4' style={{ background: 'lightgray' }}>
                                Fiókom
                            </Link>

                            {isAdmin && <Link to='/adminpanel' className='px-3 py-1 text-decoration-none rounded text-dark fs-4' style={{ background: 'lightgray' }}>
                                Admin panel
                            </Link>}

                            <Gomb className='px-3 py-1 text-decoration-none rounded text-dark fs-4' onClick={onLogout} text='Kijelentkezés' />
                        </>
                    ) : (
                        <>
                            <Link to='/bejelentkezes' className='px-3 py-1 text-decoration-none rounded text-dark fs-4' style={{ background: 'lightgray' }}>Bejelentkezés</Link>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}