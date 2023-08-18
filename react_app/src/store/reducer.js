const initialState = {
    cartItems: [],
}
const cartReducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'ADD') {
        const newcartItem = { ...action.payload.itemDetail, qty: action.payload.count };
        newState.cartItems.push(newcartItem);
    }
    if (action.type === 'DELETE') {
        const updatedItems = newState.cartItems.filter(ele => {return ele.id !== action.payload.id;});
        newState.cartItems = updatedItems;
    }
    if(action.type === 'EMPTY'){
        newState.cartItems = [];
    }
    return newState;
};

export default cartReducer;