import {Directive, AfterViewInit, ElementRef} from "@angular/core";

@Directive({
    selector: '[focusOnLoad]'
})
export default class FocusOnLoad implements AfterViewInit {
    constructor(private elementRef:ElementRef) {
    }

    ngAfterViewInit() {
        setTimeout(() => this.elementRef.nativeElement.focus());
    }
}

