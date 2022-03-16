export const showDetail = (detail) => {
    return {
        type: "SHOW_DETAIL",
        payload: detail
    }
}

export const closeCardDetail = (detail) => {
    return {
        type: "CLOSE_CARD_ADD",
        payload: detail,
    }
}

export const activeCardDetail = detail => {
    return {
        type: "ACTIVE_CARD_ADD",
        payload: detail,
    }
}
export const closeCardDetailUpdate = detail => {
    return {
        type: "CLOSE_CARD_DETAIL_UPDATE",
        payload: detail,
    }
}
export const activeCardDetailUpdate = detail => {
    return {
        type: "ACTIVE_CARD_DETAIL_UPDATE",
        payload: detail,
    }
}