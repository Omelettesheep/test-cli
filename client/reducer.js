import CONSTACTIONS from '@constActions';

const defaultState = {
    name: 'yangyi20',
    age: '18',
    hobbies: ['swim', 'piano', 'badminton'],
    list: []
}

export default (state = defaultState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case CONSTACTIONS.NORMAL.SET_USER_NAME:
            newState.name = action.data;
            return newState;
        case CONSTACTIONS.NORMAL.CHANGE_LIST:
            newState.list = action.data;
            return newState;
        default:
            return state;
    }
}