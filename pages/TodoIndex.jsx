import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTodo, loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { IS_LOADING} from '../store/store.js'



const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)

  const dispatch = useDispatch()

  const todos = useSelector((state) => state.todos)
  const isLoading = useSelector((state) => state.isLoading)
  const filter = useSelector(state => state.filterBy)
  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
  const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {

    setSearchParams(filterBy)
    loadTodos(filterBy)
    
  }, [filterBy])

  
  if (todos.length >= 0) {
  dispatch({ type: IS_LOADING, isLoading: false }) }
  else
  dispatch({ type: IS_LOADING, isLoading: true })


  function onRemoveTodo(todoId) {
   const isConfrim = confirm('Sure?')
   
   if (isConfrim) {
      removeTodo(todoId)
      .then(() => {
        // setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
        showSuccessMsg(`Todo removed`)
        loadTodos()
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot remove todo ' + todoId)
      })
   }
   else {return}
  
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    
    saveTodo(todoToSave)
    .then(()=>
      showSuccessMsg(`Todo is ${todoToSave.isDone ? 'done' : 'back on your list'}`))
    .catch((err)=>{
      console.log('err:', err)
      showErrorMsg('Cannot toggle todo ' + todoToSave._id)
    })
  
   
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: '60%', margin: 'auto' }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
   
    </section>
  )
}
