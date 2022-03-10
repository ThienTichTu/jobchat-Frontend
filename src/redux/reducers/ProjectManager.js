export const initState = {
    active: false,
    id: "",

}

const ProjectManager = (state = initState, action) => {
    switch (action.type) {
        case "PROJECT_ACTIVE": {

            return {
                ...state,
                active: action.payload
            };
        }
        case "SET_PROJECT_ID": {

            return {
                ...state,
                id: action.payload
            };
        }

        case "SET_PROJECT": {

            return {
                ...state,
                push: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export default ProjectManager;