import React from 'react'
import {Link} from 'react-router-dom'
const ToDoItem = ({todo}) => {
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
                {todo.active}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
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
                {todos.map((todo) => <ToDoItem todo={todo} />)}
            </table>
    )
}
export default ToDoList
