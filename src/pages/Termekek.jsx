import '../css/App.css'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { getCategoryAll, getProducts, getSubcategoryAll } from '../api';

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

        (async()=>{
            const data = await getCategoryAll();
            if(data.result){
                setCategoriesData(data.result)
            }
        })();

        (async()=>{
            const data = await getSubcategoryAll();
            if(data.result){
                setSubcategoriesData(data.result)
            }
        })();
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