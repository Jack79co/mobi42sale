const favItems = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TO_FAV':
            return [...state, action.payload]

        case 'REMOVE_FROM_FAV':
            return state.filter(favItem => favItem.pk_Items_Id !== action.payload.pk_Items_Id)

        case 'EMPTY_FAV':
            return state = []
    }
    return state
}


export default favItems;    