const BACKEND_URL_USER = '/users'
const BACKEND_URL_PRODUCTS = '/products'
const BACKEND_URL_CATEGORIES = '/categories'
const BACKEND_URL_CART = '/cart'

export async function regisztracio(username, email, psw) {
    const res = await fetch(`${BACKEND_URL_USER}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, psw })
    })
    return await res.json()
}

export async function bejelentkezes(email, psw) {
    const res = await fetch(`${BACKEND_URL_USER}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ psw, email })
    })
    return await res.json()
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

export async function getProducts() {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/getAllProducts`)
    return await res.json()
}

export async function getCategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getCategoryAll`)
    return await res.json()
}

export async function getSubcategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getSubcategoryAll`)
    return await res.json()
}

export async function getAllUsers() {
    const res = await fetch(`${BACKEND_URL_USER}/getAllUsers`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function userEdit(User_Id, username, email, User_Role) {
    const res = await fetch(`${BACKEND_URL_USER}/userModifyInAdmin/${User_Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, User_Role }),
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function deleteUser(User_Id) {
    const res = await fetch(`${BACKEND_URL_USER}/deleteUser/${User_Id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function getAllOrders() {
    const res = await fetch(`/orders/getAllOrders`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function editOrderStatus(Order_Id, Order_Status) {
    const res = await fetch(`/orders/editOrderStatus/${Order_Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Order_Status }),
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function deleteOrder(Order_Id) {
    const res = await fetch(`/orders/deleteOrder/${Order_Id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function addProduct(productData) {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/addProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function editProduct(Product_Id, productData) {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/editProduct/${Product_Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function deleteProduct(Product_Id) {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/deleteProduct/${Product_Id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function getCart() {
    const res = await fetch(`${BACKEND_URL_CART}/getCart`, {
        method: 'GET',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function modifyCartItem(Cart_Item_Id, quantity) {
    const res = await fetch(`${BACKEND_URL_CART}/modifyCartItem/${Cart_Item_Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function deleteCartItem(Cart_Item_Id) {
    const res = await fetch(`${BACKEND_URL_CART}/deleteCartItem/${Cart_Item_Id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function deleteCart(Cart_Id) {
    const res = await fetch(`${BACKEND_URL_CART}/deleteCart/${Cart_Id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}