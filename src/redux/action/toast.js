export const ToastAcction = (detail) => {
    return {
        type: "TOAST",
        payload: detail
    }
}
export const ToastRefesh = () => {
    return {
        type: "TOAST_REFESH",
        payload: "close"
    }
}

