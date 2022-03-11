const initState = {
    activeCreate: false,
    idColumn: {},
    idProject: "",
    infor: {},
    data: false
}

const CardDetailReducers = (state = initState, action) => {
    switch (action.type) {
        case "CLOSE_CARD_ADD": {
            return {
                ...state,
                activeCreate: false,
            };
        }

        case "ACTIVE_CARD_ADD": {
            return {
                ...state,
                activeCreate: action.payload.active,
                idColumn: action.payload.column,
                infor: action.payload.infor,
                data: action.payload.data
            };
        }
        default: {
            return state;
        }
    }
}

export default CardDetailReducers;