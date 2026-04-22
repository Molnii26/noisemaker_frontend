import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Kosar() {
    const [kosarItems, setKosarItems] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('kosar') || '[]');
        setKosarItems(data);
    }, []);

    const osszesAr = kosarItems.reduce(
        (sum, item) => sum + item.ProductPrice * item.quantity, 0
    );

    console.log(osszesAr);

    const removeItem = (id) => {
        const updated = kosarItems.filter(item => item.Product_Id !== id);
        setKosarItems(updated);
        localStorage.setItem('kosar', JSON.stringify(updated));
    };

    const sikeresVasarlas = () => {
        if (kosarItems.length === 0) {
            alert("A kosár üres");
            return;
        }
        alert("Sikeres vásárlás");
        localStorage.removeItem('kosar');
        setKosarItems([]);
    };

    return (
        <>
            <Header />
            <div className="kosar_egesz">
                <div className="jobb-kosar">
                    <h2 className="text-2xl font-bold mb-4">Kosár</h2>
                    <div className="space-y-4">
                        {kosarItems.length === 0 ? (
                            <p>A kosár üres.</p>
                        ) : (
                            kosarItems.map(item => (
                                <div key={item.Product_Id} className="kosar-item">
                                    <img
                                        src={item.ProductIMG}
                                        alt={item.Product_Name}
                                        className="kosar-item-kep"
                                    />
                                    <div className="kosar-item-info">
                                        <p className="font-semibold">{item.Product_Name}</p>
                                        <p>{item.ProductPrice} Ft × {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.Product_Id)}
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
                        <p className="text-xl font-bold">{osszesAr} Ft</p>
                    </div>
                    <button onClick={sikeresVasarlas} className="fizetes-gomb">
                        Fizetés
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}