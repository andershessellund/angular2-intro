# Angular2 Intro notes

## 1. Display list of todos

```html
<li *ngFor="let todo of visibleTodos">

{{ todo.title }}
```

## 2. Set correct class on todos
```html
[class.completed]="todo.completed"
```

## 3. Add trackBy
```javascript
    trackByTodos(todo: Todo) {
        return todo.id;
    }
```

``` html
; trackBy:trackByTodos
```

## 4. Toggle completed
```html
[(ngModel)]="todo.completed"
```

## 5. Add new Todo
Update todo-list.component.ts:
```typescript
    newTodoText = '';

    addTodo() {
        this.newTodoText = this.newTodoText.trim();
        if (this.newTodoText !== '') {
            this.visibleTodos.push({
                id: uuid.v4(),
                title: this.newTodoText,
                completed: false
            });
        }
        this.newTodoText = '';
    }
```
Update todo-list.component.html:
```html
[(ngModel)]="newTodoText"
(ngSubmit)=addTodo()
```

## 6. Separate TodoItem component
Create todo-item.component.ts:
```typescript
import {Component, EventEmitter, Input, Output} from '@angular/core';

import template from '/src/initial/todo-item.component.html';
import {Todo} from "./todo-list.component";

@Component({
    selector: 'todo-item',
    template: template
})
export class TodoItem {
    @Input()
    todo: Todo;

    @Output()
    onRemove = new EventEmitter<Todo>();
}
```

Copy HTML to todo-item.component.html and update:
```
(click)="onRemove.emit(todo)
```

Add directive to todo-list.component.ts:
```
directives: [TodoItem]
```

Update todo-list.component.html
```html
<todo-item (onRemove)="removeTodo($event)" [todo]="todo"
*ngFor="let todo of visibleTodos; trackBy:trackByTodos"></todo-item>
```

## 7. Use router
Switch to new base. Introduce the service, which is RxJS based. Examine the TodoListComponent. Examine the new AppComponent.

Add router module and choose LocationStrategy
```typescript
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy,
        {useClass: HashLocationStrategy})
]);
```

Setup routes in app.component.ts
```typescript
import {RouteConfig, RouterOutlet} from '@angular/router-deprecated';
```

```
    template: '<router-outlet></router-outlet>',
    directives: [RouterOutlet]
```
```typescript

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
```

Update todo-list.component.ts
```typescript
import {RouterLink, RouteData} from "@angular/router-deprecated";
```
```
    constructor(private todoService:TodoService, routeData:RouteData) {
        this.filter = routeData.get('filter');
    }
    
    routerCanReuse() {
        return false;
    }
```

```
    directives: [RouterLink, TodoItem]
```

Update todo-list.component.html
```
            <li>
                <a [class.selected]="filter === TodoFilter.None" [routerLink]="['TodoList']">All</a>
            </li>
            <li>
                <a [class.selected]="filter === TodoFilter.Active" [routerLink]="['TodoListActive']">Active</a>
            </li>
            <li>
                <a [class.selected]="filter === TodoFilter.Completed" [routerLink]="['TodoListCompleted']">Completed</a>
            </li>
```

