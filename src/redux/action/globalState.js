export const ChangeBbtn = (detail) => {
    return {
        type: "BTN_ACTIVE",
        payload: detail
    }
}

export const ChangePageName = (detail) => {
    return {
        type: "PAGE_NAME",
        payload: detail
    }
}

export const increaseMess = (detail) => {
    return {
        type: "MESS_COUT",
        payload: detail
    }
}

export const ChatRender = (detail) => {
    return {
        type: "CHAT_RENDER",
        payload: detail
    }
}