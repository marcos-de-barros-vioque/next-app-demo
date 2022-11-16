import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/ProductDashboard.module.css";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
   const getProducts = async () => {
     try {
       const url = categoryFilter 
       ? `/api/products?category=${categoryFilter}`
       : "/api/products";
       const response = await fetch(`/api/products?category=${categoryFilter}`);
       if (response.ok) {
          const data = await response.json();
        setProducts(data);
       } else {
        throw new Error(
          `Fetch fehlgeschlagen mit Status: ${response.status}`
        );
     }
     } catch (error) {
      console.log(error);
      alert(error.message);
     }
   };
    getProducts();
   }, [categoryFilter]);

  return (
    <>
      <Head>
        <title>Product Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Products Dashboard</h1>
        <select 
        onChange={(event) => {
          if (event.target.value === "all") {
          setCategoryFilter(null);
          } else {
          setCategoryFilter(event.target.value);
          }
         }}
         >
          <option value="all">Alle</option>
          <option value="Food">Food</option>
          <option value="Drinks">Drinks</option>
          <option value="Furniture">Furniture</option>
        </select>
        <p>{categoryFilter}</p>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;