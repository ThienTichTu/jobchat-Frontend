export const LogoutAction = () => {
    return {
        type: "LOG_OUT",
        payload: false
    }
}

export const LoginAction = (detail) => {
    return {
        type: "LOG_IN",
        payload: detail
    }
}