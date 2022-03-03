export const initState = {
    UserReceive: {},
    dataChat: []
}

const ChatRooms = (state = initState, action) => {
    switch (action.type) {
        case "SET_ROOM": {
            return {
                ...state,
                UserReceive: action.payload
            };
        }
        case "SET_CHAT_RENDER": {
            return {
                ...state,
                dataChat: action.payload
            };
        }
        case "RESET_ROOM": {
            console.log("re dux set ", action.payload)
            return {
                ...state,
                UserReceive: {},
                dataChat: []
            };
        }
        default: {
            return state;
        }
    }
}

export default ChatRooms;