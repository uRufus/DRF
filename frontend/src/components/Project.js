import React from 'react'
import {Link} from 'react-router-dom'
const ProjectItem = ({project, deleteProject}) => {
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

const ProjectList = ({projects, deleteProject}) => {
    return (
            <table>
                    <th>
                        name
                    </th>
                    <th>
                        repo
                    </th>
                    <th>
                        users
                    </th>
                    <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
    )
}
export default ProjectList
