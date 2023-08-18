import React, { useState } from "react";
import './Product.css';
import { connect } from "react-redux";
import { notification } from 'antd';
import userContext from '../UserContext';
import { useContext } from 'react';

const Product = (props) => {
    const { itemDetail } = props;
    const values = useContext(userContext);
    const { user } = values;
    const [api, contextHolder] = notification.useNotification();
    const [count, setCount] = useState(itemDetail.qty);
    const onClickAddToCart = () => {
        if (!user.name) {
            console.log('hjj');
            api.info({
                message: `Info`,
                description: 'Signin to add to cart',
                placement: 'bottom',
            });
        }
        else {
            props.addToCart({ itemDetail, count });
            api.info({
                message: `Success`,
                description: 'Added to cart successfully',
                placement: 'bottom',
            });
        }

    }
    const onClickMinus = () => {
        if (count - 1 < itemDetail.qty) {
            return;
        }
        else {
            setCount(count - 1);
        }
    }
    return (
        <div className="productBody" id="homeSection">
            {contextHolder}
            <div>
                <img src={itemDetail.image} className="productImage" />
            </div>
            <div className="productDetailSection">
                <p>Name: <span>{itemDetail.name}</span></p>
                <p>Price: <span>{itemDetail.price}</span></p>
                <p>Desc: <span>{itemDetail.desc}</span></p>
                <div className="countSection">
                    <button onClick={() => { setCount(count + 1) }}>+</button>
                    <input type='number' value={count} disabled />
                    <button onClick={() => onClickMinus()}>-</button>
                </div>
                <div>
                    <button className="addToCartBtn" onClick={() => onClickAddToCart()}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (payload) => dispatch({ type: 'ADD', payload })
    }
};
const mapStateToProps = (state) => {
    return {
        cartItem: state.cartItems
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);