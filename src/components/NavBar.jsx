import { Link } from 'react-router-dom'

import Gomb from './Gomb'

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user
    //console.log(isLoggedIn);

    const isAdmin = user?.role === 'admin'

    return (
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between py-3">

                <div className="d-flex align-items-center gap-3">

                    {isLoggedIn ? (
                        <>
                            <Link to='/profile' className='px-3 py-1 text-decoration-none rounded text-dark fs-4' style={{ background: 'lightgray' }}>
                                Fiókom
                            </Link>

                            {/* Admin oldal */}
                            {isAdmin && <Link to='/admin' className='px-3 py-1 text-decoration-none rounded text-dark fs-4' style={{ background: 'lightgray' }}>
                                Admin panel
                            </Link>}

                            {/* Logout */}
                            <Link szin='btn btn-dark px-4' onClick={onLogout} text='Kijelentkezés' />
                        </>
                    ) : (
                        <>
                            <Link to='/bejelentkezes' className='btn btn-dark px-4'>Bejelentkezés</Link>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}