import {bootstrap}    from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import {TodoListComponent} from "../initial/todo-list.component";

import 'systemjs-hot-reloader/default-listener.js';
export function __reload(module) {
    console.log('reloading module');
}

bootstrap(TodoListComponent);
