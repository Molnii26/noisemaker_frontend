import '../css/App.css'

import Header from "../components/Header";
import Footer from '../components/Footer';
import { getProducts } from '../api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Termek() {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        // Termékek
        (async () => {
            const data = await getProducts();
                setProductsData(data)
        })();
    }, []);

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProductsData(data);
        })();
    }, []);

    const product = productsData.find(p => p.Product_Id == id);

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
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Termek