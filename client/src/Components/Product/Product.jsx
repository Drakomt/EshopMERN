import React from "react"
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import Rating from "../Rating/Rating";
import "./Product.css"

const Product = ({product}) => {
    const addToCartHandler = (product) => {
        console.log(product);
    };
    return (
        <>
            <Card className="product-card">
                <Link to={`/product/${product.token}`}>
                    {/* <Card.Img variant="top" src={product.image} alt={product.title} className="card-image-page"/> */}
                    <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
                    }}
                    className="card-image-page"
                    />
                    <Card.Body className="card-body">
                        <Card.Title className="text-shortener">{product.title}</Card.Title>
                        <Rating rating={product.rating.rate} numReviews={product.rating.count} />
                        <Card.Text>{product.price}$</Card.Text>
                        {product.countInStock === 0 ? (<Button variant="light" disable="true">Out Of Stock</Button>) : (<Button className="btn-primary" onClick={() => addToCartHandler(product)}>Add To Cart</Button>)}
                    </Card.Body>
                </Link>
            </Card>
        </>
    );
};

export default Product