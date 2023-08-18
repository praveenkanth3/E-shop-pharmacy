import React, { useEffect, useState } from "react";
import { productlist } from "../Constants/pharmacy.constant";
import Product from "../Product/Product";
import './CardSection.css'
import useDebounce from "./Debounce";

const CardSection = () => {
    const [searchTxt, setSearchTxt] = useState('');
    const [products, setProducts] = useState([]);
    const debouncedValue = useDebounce(searchTxt, 900);
    console.log(debouncedValue)
    useEffect(() => {
        const res = productlist.filter(obj => obj.name.toLowerCase().includes(debouncedValue));
        setProducts(res);
    }, [debouncedValue]);
    return (
        <div>
            <div className="productsHeadingContainer">
                <h1>Products</h1>
                <input placeholder="Search here" value={searchTxt} onChange={(e) => {setSearchTxt(e.target.value.toLowerCase()) }} className="searchBox"/>
            </div>
            <div className="allProductsContainer">
                {products.map((item) => {
                    return (<Product itemDetail={item} />)
                })
                }
            </div>
        </div>
    );
}

export default CardSection;