declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}