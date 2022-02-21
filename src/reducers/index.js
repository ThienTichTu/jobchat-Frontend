import CardDetailReducers from './card_detail';
import UserReducers from './user';
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    Card: CardDetailReducers,
    User: UserReducers
});
export default rootReducers;
