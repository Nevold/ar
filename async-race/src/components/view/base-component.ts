import type { Options } from '../types/types';

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> {
  private readonly node: HTMLElementTagNameMap[T];

  constructor(classes: string[] | string, tag: T, content: string = '', attributes: Options = {}) {
    this.node = document.createElement(tag);

    if (typeof classes === 'string' && classes) {
      this.node.classList.add(classes);
    } else if (classes && Array.isArray(classes)) {
      this.node.classList.add(...classes);
    }
    this.node.textContent = content;
    this.setAttributes(attributes);
  }

  public getNode(): HTMLElementTagNameMap[T] {
    return this.node;
  }

  public setAttributeOptions(atrr: string, value: string): void {
    this.node.setAttribute(atrr, `option${value}`);
  }

  public setAttributes(attributes: Options): void {
    const atrr = Object.keys(attributes);
    atrr.forEach(key => this.node.setAttribute(key, attributes[key]));
  }

  public getAttribute = (key: string): string | null => this.node.getAttribute(key);
}
