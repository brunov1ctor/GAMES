export interface Scene {
  mount(container: HTMLElement): void | Promise<void>
  unmount(): void
}
