import 'systemjs-hot-reloader/default-listener.js';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import 'rxjs/Rx';

export function __reload(module) {
    console.log('reloading module');
}

bootstrap(AppComponent);
