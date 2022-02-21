const initState = {
    active: false,
    card: {
        id: 0,
        title: "title",
        project: "project",
        users: [],
        property: [],
        detail: []
    }
}

const CardDetailReducers = (state = initState, action) => {
    switch (action.type) {
        case "SHOW_DETAIL": {
            const newCard = action.payload;
            return {
                ...state,
                active: true,
                card: newCard
            };
        }
        case "CHANGE_DETAIL": {
            return state;
        }
        case "CLOSE_DETAIL": {
            return {
                ...state,
                active: false,
            };
        }
        default: {
            return state;
        }
    }
}

export default CardDetailReducers;