import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'project': '', 'user': '', 'text': ''}
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

    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.user, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
                <label>Проект</label>
                <select className="form-control" name="project" onChange={(event)=>this.handleChange(event)}>
                                {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                </select>

                <label>Пользователь</label>
                <select className="form-control" name="user" onChange={(event)=>this.handleChange(event)}>
                                {this.props.users.map((user) => <option value={user.id}> {user.username}</option>)}
                </select>

                <label>Заметка</label>
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>
            <input type="submit" className="btn btn-primary" value="Create" />
        </form>
        );
    }
}

export default ToDoForm