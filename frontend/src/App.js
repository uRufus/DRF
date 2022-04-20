import React from 'react';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import SingleProjectList from './components/SingleProject.js'
import ToDoList from './components/ToDo.js'
import axios from 'axios'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import {HashRouter, BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom'

const NotFound404 = () => {
    var location = useLocation()
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/ToDo')
            .then(response => {
                const todos = response.data
                    this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }
    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} /> } />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/projects/:pk' element={<SingleProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<ToDoList todos={this.state.todos} />} />
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </BrowserRouter>
            </div>

        )
    }
}
export default App;