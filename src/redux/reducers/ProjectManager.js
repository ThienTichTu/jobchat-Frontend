export const initState = {
    active: false,
    id: "",
    Members: []
}

const ProjectManager = (state = initState, action) => {
    switch (action.type) {
        case "PROJECT_ACTIVE": {

            return {
                ...state,
                Members: [],
                active: action.payload
            };
        }
        case "SET_PROJECT_ID": {

            return {
                ...state,
                id: action.payload
            };
        }


        case "SET_PROJECT_MEMBERS": {

            return {
                ...state,
                Members: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export default ProjectManager;