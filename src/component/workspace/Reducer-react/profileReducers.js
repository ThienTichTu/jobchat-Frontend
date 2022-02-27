import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();
const profilePreducers = (state, action) => {
    switch (action.type) {
        case "NAME": {
            return {
                ...state,
                displayName: action.payload
            }
        }
        case "PHONE": {
            return {
                ...state,
                phone: action.payload
            }
        }
        case "COMPANY": {
            return {
                ...state,
                company: action.payload
            }
        }
        case "DES": {
            return {
                ...state,
                decriptions: action.payload
            }
        }
        case "ADDRESS": {
            return {
                ...state,
                address: action.payload
            }
        }

        case "TELE": {
            return {
                ...state,
                telegram: action.payload
            }
        }
        case "FACE": {
            return {
                ...state,
                face: action.payload
            }
        }
        case "TWITTER": {
            return {
                ...state,
                twitter: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default profilePreducers;