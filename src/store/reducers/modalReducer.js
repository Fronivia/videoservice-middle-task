export function reducer(state, action){
    switch (action.type){
        case "removeModalWindow":
            return {...state, modal : false};
        case "addModalWindow":
            return {...state, modal: true};
        case "logIn":
            return {...state, logged : action.payload};
        case "logOut":
            return {...state, logged: false};
        default:
            return state
    }
}