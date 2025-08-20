import { FILTER_BY } from "../store/store.js"

const { useState, useEffect } = React


export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})


    // const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
           
            default: break
        }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    
  
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance,isDone } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
            <label htmlFor="isDone"></label>
             <select value={isDone} name="isDone" id="isDone" onChange={handleChange}>
                <option>All</option>\
                <option value='Done'>Done</option>
                <option value='Active'>Active</option>
             </select>
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}