import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import uuid = require('uuid');
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {forkJoin} from "rxjs/observable/forkJoin";
import {Observable} from "rxjs/Observable";

export interface Todo {
    id:string;
    title:string;
    completed:boolean;
}

const TODO_URL = '/api/todos';

function parseJsonResponse(res:Response) {
    return res.json();
}

@Injectable()
export class TodoService {

    todos:BehaviorSubject<Todo[]> = new BehaviorSubject([]);

    constructor(private http:Http) {
        this.refresh();
    }


    refresh() {
        return this.http.get(TODO_URL)
            .map(parseJsonResponse)
            .subscribe(todos => this.todos.next(todos));
    }

    put( todo: Todo) {
        const newTodos = this.todos.value.slice(0);
        const index = newTodos.findIndex(t => t.id === todo.id);
        newTodos[index] = todo;
        this.todos.next(newTodos);
        let headers = new Headers(
            { 'Content-Type': 'application/json' }
        );
        let options = new RequestOptions({ headers: headers });
        const request = this.http.put(
            TODO_URL + '/' + todo.id,
            JSON.stringify({
                title: todo.title,
                completed: todo.completed
            }),
            options);
        return this.doRequest(request);
    }


    add(title:string) {
        let headers = new Headers(
            { 'Content-Type': 'application/json' }
        );
        let options = new RequestOptions({ headers: headers });
        const request = this.http.post(TODO_URL,
            JSON.stringify({title: title}), options);
        return this.doRequest(request);
    }

    remove(id:string) {
        const newTodos = this.todos.value.filter(todo => todo.id !== id);
        this.todos.next(newTodos);

        const request = this.http.delete(TODO_URL + '/' +id);
        return this.doRequest(request);
    }

    removeCompleted() {
        const newTodos = this.todos.value.filter(todo => !todo.completed);
        const completedTodos = this.todos.value.filter(todo => todo.completed);
        this.todos.next(newTodos);

        const requests = completedTodos.map(
            todo => this.http.delete(TODO_URL + '/' + todo.id));
        return this.doRequest(forkJoin(requests));
    }
    markAll(completed: boolean) {
        const newTodos = this.todos.value.map(todo => Object.assign({}, todo, {
            completed: completed
        }));
        const changedTodos = this.todos.value.filter(todo => todo.completed !== completed);

        this.todos.next(newTodos);

        const requests = changedTodos
            .map(todo => Object.assign({}, todo, {completed: completed}))
            .map(todo => this.doPut(TODO_URL + '/' + todo.id, todo));
        return this.doRequest(forkJoin(requests));
    }

    private doPut(path:string, data:any) {
        let headers = new Headers(
            { 'Content-Type': 'application/json' }
        );
        let options = new RequestOptions({ headers: headers });
        return this.http.put(path, JSON.stringify(data), options);
    }

    private doRequest(request:Observable) {
        request.subscribe(
            () => this.refresh(),
            err => this.handleError(err));
        return request;
    }

    private handleError(err) {
        console.dir(err);
        this.refresh();
    }

}
