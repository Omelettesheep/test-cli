import request from '@utils/request';
export const getTodoList = () => {
    return (dispatch) => {
        request.get('https://www.easy-mock.com/mock/5d14a54e94d3053851e1023b/v1/getTodoList').then((res) => {
            const data = res.data
            const action = changeList(data.list)
            dispatch(action)
        })
    }
};

export const changeList = (list) => {
    return {
        type: 'CHANGE_LIST',
        data: list
    }
}