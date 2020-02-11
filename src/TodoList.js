import cx from 'classnames';
import React,{ Component } from 'react';

export default class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            todoName: '',
            numberOfTodos: 0
        }
        //this.handleClick.bind(this)
    }
    
    handleTextChange = event => {
        this.setState({ todoName: event.target.value });
    }

    //Handle adding a new todo
    handleAddTodo = () => {
        if (this.state.todoName != '')
        this.setState({todos: this.state.todos.concat({name: this.state.todoName, id: this.state.numberOfTodos, toggled: false}), numberOfTodos: this.state.numberOfTodos + 1})
    }

    handleToggleTodo = (key) => {
        let newState = this.state.todos.map(todo => {
            if (todo.id == key){
                return {name: todo.name, id: todo.id, toggled: !todo.toggled}
            }else{
                return {name: todo.name, id: todo.id, toggled: todo.toggled}
            }
        })
        this.setState({todos: newState})
    }

    generateList(){
        let output = this.state.todos.map(todo =>
            {
                if (todo.toggled){
                    return (<li key={todo.id} className='is-done' onClick={() => {this.handleToggleTodo(todo.id)}}>{todo.name}</li>)
                }else{
                    return (<li key={todo.id} onClick={() => {this.handleToggleTodo(todo.id)}}>{todo.name}</li>)
                }
            }
        )
        return output
    }

    getMessage(){
        let doneItems = 0
        for (let i = 0; i < this.state.todos.length; i++){
            if (this.state.todos[i].toggled){
                doneItems = doneItems + 1
            }
        }
        let remainingItems = this.state.todos.length - doneItems
        return remainingItems + ' remaining out of ' + this.state.numberOfTodos + ' tasks'
    }
    render() {
        return (
            <>
                <div>
                    <input name='todoName' value={this.state.todoName} onChange={this.handleTextChange}/><button type='button' onClick={this.handleAddTodo}>Add</button>
                </div>
                <span className='task-counter'>{this.getMessage()}</span>
                <ul>
                {
                    this.generateList()
                }
                </ul>


                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </>
        );
    }
}
