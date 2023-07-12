
import Card from "../Components/Card/Card";
import data from "../data"


const HomePage = () => {
    return (
        <div className="App">
            
            <main>
                <h1>Products</h1>
                {
                    data.products.map(product => (
                        <div className="card-container row" key={product.token}>
                            {/* <h2>{product.name}</h2>
                            <img alt='' src={product.image} width={300}></img>
                            <p>{product.description}</p> */}
                            <Card product={product} />
                        </div>
                    ))
                }
            </main>
        </div>
    )
}

export default HomePage;