import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const ListProduct = () => {
  let [product, setProduct] = useState([{}]);

  const fetchProduct = async () => {
    var { data } = await axios.get("http://localhost:5000/products");
    console.log(data);
    setProduct(data);
  };

  console.log(product);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="container">
        <h1>List of Products</h1>
        <table className="table-main">
          <tbody>
            <tr>
              <th>Product Id</th>
              <th>Product Img</th>
              <th>Product Name</th>
              <th>Product Brand</th>
              <th>Product Price</th>
            </tr>
            {product.map((prod, i) => (
              <Product data={prod} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListProduct;
