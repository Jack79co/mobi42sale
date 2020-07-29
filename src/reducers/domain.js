const initialState = {
    domainName: "http://algosys-001-site11.ctempurl.com",
    imagePath: "http://algosys-001-site8.ctempurl.com/",
    Token: null,
    fcmToken:null
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return state = { ...state, Token: "bearer " + action.payload }   
        case 'SET_FCM_TOKEN':
            return state = {...state, fcmToken : action.payload}   
    }
    return state
}

export default domainReducer;