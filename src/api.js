const BACKEND_URL_USER = '/users'
const BACKEND_URL_PRODUCTS = '/products'
const BACKEND_URL_CATEGORIES = '/categories'
const BACKEND_URL_ORDERS = '/orders'
const BACKEND_URL_CART = '/cart'

// ─── Token kezelés ────────────────────────────────────────────
const getToken = () => localStorage.getItem('token')
const setToken = (token) => localStorage.setItem('token', token)
const removeToken = () => localStorage.removeItem('token')

// ─── Alap fetch helper ────────────────────────────────────────
async function authFetch(url, options = {}) {
    const token = getToken()
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    })
    return res
}

// ─── AUTH ─────────────────────────────────────────────────────
export async function regisztracio(username, email, psw) {
    const res = await authFetch(`${BACKEND_URL_USER}/register`, {
        method: 'POST',
        body: JSON.stringify({ username, email, psw })
    })
    return await res.json()
}

export async function bejelentkezes(email, psw) {
    const res = await authFetch(`${BACKEND_URL_USER}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, psw })
    })
    const data = await res.json()
    if (data.token) setToken(data.token)
    return data
}

export async function whoAmI() {
    const res = await authFetch(`${BACKEND_URL_USER}/whoami`)
    if (!res.ok) return { error: 'Nincs bejelentkezve' }
    return await res.json()
}

export async function logout() {
    removeToken()
    return { success: true }
}

// ─── USERS ────────────────────────────────────────────────────
export async function getAllUsers() {
    const res = await authFetch(`${BACKEND_URL_USER}/getAllUsers`)
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function userEdit(User_Id, username, email, User_Role) {
    const res = await authFetch(`${BACKEND_URL_USER}/userModifyInAdmin/${User_Id}`, {
        method: 'PUT',
        body: JSON.stringify({ username, email, User_Role })
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function deleteUser(User_Id) {
    const res = await authFetch(`${BACKEND_URL_USER}/deleteUser/${User_Id}`, {
        method: 'DELETE'
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

// ─── PRODUCTS ─────────────────────────────────────────────────
export async function getProducts() {
    const res = await fetch(`${BACKEND_URL_PRODUCTS}/getAllProducts`)
    return await res.json()
}

export async function addProduct(productData) {
    const res = await authFetch(`${BACKEND_URL_PRODUCTS}/addProduct`, {
        method: 'POST',
        body: JSON.stringify(productData)
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function editProduct(Product_Id, productData) {
    const res = await authFetch(`${BACKEND_URL_PRODUCTS}/modifyProduct/${Product_Id}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function deleteProduct(Product_Id) {
    const res = await authFetch(`${BACKEND_URL_PRODUCTS}/deleteProduct/${Product_Id}`, {
        method: 'DELETE'
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

// ─── CATEGORIES ───────────────────────────────────────────────
export async function getCategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getCategoryAll`)
    return await res.json()
}

export async function getSubcategoryAll() {
    const res = await fetch(`${BACKEND_URL_CATEGORIES}/getSubcategoryAll`)
    return await res.json()
}

// ─── ORDERS ───────────────────────────────────────────────────
export async function getAllOrders() {
    const res = await authFetch(`${BACKEND_URL_ORDERS}/allOrders`)
    if (!res.ok) return { error: (await res.json())?.error }
    const data = await res.json()
    return Array.isArray(data) ? data : data.orders ?? []
}

export async function createOrder(orderData) {
    const res = await authFetch(`${BACKEND_URL_ORDERS}/createOrder`, {
        method: 'POST',
        body: JSON.stringify(orderData)
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function editOrderStatus(Order_Id, Order_Status) {
    const res = await authFetch(`${BACKEND_URL_ORDERS}/orderStatusModify/${Order_Id}`, {
        method: 'PUT',
        body: JSON.stringify({ Order_Status })
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

export async function deleteOrder(Order_Id) {
    const res = await authFetch(`${BACKEND_URL_ORDERS}/deleteOrder/${Order_Id}`, {
        method: 'DELETE'
    })
    if (!res.ok) return { error: (await res.json())?.error }
    return await res.json()
}

// ─── CART ─────────────────────────────────────────────────────
export async function getCart() {
    const res = await authFetch(`${BACKEND_URL_CART}/CartItems`)
    if (res.status === 400 || !res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
}

export async function addToCart(Product_Id, Quantity) {
    const res = await authFetch(`${BACKEND_URL_CART}/addCart`, {
        method: 'POST',
        body: JSON.stringify({ Product_Id, Quantity })
    })
    return await res.json()
}

export async function modifyCartItem(Cart_Item_Id, Quantity) {
    const res = await authFetch(`${BACKEND_URL_CART}/modifyCartItem/${Cart_Item_Id}`, {
        method: 'PUT',
        body: JSON.stringify({ Quantity })
    })
    return await res.json()
}

export async function deleteCartItem(Cart_Item_Id) {
    const res = await authFetch(`${BACKEND_URL_CART}/deleteCartItem/${Cart_Item_Id}`, {
        method: 'DELETE'
    })
    return await res.json()
}

export async function deleteCart(Cart_Id) {
    const res = await authFetch(`${BACKEND_URL_CART}/deleteCart/${Cart_Id}`, {
        method: 'DELETE'
    })
    return await res.json()
}