const BACKEND_URL = '/users'

export async function regisztracio(username, email, psw){
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, psw })
    })

    //console.log(res)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

export async function bejelentkezes(email, psw){
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
         credentials: 'include',
        body: JSON.stringify({ psw, email })
    })

    //console.log(res)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

export async function whoAmI() {
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}