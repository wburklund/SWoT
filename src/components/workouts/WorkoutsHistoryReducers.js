const initialState = []

const WorkoutsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WORKOUTS_HISTORY_GET':
            return { workouts: action.workouts, totalCount: action.totalCount }
        default:
            return state;
    }
}

export default WorkoutsHistoryReducer