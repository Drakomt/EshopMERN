import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFilterUrl } from "../../Utils";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const link = getFilterUrl(search, { query: query });
    navigate(link);
  };

  useEffect(() => {
    if (!query) return;
    const link = getFilterUrl(search, { query: query });
    navigate(link);
  }, [query]);

  return (
    <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-120">
      <InputGroup>
        <FormControl
          area-descrybeby="button-search"
          type="text"
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
