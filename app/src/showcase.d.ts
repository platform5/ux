import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
export declare class Showcase {
    controllerFactory: ValidationControllerFactory;
    labelPosition: string;
    firstName: string;
    lastName: string;
    email: string;
    interests: Array<string>;
    ageGroup: string;
    tags: Array<string>;
    brightness: string;
    brightnessOptions: {
        value: string;
        label: string;
    }[];
    region: string[];
    variant: string;
    controller: ValidationController;
    listBorder: boolean;
    listNbLines: 'two-line' | 'three-line';
    listPeople: {
        "icon": string;
        "name": string;
        "secondary": string;
    }[];
    listSettings: {
        "icon": string;
        "setting": string;
        "description": string;
    }[];
    emailsOptions: {
        value: string;
        label: string;
    }[];
    emails: Array<string>;
    constructor(controllerFactory: ValidationControllerFactory);
    submit(): void;
    toggleEmails(): void;
    get emailsChecked(): boolean;
    get emailsIndeterminate(): boolean;
}
