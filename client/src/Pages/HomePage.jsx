import axios from "axios";
//import Card from "../Components/Card/Card";
import { useReducer, useEffect } from "react";
import Products from "../Components/Products/Products";
import "./HomePage.css";
import MsgBox from "../Components/MsgBox/MsgBox";
import Loading from "../Components/Loading/Loading";
import { HomePageReducer, initState} from "../Reducers/HomePageReducer";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../Reducers/Actions";
//import 'bootstrap/dist/css/bootstrap.css';


const HomePage = () => {
    // const [products, setProducts] = useState([]);
    const [{loading, error, products}, dispatch ] = useReducer(HomePageReducer, initState);

    useEffect(() => {
        const getProducts = async () => {
            dispatch({type: GET_REQUEST});

            try {
                const res = await axios.get("/products");
                dispatch({type: GET_SUCCESS, payload: res.data});
            } catch (error) {
                dispatch({type: GET_FAIL, payload: error.message});
            }
        };
        getProducts();
        // return () => {};
    }, []);
    
    return (
        <>
            <h1>Products</h1>
            <div className="products">
                {loading ? <Loading/> : error? (<MsgBox variant="danger">{error}</MsgBox>) : (<Products products={products}/>)}
                {/* <Products products={products} /> */}
            </div>
        </>
    )
}

export default HomePage;