import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./interfaces/Product";

function App() {
  let lock: boolean = false;
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (!lock) {
      console.log("Initializated");
      getProducts();
      lock = true;
    }
  }, []);

  async function getProducts() {
    const res = await fetch("http://localhost:8080/api/v1/products");
    const products = await res.json();

    setProducts(products);
  }

  return (
    <div className="container">
      {products &&
        products.map((p, index) => {
          return (
            <div className="card" key={index}>
              <div className="img-container">
                <img src={p.imgUrl}></img>
              </div>
              <h2>{p.name}</h2>
              <p>{p.description}</p>€{p.price}
            </div>
          );
        })}
    </div>
  );
}

export default App;
