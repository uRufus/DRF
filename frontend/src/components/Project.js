import React from 'react'
import {Link} from 'react-router-dom'
const ProjectItem = ({project}) => {
    return (
        <tr>
             <td>
                <Link to= {`/projects/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.repo}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
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
                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
    )
}
export default ProjectList
