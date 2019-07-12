import { combineReducers } from 'redux';
import CONSTACTIONS from '@constActions';

const defaultState = {
    name: 'yangyi20',
    age: '18',
    hobbies: ['swim', 'piano', 'badminton'],
    list: []
}

const globalReducer = (state = defaultState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case CONSTACTIONS.NORMAL.SET_USER_NAME:
            newState.name = action.data;
            return newState;
        case `${CONSTACTIONS.API.GET_TODOLIST}__SET`:
            newState.list = action.data.list;
            return newState;
        default:
            return state;
    }
}
export default function createReducer (pages) {
    const reducers = {};
    let reducer;
    pages.map(page => {
        try {
            reducer = require(page + '/reducer');
            reducers[page] = reducer.default;
        } catch (error) {
            console.log(error);
        } finally {
            return undefined;
        }
    });
    reducers.global = globalReducer;
    return combineReducers(reducers);
}