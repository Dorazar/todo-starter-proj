const {createStore} = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO='REMOVE_TODO'
export const ADD_TODO='ADD_TODO'
export const UPDATE_TODO='UPDATE_TODO'
export const SET_TODO='SET_TODO'

export const IS_LOADING='IS_LOADING'

export const FILTER_BY='FILTER_BY'

const initalState = {
    todos:[],
    todo:{},
    isLoading:false,
    filterBy:{}
}


export function appReducer(state = initalState,cmd={}) {

switch (cmd.type) {
    case SET_TODOS:
   
        return {...state,todos:cmd.todos}
        
    case REMOVE_TODO:
        var todos = state.todos.filter(todo=>todo._id==!cmd._id)
        return {...state,todos}    
    case ADD_TODO:
        return {...state,todos:[...todos,cmd.todo]}
    case UPDATE_TODO:
        var todos = state.todos.map(todo => todo._id===cmd.todo._id ? cmd.todo:todo)
        
        return {...state,todos}
    case SET_TODO:
        return {...state,todo:cmd.todo}

    case IS_LOADING:
        return {...state,isLoading:cmd.isLoading}
        
    case FILTER_BY:
     return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }
        default:
        return state
}
}

export const store = createStore(appReducer)
window.gStore = store
