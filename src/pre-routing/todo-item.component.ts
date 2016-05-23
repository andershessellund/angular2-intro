import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Todo} from "./todo.service.ts";

import template from '/src/pre-routing/todo-item.component.html';
import FocusOnLoad from "./focus-on-load.directive";

@Component({
    selector: 'todo-item',
    template: template,
    directives: [FocusOnLoad]
})
export class TodoItem {
    @Input()
    todo: Todo;

    editedTodoText: string = null;

    @Output()
    onToggle = new EventEmitter<Todo>();

    @Output()
    onRemove = new EventEmitter<Todo>();

    @Output()
    onChangeTitle = new EventEmitter<{ todo: Todo, newTitle: string}>();

    beginEditing() {
        this.editedTodoText = this.todo.title;
    }

    isEditing() {
        return this.editedTodoText !== null;
    }

    doneEditing() {
        if(this.editedTodoText === null) {
            return;
        }
        if(this.editedTodoText.trim() === '') {
            this.onRemove.emit(this.todo);
        }
        else if(this.editedTodoText.trim() !== this.todo.title) {
            this.onChangeTitle.emit(
                {
                    todo: this.todo,
                    newTitle: this.editedTodoText.trim()
                });
        }
        this.editedTodoText = null;
    }
    cancelEditing() {
        this.editedTodoText = null;
    }
}
