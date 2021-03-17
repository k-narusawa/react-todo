import {READ_ALL_TODO, READ_TODO, UPDATE_TODO, DELETE_TODO } from "../actions"

// eslint-disable-next-line import/no-anonymous-default-export
export default (todo = {}, action) => {
    switch(action.type){
        case READ_TODO:
        case UPDATE_TODO:
            const data = action.response.data
            return {...todo, [data.id]: data}
        case READ_ALL_TODO:
            return action.response.data;
        case DELETE_TODO:
            delete todo[action.id]
            return { ...todo }
        default:
            return todo;
    }
}