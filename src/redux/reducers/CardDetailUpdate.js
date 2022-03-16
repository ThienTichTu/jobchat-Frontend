const initState = {
    active: false,
    data: {},
    index: ""
}

const CardDetailUpdate = (state = initState, action) => {
    switch (action.type) {
        case "CLOSE_CARD_DETAIL_UPDATE": {
            return {
                ...state,
                active: false,
                data: {}
            };
        }

        case "ACTIVE_CARD_DETAIL_UPDATE": {
            return {
                ...state,
                active: true,
                data: action.payload.card,
                index: action.payload.index
            }
        }
        default: {
            return state;
        }
    }
}

export default CardDetailUpdate;