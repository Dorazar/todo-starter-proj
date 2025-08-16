import { todoService } from "../../services/todo.service.js";
import {GET_TODO,UPDATE_TODO,ADD_TODO,REMOVE_TODO,SET_TODOS,store} from "../store.js"


export function loadTodos(filterBy) {
    return todoService.query(filterBy)
    .then(todos => store.dispatch({type:SET_TODOS,todos}))
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

