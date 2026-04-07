const BACKEND_URL_USER = '/users'
const BACKEND_URL_PRODUCTS = '/products'
const BACKEND_URL_CATEGORIES = '/categories'

export async function regisztracio(username, email, psw){
    const res = await fetch(`${BACKEND_URL_USER}/register`, {
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
    const res = await fetch(`${BACKEND_URL_USER}/login`, {
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
    const res = await fetch(`${BACKEND_URL_USER}/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    //console.log(await res.json());
    return await res.json()
}

export async function logout() {
    const res = await fetch(`${BACKEND_URL_USER}/logout`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function termekek(product_id, product_name, product_description, product_price, product_img, category_id, subcategory_id, stock){
    const res = await fetch(`${BACKEND_URL_USER}/getProducts`, {
        method: 'GET',
         credentials: 'include',
        body: JSON.stringify({ product_id, product_name, product_description, product_price, product_img, category_id, subcategory_id, stock })
    })

    //console.log(res)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

export async function getProducts() {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/getAllProducts`)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

export async function getCategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getCategoryAll`)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

export async function getSubcategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getSubcategoryAll`)

    const data = await res.json()

    if (!data.error) {
        return data
    }
    return data
}

// összes felhasználó lekérése
export async function getAllUsers() {
    const res = await fetch(`${BACKEND_URL_USER}/getAllUsers`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error}
    }

    return await res.json()
}

// egy felhasználó adatainak módosítása
export async function userEdit(user_id, username, email, role) {
    const res = await fetch(`${BACKEND_URL_USER}/userModifyInAdmin/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, role }),
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function deleteUser(user_id) {
    const res = await fetch(`${BACKEND_URL_USER}/deleteUser/${user_id}`,{
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}