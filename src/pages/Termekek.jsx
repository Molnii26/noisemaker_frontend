import '../css/App.css'

import Header from "../components/Header";
import Footer from '../components/Footer';
import { useState } from 'react';

function Termekek() {
    const productsData = [
        { id: 1, name: "Yamaha F310", price: 55000, category: "húros", subcategory: "akusztikus" },
        { id: 2, name: "Fender Stratocaster", price: 320000, category: "húros", subcategory: "elektromos" },
        { id: 3, name: "Ibanez Bass", price: 180000, category: "húros", subcategory: "basszus" },
        { id: 4, name: "Roland FP-10", price: 210000, category: "billentyűs", subcategory: "digitális zongora" },
        { id: 5, name: "Pearl Roadshow", price: 180000, category: "ütős", subcategory: "dob" },
        { id: 6, name: "Yamaha YFL-222", price: 160000, category: "fúvós", subcategory: "fuvola" }
    ];

    const subcategories = {
        húros: ["akusztikus", "elektromos", "basszus"],
        billentyűs: ["digitális zongora", "szintetizátor"],
        ütős: ["dob"],
        fúvós: ["fuvola", "klarinét", "szaxofon"]
    };

    const [category, setCategory] = useState("összes");
    const [subcategory, setSubcategory] = useState("összes");
    const [sortType, setSortType] = useState("");


    const handleCategoryChange = (value) => {
        setCategory(value);
        setSubcategory("összes"); // reset alkategória
    };

    const filteredProducts = productsData
        .filter(product =>
            (category === "összes" || product.category === category) &&
            (subcategory === "összes" || product.subcategory === subcategory)
        )
        .sort((a, b) => {
            if (sortType === "price-asc") return a.price - b.price;
            if (sortType === "price-desc") return b.price - a.price;
            if (sortType === "name-asc") return a.name.localeCompare(b.name);
            if (sortType === "name-desc") return b.name.localeCompare(a.name);
            return 0;
        });


    return (
        <>
            <Header />
            <div className="container-termekek">
                <div className="filter">

                    <h3>Kategória</h3>
                    <select onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="összes">Összes</option>
                        <option value="húros">Húros</option>
                        <option value="billentyűs">Billentyűs</option>
                        <option value="ütős">Ütős</option>
                        <option value="fúvós">Fúvós</option>
                    </select>

                    {/* ALKATEGÓRIA CSAK HA VAN KATEGÓRIA */}
                    {category !== "összes" && (
                        <>
                            <h3>Alkategória</h3>
                            <select onChange={(e) => setSubcategory(e.target.value)}>
                                <option value="összes">Összes</option>
                                {subcategories[category].map((sub, index) => (
                                    <option key={index} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <h3>Rendezés</h3>
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="">Nincs</option>
                        <option value="price-asc">Ár növekvő</option>
                        <option value="price-desc">Ár csökkenő</option>
                        <option value="name-asc">ABC (A-Z)</option>
                        <option value="name-desc">ABC (Z-A)</option>
                    </select>

                </div>

                <div className="products-container">
                    <a href='/termek/:id'>
                        {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <h4>{product.name}</h4>
                            <p>{product.price.toLocaleString()} Ft</p>
                            <span>{product.category} - {product.subcategory}</span>
                        </div>
                    ))}
                    </a>
                    
                </div>


            </div>
            <Footer />
        </>

    )
}

export default Termekek