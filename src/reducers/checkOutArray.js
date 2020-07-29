const checkOutArray = (state = [], action) => {
    switch (action.type) {
        case 'CHECK_OUT':
            return [...state, action.payload]
        case 'REMOVE_FROM_CHECKOUT_ARRAY':
            return state.filter( i => i.fk_Items_Id !== action.payload.pk_Items_Id)
        case 'EMPTY_ARRAYS':
            return state = []
        case 'EMPTY_CHECKOUT_ONLY':
            return state = []

    }
    return state
}


export default checkOutArray;   