import React from 'react'
import {Link} from 'react-router-dom'
const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
             <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
             <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
             <td>
                {todo.created_by}
            </td>
            <td>
                {todo.active ? 'Active' : 'Not active'}
            </td>
            <td><button onClick={()=>deleteToDo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Created at
                </th>
                <th>
                    Updated at
                </th>
                <th>
                    Created by
                </th>
                <th>
                    active
                </th>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
    )
}
export default ToDoList
