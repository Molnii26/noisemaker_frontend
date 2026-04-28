import React, { useState, useEffect, navigate } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Kosar() {
    const [kosarItems, setKosarItems] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(kosarItems);
    useEffect(() => {
        fetchKosar();
    }, []);

    async function fetchKosar() {
        try {
            const res = await fetch('http://localhost:3000/cart/CartItems', {
                credentials: "include"
            });
            if (res.status === 400) {
                setKosarItems([]);
                return;
            }
            const data = await res.json();
            if (data.error) {
                setKosarItems([]);
                return;
            }
            setKosarItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function removeItem(Cart_Item_Id) {
        const res = await fetch(`http://localhost:3000/cart/deleteCartItem/${Cart_Item_Id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            setKosarItems(prev => prev.filter(item => item.Cart_Item_Id !== Cart_Item_Id));
        }
    }

    async function modifyQuantity(Cart_Item_Id, newQuantity) {
        if (newQuantity <= 0) {
            await removeItem(Cart_Item_Id);
            return;
        }
        const res = await fetch(`http://localhost:3000/cart/modifyCartItem/${Cart_Item_Id}`, {
            method: 'PUT',
            body: JSON.stringify({ Quantity: newQuantity })
        });
        if (res.ok) {
            setKosarItems(prev =>
                prev.map(item =>
                    item.Cart_Item_Id === Cart_Item_Id
                        ? { ...item, Quantity: newQuantity }
                        : item
                )
            );
        }
    }

    async function sikeresVasarlas() {
        if (kosarItems.length === 0) {
            alert("A kosár üres");
            return;
        }

        const Cart_Id = kosarItems[0]?.Cart_Id;
        if (!Cart_Id) return;

        const res = await fetch(`http://localhost:3000/cart/deleteCart/${Cart_Id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert("Sikeres vásárlás!");
            setKosarItems([]);
        } else {
            alert("Hiba történt a vásárlásnál.");
        }
    }

    const osszesAr = kosarItems.reduce(
        (sum, item) => sum + Number(item.ProductPrice) * Number(item.Quantity), 0
    );

    return (
        <>
            <Header />
            <div className="kosar_egesz">
                <div className="jobb-kosar">
                    <h2 className="text-2xl font-bold mb-4">Kosár</h2>
                    <div className="space-y-4">
                        {loading ? (
                            <p>Betöltés...</p>
                        ) : kosarItems.length === 0 ? (
                            <p>A kosár üres.</p>
                        ) : (
                            kosarItems.map(item => (
                                <div key={item.Cart_Item_Id} className="kosar-item">
                                    <img
                                        src={item.ProductIMG}
                                        alt={item.Product_Name}
                                        className="kosar-item-kep"
                                    />
                                    <div className="kosar-item-info">
                                        <p className="font-semibold">{item.Product_Name}</p>
                                        <p>{Number(item.ProductPrice).toLocaleString()} Ft</p>
                                        <div className="kosar-quantity">
                                            <button onClick={() => modifyQuantity(item.Cart_Item_Id, item.Quantity - 1)}>−</button>
                                            <span>{item.Quantity}</span>
                                            <button onClick={() => modifyQuantity(item.Cart_Item_Id, item.Quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.Cart_Item_Id)}
                                        className="kosar-remove-gomb"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="bal-kosar">
                    <div className="mt-6 flex justify-between items-center border-t border-zinc-800 pt-4">
                        <h3 className="text-xl font-semibold">Összesen:</h3>
                        <p className="text-xl font-bold">{osszesAr.toLocaleString()} Ft</p>
                    </div>
                    <a href="/rendelesek">
                        <button className="fizetes-gomb">
                            Rendelés folytatása
                        </button>
                    </a>

                </div>
            </div>
            <Footer />
        </>
    );
}