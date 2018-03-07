const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return null
    }
}

export const newNotification = (notification) => {
    return {type: 'NEW_NOTIFICATION', notification}
}

export const removeNotification = () => {
    return {type: 'REMOVE_NOTIFICATION'}
}

export default notificationReducer