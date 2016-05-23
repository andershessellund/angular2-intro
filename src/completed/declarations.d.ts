// needed until https://github.com/Microsoft/TypeScript/issues/6615

declare module "/src/completed/todo-list.component.html" {
    let template: string;
    export default template;
}

declare module "/src/completed/todo-item.component.html" {
    let template: string;
    export default template;
}

declare module 'uuid' {
    export function v4(): string;
}

