// env.d.ts — Add this at the project root to declare .vue modules for TypeScript
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
