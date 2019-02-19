const problemReducerDefaultState = {
    problemList:[],
    problem: null
}

export default (state = problemReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_PROBLEMS':
            return {
                ...state,
                problemList: action.data};
        case 'UPDATE_PROBLEM':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
