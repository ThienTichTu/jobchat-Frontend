export const showDetail = (detail) => {
    return {
        type: "SHOW_DETAIL",
        payload: detail
    }
}

export const changeDetail = (detail) => {
    return {
        type: "CHANGE_DETAIL",
        payload: detail,
    }
}

export const closeDetail = detail => {
    return {
        type: "CLOSE_DETAIL",
        payload: detail,
    }
}