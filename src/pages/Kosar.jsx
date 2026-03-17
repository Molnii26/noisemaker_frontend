// import '../css/App.css'

// import Header from "../components/Header";
// import Footer from '../components/Footer';

// function Kosar(){
//     return(
//         <>
//             <Header/>

//             <Footer/>
//         </>

//     )
// }

// export default Kosar

import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const initialItems = [
    { id: "Product_Id", name: "Product_Name", price: "ProductPrice", stock: "Stock", quantity: 0 },
];

export default function Kosar() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((item) => ({
                    id: item.Product_Id,
                    name: item.Product_Name,
                    price: Number(item.ProductPrice),
                    stock: item.Stock,
                    quantity: 1
                }));

                setItems(formatted);
            })
            .catch((err) => console.error(err));
    }, []);

    const updateQuantity = (id, amount) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + amount;
    
                    if (newQty < 1) return item;
                    if (newQty > item.stock) return item;
    
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Header />
            <div className="kosar_egesz">
                <div className="jobb-kosar">
                    <h2 className="text-2xl font-bold mb-4">Kosár</h2>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow p-4 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-zinc-400">${item.price}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        className="border px-2 rounded"
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="border px-2 rounded"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="font-semibold">
                                        ${item.price * item.quantity}
                                    </p>
                                    <button onClick={() => removeItem(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bal-kosar">
                    <div className="mt-6 flex justify-between items-center border-t border-zinc-800 pt-4">
                        <h3 className="text-xl font-semibold">Összesen:</h3>
                        <p className="text-xl font-bold">${total}</p>
                    </div>

                    <button className="w-full mt-4 bg-yellow-500 text-black hover:bg-yellow-400 py-2 rounded-xl">
                        Fizetés
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}