import MsgBox from "../../Components/MsgBox/MsgBox";
import Loading from "../../Components/Loading/Loading";
import { Col, Row } from "react-bootstrap";

const ProductPage = () => {
  //const [{loading, error, products}, dispatch ] = useReducer(ProductPageReducer, initState);      //! Add Reducer for Product Page.
  //   return (
  //     <div>
  //       {loading ? (
  //         <Loading />
  //       ) : error ? (
  //         <MsgBox variant="danger">{error}</MsgBox>
  //       ) : (
  //         <div>
  //           <Row>
  //             <Col md={6}>
  //               <img
  //                 src={`${product.image}`}
  //                 alt={product.title}
  //                 className="card-img-top card-image"
  //               />
  //             </Col>
  //             <Col md={3}>
  //               <ProductDescription {...product} />
  //             </Col>
  //             <Col md={3}>
  //               <CartDescription product={product} addToCart={addToCart} />
  //             </Col>
  //           </Row>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default ProductPage;
