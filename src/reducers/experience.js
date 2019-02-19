const experienceReducerDefaultState = {
    experienceList: []
}

export default (state = experienceReducerDefaultState, action) => {

    switch (action.type) {
        case 'LOAD_EXPERIENCES':
            let data = action.data.map(element => {
                return {
                    ...element,
                    checked: false
                }
            });
            return {
                ...state,
                experienceList: data
            };
        case 'UPDATE_EXPERIENCE':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}