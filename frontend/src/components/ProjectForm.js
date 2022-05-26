import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'name': '', 'repo':'', 'users': []}
    }

    handleChange(event)
    {
        this.setState(
            {
                    [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }
        let users = []

        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'users': users
        });


    }

    handleSubmit(event) {
        this.props.createProject(this.state.name,this.state.repo, this.state.users)
            event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
            <input type="text" name="name" placeholder="name"
            value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            <input type="text" className="form-control" name="repo" value={this.state.repo} onChange={(event)=>this.handleChange(event)} />
            <select multiple onChange={(event)=>this.handleUserChange(event)}>
                {this.props.users.map((user) => <option value={user.id}> {user.username}</option>)}
            </select>
            <input type="submit" value="Create" />
            </form>
        );
    }
}

export default ProjectForm;