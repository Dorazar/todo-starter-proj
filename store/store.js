const {createStore} = Redux


export const INCREMENT = 'INCREMENT'
export const QUERY = 'QUERY'


const initalState = {
    count:109,
    todos:[]
}


export function appReducer(state = initalState,cmd={}) {

switch (cmd.type) {
    case INCREMENT:
        return {...state,count:state.count+1}

        default:
            return state
}

}

export const store = createStore(appReducer)
window.gStore = store