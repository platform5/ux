define(["require", "exports", "tslib", "aurelia-templating", "aurelia-pal", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "./ux-default-input-configuration", "@aurelia-ux/core/components/ux-input-component.css", "@aurelia-ux/core/components/ux-input-component--outline.css"], function (require, exports, tslib_1, aurelia_templating_1, aurelia_pal_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, ux_default_input_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxInput = void 0;
    var UxInput = /** @class */ (function () {
        function UxInput(element, styleEngine, defaultConfiguration) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.autofocus = null;
            this.disabled = false;
            this.readonly = false;
            this.variant = 'filled';
            this.dense = false;
            this.rawValue = '';
            this.focused = false;
            defineUxInputElementApis(element);
            if (defaultConfiguration.theme !== undefined) {
                this.theme = defaultConfiguration.theme;
            }
            if (defaultConfiguration.dense !== undefined) {
                this.dense = defaultConfiguration.dense;
            }
            if (defaultConfiguration.variant !== undefined) {
                this.variant = defaultConfiguration.variant;
            }
        }
        UxInput.prototype.bind = function () {
            var element = this.element;
            var textbox = this.textbox;
            var textboxValue = this.textbox.getAttribute('value');
            if (textboxValue != null) {
                this.rawValue = textboxValue;
            }
            if (this.autofocus || this.autofocus === '') {
                this.focused = true;
            }
            this.dense = core_1.normalizeBooleanAttribute('dense', this.dense);
            if (element.hasAttribute('id')) {
                var attributeValue = element.getAttribute('id');
                if (attributeValue) {
                    element.removeAttribute('id');
                    textbox.setAttribute('id', attributeValue);
                }
            }
            if (element.hasAttribute('step')) {
                var attributeValue = element.getAttribute('step');
                if (attributeValue) {
                    textbox.setAttribute('step', attributeValue);
                    element.removeAttribute('step');
                }
            }
            this.typeChanged(this.type);
            if (this.min) {
                textbox.setAttribute('min', this.min.toString());
            }
            if (this.max) {
                textbox.setAttribute('max', this.max.toString());
            }
            if (this.minlength) {
                textbox.setAttribute('minlength', this.minlength.toString());
            }
            if (this.maxlength) {
                textbox.setAttribute('maxlength', this.maxlength.toString());
            }
            this.autocompleteChanged(this.autocomplete);
            this.themeChanged(this.theme);
        };
        UxInput.prototype.attached = function () {
            this.textbox.addEventListener('change', stopEvent);
            this.textbox.addEventListener('input', stopEvent);
            this.variantChanged(this.variant);
        };
        UxInput.prototype.detached = function () {
            this.textbox.removeEventListener('change', stopEvent);
            this.textbox.removeEventListener('input', stopEvent);
        };
        UxInput.prototype.getValue = function () {
            return this.value;
        };
        UxInput.prototype.setValue = function (value) {
            var oldValue = this.value;
            var newValue = this.processRawValue(value);
            if (oldValue !== newValue) {
                this.value = newValue;
                this.ignoreRawChanges = true;
                this.rawValue = newValue === null || newValue === undefined ? '' : newValue.toString();
                this.ignoreRawChanges = false;
                this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
            }
        };
        UxInput.prototype.processRawValue = function (rawValue) {
            var newValue = rawValue;
            if (this.type === 'number') {
                newValue = rawValue === '' ? NaN : Number(rawValue);
                if (isNaN(newValue)) {
                    newValue = null;
                }
                else {
                    if (this.min !== undefined && this.min > newValue) {
                        newValue = this.min;
                    }
                    if (this.max !== undefined && newValue > this.max) {
                        newValue = this.max;
                    }
                }
            }
            return newValue;
        };
        UxInput.prototype.autocompleteChanged = function (newValue) {
            if (newValue == null) {
                this.textbox.removeAttribute('autocomplete');
            }
            else {
                this.textbox.setAttribute('autocomplete', newValue);
            }
        };
        UxInput.prototype.themeChanged = function (newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'input';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        };
        UxInput.prototype.focusedChanged = function (focused) {
            this.element.classList.toggle('ux-input-component--focused', focused);
            this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
        };
        UxInput.prototype.typeChanged = function (newValue) {
            if (![
                'text',
                'date',
                'time',
                'datetime-local',
                'password',
                'number',
                'email',
                'url',
                'tel',
                'search'
            ].includes(newValue)) {
                this.type = 'text';
                return;
            }
            this.textbox.setAttribute('type', this.type);
        };
        UxInput.prototype.rawValueChanged = function (newValue) {
            this.element.classList.toggle('ux-input-component--has-value', newValue.length > 0);
            if (this.ignoreRawChanges) {
                return;
            }
            this.setValue(newValue);
        };
        UxInput.prototype.focus = function () {
            this.textbox.focus();
        };
        UxInput.prototype.blur = function () {
            if (document.activeElement === this.textbox) {
                this.textbox.blur();
            }
        };
        UxInput.prototype.variantChanged = function (newValue) {
            this.element.style.backgroundColor = newValue === 'outline' ?
                this.element.style.backgroundColor = core_1.getBackgroundColorThroughParents(this.element) :
                '';
        };
        Object.defineProperty(UxInput.prototype, "placeholderMode", {
            get: function () {
                return typeof this.label !== 'string' || this.label.length === 0;
            },
            enumerable: false,
            configurable: true
        });
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "autofocus", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "autocomplete", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "disabled", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "maxlength", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "minlength", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "min", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "max", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "readonly", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "theme", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "label", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "placeholder", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "type", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "variant", void 0);
        tslib_1.__decorate([
            aurelia_templating_1.bindable
        ], UxInput.prototype, "dense", void 0);
        tslib_1.__decorate([
            aurelia_binding_1.observable
        ], UxInput.prototype, "rawValue", void 0);
        tslib_1.__decorate([
            aurelia_binding_1.observable
        ], UxInput.prototype, "focused", void 0);
        tslib_1.__decorate([
            aurelia_binding_1.computedFrom('label')
        ], UxInput.prototype, "placeholderMode", null);
        UxInput = tslib_1.__decorate([
            aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, ux_default_input_configuration_1.UxDefaultInputConfiguration),
            aurelia_templating_1.customElement('ux-input'),
            aurelia_templating_1.useView(aurelia_pal_1.PLATFORM.moduleName('./ux-input.html'))
        ], UxInput);
        return UxInput;
    }());
    exports.UxInput = UxInput;
    function stopEvent(e) {
        e.stopPropagation();
    }
    var getVm = function (_) { return _.au.controller.viewModel; };
    var defineUxInputElementApis = function (element) {
        Object.defineProperties(element, {
            value: {
                get: function () {
                    return getVm(this).getValue();
                },
                set: function (value) {
                    getVm(this).setValue(value);
                },
                configurable: true
            },
            focus: {
                value: function () {
                    getVm(this).focus();
                },
                configurable: true
            },
            blur: {
                value: function () {
                    getVm(this).blur();
                },
                configurable: true
            }
        });
    };
});
//# sourceMappingURL=ux-input.js.map