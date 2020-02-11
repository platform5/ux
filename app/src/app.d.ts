import { ThemeService } from './theme-service';
import { RouterConfiguration, Router } from 'aurelia-router';
export declare class App {
    private themeService;
    router: Router;
    constructor(themeService: ThemeService);
    activate(): void;
    deactivate(): void;
    configureRouter(config: RouterConfiguration, router: Router): void;
}
