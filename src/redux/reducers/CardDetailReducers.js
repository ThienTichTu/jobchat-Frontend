const initState = {
    activeCreate: false,
    idColumn: {},
    infor: {}
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
                infor: action.payload.infor
            };
        }
        default: {
            return state;
        }
    }
}

export default CardDetailReducers;