import './todo-list.component.css!';

import template from '/src/post-routing/todo-list.component.html';
import {RouterLink, RouteData} from "@angular/router-deprecated";
import {Component, OnInit} from "@angular/core";
import {Todo, TodoService} from "./todo.service.ts";
import {TodoItem} from "./todo-item.component.ts";
import {Subscription} from "rxjs/Subscription";

export enum TodoFilter {
    None, Active, Completed
}

@Component({
    selector: 'todo-list',
    template: template,
    directives: [RouterLink, TodoItem]
})
export class TodoListComponent implements OnInit {
    // The list of todos to display.
    visibleTodos: Todo[] = [];

    // Whenever we update the list of todos, we also update these counters
    private doneCount = 0;
    private remainingCount = 0;
    private totalCount = 0;

    // The text currently being entered for a new todo item
    private newTodoText = '';

    private TodoFilter = TodoFilter;
    // Currently chosen filer, 'none' 'completed' or 'active'
    private filter:TodoFilter;

    private todoSubscription: Subscription;


    constructor(private todoService:TodoService, routeData:RouteData) {
        this.filter = routeData.get('filter');
    }

    ngOnInit() {
        this.todoSubscription = this.todoService.todos.subscribe(todos => this.updateTodos(todos));
    }

    ngOnDestroy() {
        this.todoSubscription.unsubscribe();
    }

    routerCanReuse() {
        return false;
    }

    addTodo() {
        this.newTodoText = this.newTodoText.trim();
        if (this.newTodoText !== '') {
            this.todoService.add(this.newTodoText);
            this.newTodoText = '';
        }
    }

    removeTodo(todo:Todo) {
        this.todoService.remove(todo.id);
    }

    toggleCompleted(todo:Todo) {
        const copy = Object.assign({}, todo, {
            completed: !todo.completed
        });
        this.todoService.put(copy);
    }

    removeCompleted() {
        this.todoService.removeCompleted();
    }


    updateTitle({todo, newTitle} : {todo:Todo, newTitle:string}) {
        const copy = Object.assign({}, todo, {
            title: newTitle
        });
        this.todoService.put(copy);
    }

    isAllCompleted() {
        return this.totalCount === this.doneCount;
    }

    markAll() {
        this.todoService.markAll(!this.isAllCompleted());
    }

    private updateTodos(allTodos:Todo[]) {
        const completedTodos = allTodos.filter(todo=>todo.completed);
        const activeTodos = allTodos.filter(todo => !todo.completed);

        switch (this.filter) {
            case TodoFilter.Completed:
                this.visibleTodos = completedTodos;
                break;
            case TodoFilter.Active:
                this.visibleTodos = activeTodos;
                break;
            case TodoFilter.None:
            default:
                this.visibleTodos = allTodos;
        }
        this.totalCount = allTodos.length;
        this.doneCount = completedTodos.length;
        this.remainingCount = allTodos.length - this.doneCount;
    }

}
