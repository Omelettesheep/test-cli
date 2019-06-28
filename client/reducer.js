import CONSTACTIONS from '@constActions';

const defaultState = {
    name: 'yangyi20',
    age: '18',
    hobbies: ['swim', 'piano', 'badminton']
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case CONSTACTIONS.NORMAL.SET_USER_NAME:
            const newState = Object.assign({}, state);
            newState.name = action.data;
            return newState;
        default:
            return state;
    }
}