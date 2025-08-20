const { useState,useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userActions } from '../store/actions/user.actions.js'
import { getDoneTodos } from "../store/actions/todo.actions.js"


const { useSelector, useDispatch } = ReactRedux


export function AppHeader() {
    getDoneTodos()
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    
    const loggedUser = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)
    const doneTodos = useSelector(state =>state.doneTodos)
    
    
 
    

    function onLogout() {
        userActions.logout()
            .then(() => {
                showSuccessMsg(`goodbey ${loggedUser.username}`)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
              
                <h1>React Todo App</h1>
              
              
                {loggedUser ? (
                    < section >
                        <Link to={`/user/${loggedUser._id}`}>Hello {loggedUser.fullname} | Balance:{loggedUser.balance}</Link>

                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup/>
                    </section>
                )}
                <nav className="app-nav">
                    
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                      <span>
                      Done todos:{doneTodos.length/todos.length === NaN ? 0:doneTodos.length/todos.length * 100 + '%' }
                </span>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
