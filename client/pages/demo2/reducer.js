
import CONSTACTIONS from '@constActions';
const defaultState = {
    name: 'page-demo2'
}

function reducer(state = defaultState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case CONSTACTIONS.API.GET_PAGE_NAME + '__SET':
            newState.name = action.data;
            return newState;
        default:
            return state;
    }
}

export default reducer;