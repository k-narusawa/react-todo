import axios from "axios"

export const READ_ALL_TODO = "READ_ALL_TODO";
export const READ_TODO = "READ_TODO";
export const UPDATE_TODO = "UPDATE_TODO" ;
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

const ROOT_URL = "http://localhost:3001/todo"

export const readAllTodo = () => async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}`)
    dispatch({type: READ_ALL_TODO, response});
};
export const postTodo = (values) => async (dispatch) => {
    await axios.post(`${ROOT_URL}`, values)
    dispatch({type: CREATE_TODO});
};
export const putTodo = (values) => async (dispatch) => {
    const response = await axios.put(`${ROOT_URL}/${values.id}`, values)
    dispatch({type: UPDATE_TODO, response})
}
export const deleteTodo = (id) => async (dispatch) =>  {
    await axios.delete(`${ROOT_URL}/${id}`)
    dispatch({type: DELETE_TODO, id});
}
export const getTodo = (id) => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/${id}`)
    dispatch({type: READ_TODO, response})
}