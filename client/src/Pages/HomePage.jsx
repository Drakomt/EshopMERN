import axios from "axios";
//import Card from "../Components/Card/Card";
import { useState, useEffect } from "react";
import Products from "../Components/Products/Products";
import "./HomePage.css";
//import 'bootstrap/dist/css/bootstrap.css';


const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/products").then((res) => setProducts(res.data));

        return () => {};
    }, []);
    
    return (
        <>
            <h1>Products</h1>
            <div className="products">
                <Products products={products} />
            </div>
        </>
    )
}

export default HomePage;