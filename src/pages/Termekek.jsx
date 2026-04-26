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
        (async () => {
            const data = await getProducts();
            setProductsData(data)
        })();

        (async () => {
            const data = await getCategoryAll();
            setCategoriesData(data)
        })();

        (async () => {
            const data = await getSubcategoryAll();
            setSubcategoriesData(data)
        })();
    }, []);

    const handleCategoryChange = (value) => {
        setCategory(value === "összes" ? "összes" : Number(value));
        setSubcategory("összes");
    };

    // Csak az aktuális főkategóriához tartozó alkategóriák
    const filteredSubcategories = subcategoriesData.filter(
        sub => category === "összes" || Number(sub.Category_Id) === Number(category)
    );

    // A termékeken nincs Category_Id, ezért az alkategóriák segítségével
    // megkeressük, hogy az adott termék melyik főkategóriába tartozik.
    const filteredProducts = productsData.filter(product => {

        // Megkeressük azt az alkategóriát, amelyhez a termék tartozik
        const productSubcategory = subcategoriesData.find(
            sub => Number(sub.Subcategory_Id) === Number(product.Subcategory_Id)
        );

        // Az alkategóriából kiolvasható a főkategória azonosítója
        const productCategoryId = productSubcategory ? Number(productSubcategory.Category_Id) : null;

        return (
            (category === "összes" || productCategoryId === Number(category)) &&
            (subcategory === "összes" || Number(product.Subcategory_Id) === Number(subcategory))
        );
    })
        .sort((a, b) => {
            if (sortType === "price-asc") return a.ProductPrice - b.ProductPrice;
            if (sortType === "price-desc") return b.ProductPrice - a.ProductPrice;
            if (sortType === "name-asc") return a.Product_Name.localeCompare(b.Product_Name);
            if (sortType === "name-desc") return b.Product_Name.localeCompare(a.Product_Name);
            return 0;
        });

    return (
        <>
            <Header />

            <div className="container-termekek">
                <div className="filter">

                    <h3 className='kategoria-cim'>Kategória</h3>
                    <select onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="összes">Összes</option>
                        {categoriesData.map((cat) => (
                            <option key={cat.Category_Id} value={cat.Category_Id}>
                                {cat.CategoryName}
                            </option>
                        ))}
                    </select>

                    {category !== "összes" && filteredSubcategories.length > 0 && (
                        <>
                            <h3 className='kategoria-cim'>Alkategória</h3>
                            <select onChange={(e) => setSubcategory(
                                e.target.value === "összes" ? "összes" : Number(e.target.value)
                            )}>
                                <option value="összes">Összes</option>
                                {filteredSubcategories.map((sub) => (
                                    <option key={sub.Subcategory_Id} value={sub.Subcategory_Id}>
                                        {sub.Subcategory_Name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <h3 className='kategoria-cim'>Rendezés</h3>
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="">Nincs</option>
                        <option value="price-asc">Ár növekvő</option>
                        <option value="price-desc">Ár csökkenő</option>
                        <option value="name-asc">ABC (A-Z)</option>
                        <option value="name-desc">ABC (Z-A)</option>
                    </select>

                </div>

                <div className="products-container" id='fadeInLeft-animation'>
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