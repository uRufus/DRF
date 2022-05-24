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
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import ToDoForm from './components/ToDoForm.js'
import Cookies from 'universal-cookie';


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
            'todos': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
            password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    createProject(name, repo, users){
        let headers = this.get_headers()
        axios
            .post('http://127.0.0.1:8000/api/project/', {'name': name, 'repo': repo, 'users': users},{headers})
            .then(response => {
                this.getData()
        })
        .catch(error => {console.log(error)})
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
            .then(response => {
            let projects = response.data
            this.setState({
            'projects': this.state.projects.filter((project)=>project.id !== id)
            })
        }).catch(error => console.log(error))
    }

    filterProject(name) {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                let projects = response.data
                this.setState({
                'projects': this.state.projects.filter((project)=>project.name in name)
                })
            }).catch(error => console.log(error))
    }

    createToDo (project, user, text) {
        let headers = this.get_headers()
        let p = parseInt(project)
        let u = parseInt(user)
        axios
            .post('http://127.0.0.1:8000/api/ToDo/', {'project': p, 'created_by': u, 'text': text, 'active': true},{headers})
            .then(response => {
                this.getData()
        })
        .catch(error => {console.log(error)})
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios
            .patch(`http://127.0.0.1:8000/api/ToDo/${id}/`, {'id': id, 'active': false}, {headers})
            .then(response => {
                this.load_data()
        }).catch(error => console.log(error))
    }

    load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                const projects = response.data
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/ToDo', {headers})
            .then(response => {
                const todos = response.data
                    this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }
    componentDidMount() {
        this.get_token_from_storage()

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
                                <Link to='/projects/create'>New Project</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                            <li>
                                <Link to='/todos/create'>New ToDo</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button
                                    onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} /> } />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                            deleteProject={(id)=>this.deleteProject(id)}
                            filterProject={(name)=>this.filterProject(name)}/>} />
                        <Route exact path='/projects/create' element={<ProjectForm users={this.state.users}  createProject={(name, repo, users)=>this.createProject(name, repo, users)} />} />
                        <Route exact path='/projects/:pk' element={<SingleProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element={<ToDoList todos={this.state.todos} deleteToDo={(id)=>this.deleteToDo(id)}/>} />
                        <Route exact path='/todos/create' element={<ToDoForm users={this.state.users}  projects={this.state.projects} createToDo={(project, user, text)=>this.createToDo(project, user, text)} />} />
                        <Route exact path='/login' element={<LoginForm get_token={(username, password)=> this.get_token(username, password)} />} />
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </BrowserRouter>
            </div>

        )
    }
}
export default App;