import React from 'react';
import {HashRouter, BrowseRouter, Route, Link, Switch, Redirect} from "react-router-dom"
const ProjectItem = ({project, deleteProject, filterProject}) => {
    return (
        <tr>
             <td>
                <Link to= {`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.repo}
            </td>
            <td>
                {project.users}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


class ProjectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'filter': '', 'filtered_projects': props.projects}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        console.log(event.target.name, '=', event.target.value)
    }

    handleFilterChange(event) {
        this.setState(
                        {
                            filter: event.target.value,
                            filtered_projects: this.props.projects.filter((item) => item.name.toUpperCase().indexOf(event.target.value.toUpperCase()) != -1)
                        }
                    );
        console.log(event.target.name, '=', event.target.value)
    }

    render() {
        return (
        <div>
            <label>Фильтр</label>
            <input type="text"  name="filter" value={this.state.filter} onChange={(event)=>this.handleFilterChange(event)} />
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Репозиторий</th>
                        <th>Участники</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filtered_projects.map((project)=> <ProjectItem project={project} users={this.props.users} deleteProject={this.props.deleteProject} updateProject={this.props.updateProject}/>)}
                </tbody>
            </table>
        </div>
        );
    }
}

export default ProjectList;
