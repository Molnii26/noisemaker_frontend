import '../css/App.css'

import Header from "../components/Header";
import Footer from '../components/Footer';
import { getProducts } from '../api';

function Termek() {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        // Termékek
        (async () => {
            const data = await getProducts();
            if (data.result) {
                setProductsData(data.result)
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <div className='termek-ablak'>
                <div className='termek-kep'>
                    <img src={productsData[0]?.ProductImage} alt={productsData[0]?.ProductName} />
                </div>
                <div className='termek-leiras'>
                    <h2>{productsData[0]?.Product_Name}</h2>
                    <p>{productsData[0]?.ProductDescription}</p>
                    <p>Ár: {productsData[0]?.ProductPrice} Ft</p>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Termek