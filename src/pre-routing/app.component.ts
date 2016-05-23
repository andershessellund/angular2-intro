/// <reference path="./declarations.d.ts" />

import "todomvc-common/base.css!";
import "todomvc-app-css/index.css!";

import {Component} from '@angular/core';

import {TodoService} from './todo.service.ts';
import {TodoListComponent} from "./todo-list.component.ts";

@Component({
    selector: 'app',
    template: '<todomvc></todomvc>',
    providers: [TodoService],
    directives: [TodoListComponent]
})
export class AppComponent {

}
