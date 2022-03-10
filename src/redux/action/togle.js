export const addFriend_Active = (detail) => {
    return {
        type: "ADD_FRIEND",
        payload: detail
    }
}

export const Mess_Active = (detail) => {
    return {
        type: "MESSAGE",
        payload: detail
    }
}

export const MessDelete = (detail) => {
    return {
        type: "MESSAGE_DELETE",
        payload: detail
    }
}

