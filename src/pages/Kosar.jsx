import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";

export default function Kosar() {
    const sikeresVasarlas = () => alert("Sikeres vásárlás")

    return (
        <>
            <Header />
            <div className="kosar_egesz">
                <div className="jobb-kosar">
                    <h2 className="text-2xl font-bold mb-4">Kosár</h2>

                    <div className="space-y-4">
                        
                    </div>
                </div>

                <div className="bal-kosar">
                    <div className="mt-6 flex justify-between items-center border-t border-zinc-800 pt-4">
                        <h3 className="text-xl font-semibold">Összesen:</h3>
                        <p className="text-xl font-bold"> Ft</p>
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