import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ApiComponent.css";

export const ApiComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [url, setUrl] = useState(
    "https://www.googleapis.com/books/v1/volumes?q=magazines&printType=books&key=AIzaSyCgWnLD7riCTk4lJ4wPXSWHe8uTnFtfTv8"
  );
  const [query, setQuery] = useState("magazines");
  const [select, setSelect] = useState("books");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        let res = await axios(url);
        console.log(res.data.items);
        setApiData(res.data.items);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };
  const handleSelect = (e) => {
    if (e.target.value === "all") {
      setUrl(url);
    }
    setSelect(e.target.value);
  };
  return (
    <>
      <div className="text-center mt-5">
        <form
          onSubmit={(event) => {
            setUrl(
              `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=${select}&key=AIzaSyCgWnLD7riCTk4lJ4wPXSWHe8uTnFtfTv8`
            );
            event.preventDefault();
          }}
        >
          <div className="d-inline-flex">
            <input
              type="text"
              className="form-control w-50 me-4 text-center"
              onChange={handleInput}
              value={query}
            />
            <select
              className="form-select w-25"
              name="printtype"
              onChange={handleSelect}
              value={select}
            >
              <option value="books">Books</option>
              <option value="magazines">Magazines</option>
              <option value="all">All</option>
            </select>
            <button type="submit" className="btn btn-primary ms-4">
              Submit
            </button>
          </div>
        </form>
      </div>
      {isError && (
        <div className="text-center text-danger">Something Went Wrong...</div>
      )}
      {isLoading ? (
        <div className="text-center text-danger">Loading...</div>
      ) : (
        <div className="container-fluid mt-4">
          <div className="row row-cols-lg-3 row-cols-g-2 mt-5">
            {apiData.map((val, index) => {
              return (
                <div key={index}>
                  <div className="col border border-2 border-info mt-4 p-2 hgt">
                    <table className="table text-primary table-striped">
                      <tbody>
                        <tr>
                          <td>Title:</td>
                          <td>{val.volumeInfo.title}</td>
                        </tr>
                        <tr>
                          <td>Publisher:</td>
                          <td>{val.volumeInfo.publisher}</td>
                        </tr>
                        <tr>
                          <td>PrintType:</td>
                          <td>{val.volumeInfo.printType}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      ;
    </>
  );
};
