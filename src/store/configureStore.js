import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import experienceReducer from '../reducers/experience';
import problemReducer from '../reducers/problem';
import userReducer from '../reducers/user';
import solutionReducer from '../reducers/solution';

export default () => {
    const store = createStore(
        combineReducers({
            experience: experienceReducer,
            problem: problemReducer,
            solution: solutionReducer,
            user: userReducer
        }),
        applyMiddleware(
            thunk
        )
    );
    return store;
};
