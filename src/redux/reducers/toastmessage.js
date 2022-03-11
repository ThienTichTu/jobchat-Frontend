export const initState = {
    active: false,
    type: "",
    mess: ""
}

const toastMessage = (state = initState, action) => {
    switch (action.type) {
        case "TOAST": {

            return {
                ...state,
                active: true,
                type: action.payload.type,
                mess: action.payload.mess
            };
        }
        case "TOAST_REFESH": {

            return {
                ...state,
                active: false,
                type: "",
                mess: ""
            };
        }

        default: {
            return state;
        }
    }
}

export default toastMessage;