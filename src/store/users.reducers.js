import { USERS_FETCH } from "./users.actions"

export function users (state = [], action) {
    switch (action.type) {
        case USERS_FETCH:
            return [...state, ...action.users]
        default:
            return state
    }
}
