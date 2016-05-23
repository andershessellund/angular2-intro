import '/src/initial/todo-list.component.css!';

import template from '/src/initial/todo-list.component.html';
import {Component, OnInit} from "@angular/core";
import uuid = require('uuid');

export interface Todo {
    id:string;
    title:string;
    completed:boolean;
}

@Component({
    selector: 'todo-list',
    template: template
})
export class TodoListComponent implements OnInit {
    visibleTodos: Todo[] = [];

    ngOnInit() {
        this.visibleTodos = [{
            id: uuid.v4(),
            title: 'Get JSPM up and running',
            completed: true
        }, {
            id: uuid.v4(),
            title: 'Learn some Angular',
            completed: true
        }, {
            id: uuid.v4(),
            title: 'Create a TODO app',
            completed: false
        }, {
            id: uuid.v4(),
            title: 'Tell the world about it',
            completed: false
        }];
    }
}
