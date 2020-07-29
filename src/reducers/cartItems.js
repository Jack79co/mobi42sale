



const cartItems = (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.pk_Items_Id !== action.payload.pk_Items_Id)

        case 'EMPTY_ARRAYS' : 
            return state = []   

    }
    return state
}


export default cartItems;    