
const _quantity = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUANTITY': {
           // state.filter(i=> "e4e4e91c-0688-4f6b-35ad-08d7bc994a2d" !== "e4e4e91c-0688-4f6b-35ad-08d7bc994a2d")
            return [...state, action.payload]

        }
            
    }
    return state  
}


export default _quantity;    