const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state == null
                ? null
                : state
    }
}

export const newNotification = (notification) => {
    return {type: 'NEW_NOTIFICATION', notification}
}

export const removeNotification = () => {
    return {type: 'REMOVE_NOTIFICATION'}
}

export const notify = (notification, time) => {
    return async(dispatch) => {
        dispatch({type: 'NEW_NOTIFICATION', notification: notification})
        await setTimeout(() => {
            dispatch({type: 'REMOVE_NOTIFICATION'})
        }, time * 1000)
    }
}

export default notificationReducer