import { ModalService } from './ux-modal-service';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxModalTheme } from './ux-modal-theme';
import { TaskQueue } from 'aurelia-framework';
import { ModalPosition, ModalKeybord, DefaultModalConfiguration } from './modal-configuration';
export declare class UxModal implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    private modalService;
    private taskQueue;
    private defaultConfig;
    type: 'standard' | 'modal';
    position: ModalPosition;
    host: 'body' | HTMLElement | false | string;
    modalBreakpoint: number;
    theme: UxModalTheme;
    overlayDismiss: boolean;
    keyboard: ModalKeybord;
    restoreFocus?: (lastActiveElement: HTMLElement) => void;
    role: 'dialog' | 'alertdialog';
    ariaLabelledby: string;
    ariaDescribedby: string;
    lastActiveElement?: HTMLElement;
    private handlingEvent;
    private viewportType;
    private overlayElement;
    private contentWrapperElement;
    private contentElement;
    private showed;
    private showing;
    private hiding;
    constructor(element: HTMLElement, styleEngine: StyleEngine, modalService: ModalService, taskQueue: TaskQueue, defaultConfig: DefaultModalConfiguration);
    private bindingContext;
    bind(bindingContext: any): void;
    positionChanged(): void;
    modalBreakpointChanged(): void;
    hostChanged(): void;
    overlayDismissChanged(): void;
    keyboardChanged(): void;
    attached(): void;
    detached(): void;
    private show;
    private hide;
    private setZindex;
    private moveToHost;
    private removeFromHost;
    private getHost;
    unbind(): void;
    handleEvent(): void;
    themeChanged(newValue: any): void;
    setViewportType(): void;
    readonly computedType: 'standard' | 'modal';
    overlayClick(event: Event): any;
    dismiss(event?: Event): Promise<void>;
    ok(result?: any, event?: Event): Promise<void>;
    private prepareClosing;
    stop(event: Event): void;
    private getAnimationDuration;
}