
import UserReducers from './user';
import globalState from './globalState';
import auth from './auth';
import toastMessage from './toastmessage';
import ChatRooms from './ChatRooms'
import Togle from './togle';
import ProjectManager from './ProjectManager'
import CardDetailReducers from "./CardDetailReducers"
import CardDetailUpdate from "./CardDetailUpdate"
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    Card: CardDetailReducers,
    User: UserReducers,
    Effect: globalState,
    auth: auth,
    toast: toastMessage,
    togle: Togle,
    ChatRooms: ChatRooms,
    ProjectManager: ProjectManager,
    CardDetailReducers: CardDetailReducers,
    CardDetailUpdate: CardDetailUpdate

});
export default rootReducers;
