export const getExperience = (q = '') => {
    return (dispatch) => {
        return fetch('/api/experience/search?q=' + q)
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    dispatch({
                        type: 'LOAD_EXPERIENCES',
                        data: data.data
                    });
                }
            });
    };
};

export const updateExperience = (payload) => ({
    type: 'UPDATE_EXPERIENCE',
    data: payload
});
