/// <reference path="./declarations.d.ts" />

import "todomvc-common/base.css!";
import "todomvc-app-css/index.css!";

import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, RouterOutlet} from '@angular/router-deprecated';

import {TodoService} from './todo.service.ts';
import {TodoListComponent, TodoFilter} from "./todo-list.component.ts";

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
    providers: [TodoService, HTTP_PROVIDERS],
    directives: [RouterOutlet]
})
@RouteConfig([
    {
        path: '/',
        name: 'TodoList',
        component: TodoListComponent,
        useAsDefault: true,
        data: {filter: TodoFilter.None}
    },
    {
        path: '/completed',
        name: 'TodoListCompleted',
        component: TodoListComponent,
        data: {filter: TodoFilter.Completed}
    },
    {
        path: '/active',
        name: 'TodoListActive',
        component: TodoListComponent,
        data: {filter: TodoFilter.Active}
    }

])
export class AppComponent {

}
