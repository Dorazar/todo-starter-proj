const {createStore} = Redux


export const INCREMENT = 'INCREMENT'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO='REMOVE_TODO'
export const ADD_TODO='ADD_TODO'
export const UPDATE_TODO='UPDATE_TODO'


const initalState = {
    count:109,
    todos:[],
    todo:{}
}


export function appReducer(state = initalState,cmd={}) {

switch (cmd.type) {
    case INCREMENT:
        return {...state,count:state.count+1}

    case SET_TODOS:
        return {...state,todos:cmd.todos}
    case REMOVE_TODO:
        var todos = state.todos.filter(todo=>todo._id==!cmd._id)
        return {...state,todos}    
    case ADD_TODO:
        return {...state,todos:[...todos,cmd.todo]}
    case UPDATE_TODO:
        var todos = state.todos.map(todo => todo._id===cmd.todo_id ? cmd.todo:todo)
        return {...state,todos}
 

        default:
    
        return state
}

}

export const store = createStore(appReducer)
window.gStore = store