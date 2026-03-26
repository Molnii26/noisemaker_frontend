// import '../css/App.css'
// import Header from "../components/Header";
// import Footer from '../components/Footer';
// import { useState, useEffect } from 'react';

// function Termekek() {

//     const subcategories = {
//         húros: ["akusztikus", "elektromos", "basszus"],
//         billentyűs: ["digitális zongora", "szintetizátor"],
//         ütős: ["dob"],
//         fúvós: ["fuvola", "klarinét", "szaxofon"]
//     };

//     const subcategoryMap = {
//         akusztikus: 1,
//         elektromos: 2,
//         basszus: 3,
//         "digitális zongora": 4,
//         szintetizátor: 5,
//         dob: 6,
//         fuvola: 7,
//         klarinét: 8,
//         szaxofon: 9
//     };

//     const [category, setCategory] = useState("összes");
//     const [subcategory, setSubcategory] = useState("összes");
//     const [sortType, setSortType] = useState("");
//     const [productsData, setProductsData] = useState([]);

//     useEffect(() => {
//         fetch("http://127.0.0.1:3000/getAllProducts")
//             .then(res => res.json())
//             .then(data => {
//                 console.log("API válasz:", data);
//                 setProductsData(data);
//             })
//             .catch(err => console.error(err));
//     }, []);

//     const handleCategoryChange = (value) => {
//         setCategory(value);
//         setSubcategory("összes");
//     };

//     const filteredProducts = productsData.filter(product =>
//             (category === "összes" || product.category === Category_Id) &&
//             (subcategory === "összes" || product.Subcategory_Id == subcategoryMap[subcategory])
//         )
//         .sort((a, b) => {
//             if (sortType === "price-asc") return a.ProductPrice - b.ProductPrice;
//             if (sortType === "price-desc") return b.ProductPrice - a.ProductPrice;
//             if (sortType === "name-asc") return a.Product_Name.localeCompare(b.Product_Name);
//             if (sortType === "name-desc") return b.Product_Name.localeCompare(a.Product_Name);
//             return 0;
//         });

//     return (
//         <>
//             <Header />

//             <div className="container-termekek">
//                 <div className="filter">

//                     <h3>Kategória</h3>
//                     <select onChange={(e) => handleCategoryChange(e.target.value)}>
//                         <option value="összes">Összes</option>
//                         <option value="húros">Húros</option>
//                         <option value="billentyűs">Billentyűs</option>
//                         <option value="ütős">Ütős</option>
//                         <option value="fúvós">Fúvós</option>
//                     </select>

//                     {category !== "összes" && (
//                         <>
//                             <h3>Alkategória</h3>
//                             <select onChange={(e) => setSubcategory(e.target.value)}>
//                                 <option value="összes">Összes</option>
//                                 {subcategories[category].map((sub, index) => (
//                                     <option key={index} value={sub}>
//                                         {sub}
//                                     </option>
//                                 ))}
//                             </select>
//                         </>
//                     )}

//                     <h3>Rendezés</h3>
//                     <select onChange={(e) => setSortType(e.target.value)}>
//                         <option value="">Nincs</option>
//                         <option value="price-asc">Ár növekvő</option>
//                         <option value="price-desc">Ár csökkenő</option>
//                         <option value="name-asc">ABC (A-Z)</option>
//                         <option value="name-desc">ABC (Z-A)</option>
//                     </select>

//                 </div>

//                 <div className="products-container">
//                     {filteredProducts.map(product => (
//                         <a
//                             href={`/getProduct/${product.Product_Id}`}
//                             key={product.Product_Id}
//                             className="product-card"
//                         >
//                             <h4>{product.Product_Name}</h4>

//                             {/* <img
//                                 className="product-img"
//                                 src={product.ProductIMG}
//                                 alt={product.Product_Name}
//                             /> */}

//                             <p>{product.ProductPrice.toLocaleString()} Ft</p>

//                             <span>
//                                 {product.Category_Id} - {product.Subcategory_Id}
//                             </span>
//                         </a>
//                     ))}
//                 </div>
//             </div>

//             <Footer />
//         </>
//     )

// }

// export default Termekek;

import '../css/App.css'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { getProducts } from '../api';

function Termekek() {

    const [category, setCategory] = useState("összes");
    const [subcategory, setSubcategory] = useState("összes");
    const [sortType, setSortType] = useState("");
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);       
    const [subcategoriesData, setSubcategoriesData] = useState([]); 

    useEffect(() => {
        // Termékek
        (async()=>{
            const data = await getProducts();
            if(data.result){
                setProductsData(data.result)
            }
        })();

        // Kategóriák - JAVÍTOTT URL
        /*
        fetch("http://127.0.0.1:3000/categories/getCategoryAll")
            .then(res => res.json())
            .then(data => setCategoriesData(data))
            .catch(err => console.error(err));

        // Alkategóriák - JAVÍTOTT URL
        fetch("http://127.0.0.1:3000/categories/getSubcategoryAll")
            .then(res => res.json())
            .then(data => setSubcategoriesData(data))
            .catch(err => console.error(err));
            */
    }, []);

    const handleCategoryChange = (value) => {
        setCategory(value);
        setSubcategory("összes"); // reset alkategória
    };

    // Csak az aktuális főkategóriához tartozó alkategóriák
    const filteredSubcategories = subcategoriesData.filter(
        sub => category === "összes" || sub.CategoryId == category
    );
    console.log(productsData)
    const filteredProducts = productsData.filter(product =>
            (category === "összes" || product.CategoryId == category) &&
            (subcategory === "összes" || product.SubcategoryId == subcategory)
        )
        .sort((a, b) => {
            if (sortType === "price-asc") return a.ProductPrice - b.ProductPrice;
            if (sortType === "price-desc") return b.ProductPrice - a.ProductPrice;
            if (sortType === "name-asc") return a.ProductName.localeCompare(b.ProductName);
            if (sortType === "name-desc") return b.ProductName.localeCompare(a.ProductName);
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
                        {categoriesData.map((cat) => (
                            <option key={cat.Category_Id} value={cat.Category_Id}>
                                {cat.CategoryName}
                            </option>
                        ))}
                    </select>

                    {/* Alkategória csak akkor jelenik meg, ha van találat */}
                    {category !== "összes" && filteredSubcategories.length > 0 && (
                        <>
                            <h3>Alkategória</h3>
                            <select onChange={(e) => setSubcategory(e.target.value)}>
                                <option value="összes">Összes</option>
                                {filteredSubcategories.map((sub) => (
                                    <option key={sub.Subcategory_Id} value={sub.Subcategory_Id}>
                                        {sub.SubcategoryName}
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
                    {filteredProducts.length === 0 ? (
                        <p>Nincs találat.</p>
                    ) : (
                        filteredProducts.map(product => (
                            <a
                                href={`/getProduct/${product.Product_Id}`}
                                key={product.Product_Id}
                                className="product-card"
                            >
                                <img
                                    className="product-img"
                                    src={product.ProductIMG}
                                    alt={product.Product_Name}
                                />
                                <h4>{product.Product_Name}</h4>
                                <p>{product.ProductPrice.toLocaleString()} Ft</p>
                            </a>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Termekek;