import type { RouteHandler } from '../types/types';

export class HashRouter {
  public static readonly routes: Record<string, RouteHandler> = {};

  public static isRedirecting = false;

  public static count: number = 0;

  public static readonly handleHashChange = (): void => {
    this.count += 1;
    if (this.isRedirecting) return;

    const rawHash = globalThis.location.hash.slice(1);
    const [path] = rawHash.split('?');
    const normalizedPath = path || '/';

    if (normalizedPath === '/' && !this.routes['/']) {
      globalThis.location.hash = '#/';
      this.isRedirecting = false;
      return;
    }

    const handler = this.routes[normalizedPath] || this.routes['*'];
    if (handler) {
      handler();
    } else if (this.routes['*']) {
      this.routes['*']();
    } else {
      throw new Error('No route and no 404 handler found');
    }
  };

  public static readonly setNotFound = (handler: RouteHandler): void => {
    if (!this.routes['/']) {
      this.addRoute('/', () => {
        globalThis.location.hash = '#/';
        this.isRedirecting = false;
      });
    }

    this.routes['*'] = (): void => {
      if (globalThis.location.hash !== '#/') {
        handler();
      }
    };
  };

  public static readonly addRoute = (path: string, handler: RouteHandler): void => {
    this.routes[path.startsWith('/') ? path : `/${path}`] = handler;
  };

  public static readonly start = (): void => {
    globalThis.addEventListener('hashchange', this.handleHashChange);
    globalThis.addEventListener('load', this.handleHashChange);
  };

  public static readonly navigateTo = (path: string): void => {
    globalThis.location.hash = path.startsWith('/') ? path : `/${path}`;
    this.handleHashChange();
  };
}
