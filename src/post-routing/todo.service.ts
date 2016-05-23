import uuid = require('uuid');
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export interface Todo {
    id:string;
    title:string;
    completed:boolean;
}


export class TodoService {

    todos:BehaviorSubject<Todo[]> = new BehaviorSubject([]);

    constructor() {
        this.todos.next([{
            id: uuid.v4(),
            title: 'Get JSPM up and running',
            completed: true
        }, {
            id: uuid.v4(),
            title: 'Learn some Angular 2',
            completed: true
        }, {
            id: uuid.v4(),
            title: 'Create a TODO app',
            completed: false
        }]);
    }

    put( todo: Todo) {
        const newTodos = this.todos.value.slice(0);
        const index = newTodos.findIndex(t => t.id === todo.id);
        newTodos[index] = todo;
        this.todos.next(newTodos);
    }


    add(title:string) {
        const newTodos = this.todos.value.slice(0);
        newTodos.push({
            id: uuid.v4(),
            title: title,
            completed: false
        });
        this.todos.next(newTodos);
    }

    remove(id:string) {
        const newTodos = this.todos.value.filter(todo => todo.id !== id);
        this.todos.next(newTodos);
    }

    removeCompleted() {
        const newTodos = this.todos.value.filter(todo => !todo.completed);
        this.todos.next(newTodos);
    }

    markAll(completed: boolean) {
        const newTodos = this.todos.value.map(todo => Object.assign({}, todo, {
            completed: completed
        }));
        this.todos.next(newTodos);
    }
}
