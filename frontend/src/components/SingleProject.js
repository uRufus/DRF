import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
             <td>
                {project.name}
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

const SingleProjectList = ({projects}) => {
    var {pk} = useParams()
    var filteredProjects = projects.filter((project) => project.id == pk)

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
                {filteredProjects.map((project) => <ProjectItem project={project} />)}
            </table>
    )
}

export default SingleProjectList


