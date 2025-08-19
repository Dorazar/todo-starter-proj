import { todoService } from "../../services/todo.service.js";
import {SET_TODO,ADD_TODO,UPDATE_TODO,REMOVE_TODO,SET_TODOS,store, FILTER_BY, LOGGED_IN_USER} from "../store.js"
import { userService } from "../../services/user.service.js";

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
    .then(todos => store.dispatch({type:SET_TODOS,todos}))
    .then(() => store.dispatch({type:FILTER_BY,filterBy}))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
    .then(todos=>store.dispatch({type:REMOVE_TODO,todos}))
}


export function saveTodo(todo){
  const type = todo._id? UPDATE_TODO:ADD_TODO
  return todoService.save(todo)
  .then(todo => store.dispatch({type,todo}))
  
}

export function getTodo(todoId) {
    return todoService.get(todoId)
    .then(todo => store.dispatch({type:SET_TODO,todo}))
}

// #USER
export function setLoggedinUser() {
    return userService.getLoggedinUser()
    .then(user => store.dispatch({type:SET_USER,user}))
}

