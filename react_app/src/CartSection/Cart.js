import React, { useEffect } from "react";
import styles from './Cart.module.scss';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { notification } from 'antd';
import { useState } from "react";
import { useContext } from 'react';
import userContext from "../UserContext";

const Cart = (props) => {
    console.log(props)
    const [total, setTotal] = useState(0);
    const values = useContext(userContext);
    const { user } = values;
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        let totalValue = 0;
        props.cartItem.map(ele =>{
            totalValue += (ele.qty * ele.price)
        });
        setTotal(totalValue);
    })
    const onClickBuyBtn = () =>{
        api.info({
            message: `Success`,
            description: 'Order Placed Successfully',
            placement: 'bottom',
        });
        props.emptyCart();
    }
    return(
        <>
        {user.name ? (<div className={styles.cartContainer}>
           {contextHolder}
           <div className={styles.cartHeader}>
            <h1>{`Hey ${user.name} here is your cart!`}</h1>
            <div>{`Delivery At :${user.address}`}</div>
           </div>
           <div className={styles.cartTableContainer}>
            {(total !== 0) ?(<table className={styles.cartTable}>
                <tr>
                    <th>No.</th>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                {props.cartItem.map((ele,index) => {
                    return(
                        <tr>
                            <td>{index}</td>
                            <td>{ele.name}</td>
                            <td>{ele.qty}</td>
                            <td>{ele.price * ele.qty}</td>
                            <td><button onClick={() => props.deleteFromCart(ele)}>Delete</button></td>
                        </tr>
                    )
                })
                }
                {total !== 0 && (<tr><td>Total Amount:</td><td>{total}</td></tr>)}
            </table>):<div> your cart is empty</div>}
           </div>
           <div className={styles.footerSection}>
              <Link to='/'>Return to home</Link>
              <button onClick={onClickBuyBtn}>Proceed to buy</button>
           </div>
        </div>):<di>Please sign in to view the cart section</di>}
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        cartItem: state.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
     deleteFromCart: (payload) => dispatch({type: "DELETE", payload}),
     emptyCart: () => dispatch({type:'EMPTY'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
