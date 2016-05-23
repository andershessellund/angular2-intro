import 'systemjs-hot-reloader/default-listener.js';
import {provide} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import 'rxjs/Rx';
export function __reload(module) {
    console.log('reloading module');
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy,
        {useClass: HashLocationStrategy})
]);
