import '../css/App.css'
import Header from "../components/Header";
import Footer from '../components/Footer';
import { getProducts } from '../api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Gomb from '../components/Gomb';

function Termek() {
    const [productsData, setProductsData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProductsData(data);
        })();
    }, []);

    const product = productsData.find(p => p.Product_Id == id);

    const addToKosar = () => {
        const kosar = JSON.parse(localStorage.getItem('kosar') || '[]');
        const existing = kosar.find(item => item.Product_Id == id);

        if (existing) {
            existing.quantity += 1;
        } else {
            kosar.push({
                Product_Id: product.Product_Id,
                Product_Name: product.Product_Name,
                ProductPrice: product.ProductPrice,
                ProductIMG: product.ProductIMG,
                quantity: 1
            });
        }

        localStorage.setItem('kosar', JSON.stringify(kosar));
        navigate('/kosar');
    };

    return (
        <>
            <Header />
            <div className='termek-ablak'>
                <div className='termek-kep'>
                    <img src={product?.ProductIMG} alt={product?.Product_Name} />
                </div>
                <div className='termek-leiras'>
                    <h2>{product?.Product_Name}</h2>
                    <p>{product?.ProductDescription}</p>
                    <p>Ár: {product?.ProductPrice} Ft</p>
                    <Gomb
                        onClick={addToKosar}
                        className='px-3 py-1 text-decoration-none rounded text-dark fs-4 w-100'
                        text="Kosárba"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Termek;