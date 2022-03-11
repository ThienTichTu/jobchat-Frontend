export const initState = {
    addFriend: false,
    messHeader: false,
    messDelete: {
        active: false,
        id: "",
        data: false
    },
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
        case "MESSAGE_DELETE": {

            return {
                ...state,
                messDelete: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export default Togle;