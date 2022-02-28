export const initState = {
    addFriend: false,
    messHeader: false
}

const Togle = (state = initState, action) => {
    switch (action.type) {
        case "ADD_FRIEND": {

            return {
                ...state,
                addFriend: action.payload
            };
        }
        case "MESSAGE": {

            return {
                ...state,
                messHeader: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export default Togle;