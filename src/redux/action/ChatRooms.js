export const setRoom = (detail) => {
    return {
        type: "SET_ROOM",
        payload: detail
    }
}
export const setChatRender = (detail) => {
    return {
        type: "SET_CHAT_RENDER",
        payload: detail
    }
}
export const resetChatRoom = () => {
    return {
        type: "RESET_ROOM",
    }
}
