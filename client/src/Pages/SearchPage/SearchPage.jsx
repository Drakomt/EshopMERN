import { useEffect, useReducer, useState } from "react";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../../Components/Title/Title";
import { Button, Col, Row } from "react-bootstrap";
import Rating from "../../Components/Rating/Rating";
import Loading from "../../Components/Loading/Loading";
import MsgBox from "../../Components/MsgBox/MsgBox";
import Product from "../../Components/Product/Product";
import { LinkContainer } from "react-router-bootstrap";
import { GetError } from "../../Services/GetError";
import { GetFilterUrl } from "../../Services/GetFilterUrl";
import { SearchPageReducer } from "../../Reducers/SearchPageReducer";
import { prices, ratings } from "./utils";
import "./SearchPage.css";

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(SearchPageReducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`/products/categories`);
        setCategories(data);
      } catch (error) {
        //toast.error(GetError(err));
        toast.error(error.message);
      }
    };

    getCategories();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({ type: GET_REQUEST });

        const { data } = await axios.get(
          // `/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
          "/products/search?" + GetFilterUrl(search, {}, true)
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: GetError(error) });
      }
    };

    getData();
  }, [category, order, page, price, query, rating]);

  return (
    <div>
      <Title title="Search Products" />
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={GetFilterUrl(search, { category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? "text-bold" : ""}
                    to={GetFilterUrl(search, { category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={GetFilterUrl(search, { price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={GetFilterUrl(search, { price: p.value })}
                    className={p.value === price ? "text-bold" : ""}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={GetFilterUrl(search, { rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "text-bold" : ""} //!Change this to a class to highlight (bold) the selected rating.
                  >
                    <Rating caption={" "} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MsgBox variant="danger">{error}</MsgBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating " + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(GetFilterUrl(search, { order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && <MsgBox>No Product Found</MsgBox>}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((pageIndex) => (
                  <LinkContainer
                    key={pageIndex + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: GetFilterUrl(
                        search,
                        { page: pageIndex + 1 },
                        true
                      ),
                    }}
                  >
                    <Button
                      className={
                        Number(page) === pageIndex + 1
                          ? "current-page-number"
                          : ""
                      }
                      variant="light"
                    >
                      {pageIndex + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default SearchPage;
