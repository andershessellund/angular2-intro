// needed until https://github.com/Microsoft/TypeScript/issues/6615
declare module "/src/initial/todo-list.component.html" {
    let template: string;
    export default template;
}

declare module 'uuid' {
    export function v4(): string;
}

