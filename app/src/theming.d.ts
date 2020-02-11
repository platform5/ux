import { UxTheme } from './../../packages/core/src/styles/ux-theme';
import { ThemeService, ThemesSet } from './theme-service';
import { AureliaUX, Design } from '@aurelia-ux/core';
export declare class Theming {
    private themeService;
    private ux;
    design: Design;
    selectedComponent: 'button' | 'input' | 'textarea' | 'select' | 'datepicker' | 'chip-input' | 'slider' | 'checkbox' | 'radio';
    buttonPreviewClass: string;
    buttonPreviewType: string;
    buttonPreviewDisabled: boolean;
    inputPreviewType: string;
    inputPreviewVariant: string;
    inputPreviewDisabled: boolean;
    inputPreviewError: boolean;
    textareaPreviewVariant: string;
    textareaPreviewAutoResize: boolean;
    textareaPreviewDisabled: boolean;
    textareaPreviewError: boolean;
    selectPreviewVariant: string;
    selectPreviewDisabled: boolean;
    selectPreviewError: boolean;
    datepickerPreviewType: string;
    datepickerPreviewVariant: string;
    datepickerPreviewDisabled: boolean;
    datepickerPreviewError: boolean;
    chipInputPreviewVariant: string;
    chipInputPreviewDisabled: boolean;
    chipInputPreviewError: boolean;
    sliderPreviewType: string;
    sliderPreviewDisabled: boolean;
    checkboxIndeterminate: boolean;
    checkboxPreviewDisabled: boolean;
    radioPreviewDisabled: boolean;
    constructor(themeService: ThemeService, ux: AureliaUX);
    selectTheme(theme: 'light' | 'dark' | number): void;
    newTheme(): void;
    themeNameChanged(theme: ThemesSet): void;
    saveTheme(theme: ThemesSet): void;
    deleteTheme(index: number): void;
    selectComponent(component: 'button' | 'input' | 'textarea' | 'select'): void;
    json(theme: UxTheme): string;
}
