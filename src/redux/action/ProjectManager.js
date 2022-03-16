export const activeProjectManager = (detail) => {
    return {
        type: "PROJECT_ACTIVE",
        payload: detail
    }
}
export const setIdProject = (detail) => {
    return {
        type: "SET_PROJECT_ID",
        payload: detail
    }
}
export const pushProject = (detail) => {
    return {
        type: "PUSH_PROJECT",
        payload: detail
    }
}

export const setProjectMember = (detail) => {
    return {
        type: "SET_PROJECT_MEMBERS",
        payload: detail
    }
}
