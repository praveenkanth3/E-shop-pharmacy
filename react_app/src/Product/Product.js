import React from "react";
import './Product.css';

const Product = (props) => {
    const { itemDetail} = props;
    return(
        <div className="productBody" id="homeSection">
            <div>
                <img src={itemDetail.image}/>
            </div>
            <div className="productDetailSection">
                <p>Name: <span>{itemDetail.name}</span></p>
                <p>Price: <span>{itemDetail.price}</span></p>
                <p>Desc: <span>{itemDetail.desc}</span></p>
                <div className="countSection">
                    <button>+</button>
                    <textarea value={itemDetail.qty}/>
                    <button>-</button>
                </div>
                <div>
                <button className="addToCartBtn">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default Product;