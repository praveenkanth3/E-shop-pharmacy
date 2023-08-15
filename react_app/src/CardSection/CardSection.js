import React from "react";
import { productlist } from "../Constants/pharmacy.constant";
import Product from "../Product/Product";
import './CardSection.css'

const CardSection = () => {
    return(
        <div>
            <h1>Products</h1>
            <div className="allProductsContainer">
                {productlist.map((item) => {
                    return(<Product itemDetail={item}/>)
                })
                }
            </div>
        </div>
    );
}

export default CardSection;