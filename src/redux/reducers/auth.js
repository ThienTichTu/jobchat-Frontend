

const initState = {
    login: false,
    user: {}
}

const auth = (state = initState, action) => {
    switch (action.type) {
        case "LOG_OUT": {
            console.log("logout")
            return { ...state, login: action.payload, user: {} };
        }
        case "LOG_IN": {

            return { ...state, login: true, user: action.payload };
        }

        default: {
            return state;
        }
    }
}

export default auth;