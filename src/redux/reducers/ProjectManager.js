export const initState = {
    active: false
}

const ProjectManager = (state = initState, action) => {
    switch (action.type) {
        case "PROJECT_ACTIVE": {

            return {
                ...state,
                active: action.payload
            };
        }


        default: {
            return state;
        }
    }
}

export default ProjectManager;