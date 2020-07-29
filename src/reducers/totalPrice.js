const initalState = {
    Totalprice: 0,
    change: 0
}
const totalPrice = (state = initalState, action) => {
    switch (action.type) {
        case 'SET_PRICE': {
            return state = { ...state, Totalprice: action.payload }
        }
        case 'CHANGE': {
            return state = { ...state, change: 1 }
        }

    }
    return state;
}

export default totalPrice;