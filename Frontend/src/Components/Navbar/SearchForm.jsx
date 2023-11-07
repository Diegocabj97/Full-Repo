import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import SearchPage from "../../Pages/SearchPage/SearchPage";
const SearchForm = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
    setValue("");
  };
  return (
    <Form className="d-flex" onSubmit={handleOnSubmit}>
      <Form.Control
        type="search"
        placeholder="Escriba el tipo de producto"
        value={value}
        onChange={handleOnChange}
        className="me-2"
        aria-label="Search"
      />
      <Link className="SearchBtn" to={`/Search/${value}`}>
        <Button type="submit" variant="danger">
          Buscar
        </Button>
      </Link>
    </Form>
  );
};

export default SearchForm;
