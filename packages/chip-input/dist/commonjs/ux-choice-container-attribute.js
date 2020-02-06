"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ux_choice_attribute_1 = require("./ux-choice-attribute");
var aurelia_framework_1 = require("aurelia-framework");
var UxChoiceContainerAttribute = /** @class */ (function () {
    function UxChoiceContainerAttribute(element, taskQueue) {
        this.element = element;
        this.taskQueue = taskQueue;
        this.multiple = 'auto';
        this.isMultiple = false;
        this.choices = [];
        this.isQueued = false;
    }
    /* Event passed on the click eventListener */
    UxChoiceContainerAttribute.prototype.handleEvent = function (event) {
        if (event.target instanceof Element) {
            var choiceElement = event.target.closest('.ux-choice');
            if (choiceElement !== null &&
                choiceElement.au !== undefined &&
                choiceElement.au['ux-choice'] !== undefined &&
                choiceElement.au['ux-choice'].viewModel instanceof ux_choice_attribute_1.UxChoiceAttribute) {
                var choice = choiceElement.au['ux-choice'].viewModel;
                this.toggleValue(choice.value);
            }
        }
    };
    /* Callback passed on the TaskQueue when registering child choices */
    UxChoiceContainerAttribute.prototype.call = function () {
        this.isQueued = false;
        this.processValue();
    };
    UxChoiceContainerAttribute.prototype.bind = function () {
        this.multipleChanged();
        this.valueChanged(this.value);
    };
    UxChoiceContainerAttribute.prototype.multipleChanged = function () {
        if (this.multiple === 'auto') {
            this.isMultiple = Array.isArray(this.value) ? true : false;
        }
        else if (typeof this.multiple === 'boolean') {
            this.isMultiple = this.multiple;
        }
        else {
            this.isMultiple = this.multiple === 'multiple' || this.multiple === 'true';
        }
        this.element.classList.toggle('ux-choice-container--multiple', this.isMultiple);
    };
    UxChoiceContainerAttribute.prototype.attached = function () {
        this.element.classList.add('ux-choice-container');
        this.element.addEventListener('click', this);
    };
    UxChoiceContainerAttribute.prototype.detached = function () {
        this.element.removeEventListener('click', this);
    };
    UxChoiceContainerAttribute.prototype.registerChoice = function (choice) {
        this.choices.push(choice);
        if (!this.isQueued) {
            this.isQueued = true;
            this.taskQueue.queueMicroTask(this);
        }
    };
    UxChoiceContainerAttribute.prototype.disposeChoice = function (choice) {
        var index = this.choices.indexOf(choice);
        if (index !== -1) {
            this.choices.splice(index, 1);
        }
    };
    UxChoiceContainerAttribute.prototype.valueChanged = function (newValue) {
        if (this.multiple === 'auto') {
            this.multipleChanged(); // call this to ensure isMultiple respect value type
        }
        if (this.isMultiple && typeof newValue === 'string') {
            this.value = [];
        }
        else if (!this.isMultiple && Array.isArray(newValue)) {
            this.value = undefined;
        }
        this.processValue();
    };
    UxChoiceContainerAttribute.prototype.toggleValue = function (value) {
        if (this.isMultiple && Array.isArray(this.value)) {
            var index = this.value.indexOf(value);
            if (index === -1) {
                this.value.push(value);
            }
            else {
                this.value.splice(index, 1);
            }
        }
        else if (!this.isMultiple) {
            this.value = this.value === value ? undefined : value;
        }
        this.processValue();
    };
    UxChoiceContainerAttribute.prototype.processValue = function () {
        if (this.isMultiple && Array.isArray(this.value)) {
            for (var _i = 0, _a = this.choices; _i < _a.length; _i++) {
                var choice = _a[_i];
                choice.selected = this.value.indexOf(choice.value) !== -1;
            }
        }
        else if (!this.isMultiple && typeof this.value === 'string') {
            for (var _b = 0, _c = this.choices; _b < _c.length; _b++) {
                var choice = _c[_b];
                choice.selected = this.value === choice.value;
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay, primaryProperty: true })
    ], UxChoiceContainerAttribute.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], UxChoiceContainerAttribute.prototype, "multiple", void 0);
    UxChoiceContainerAttribute = __decorate([
        aurelia_framework_1.customAttribute('ux-choice-container'),
        aurelia_framework_1.inject(Element, aurelia_framework_1.TaskQueue)
    ], UxChoiceContainerAttribute);
    return UxChoiceContainerAttribute;
}());
exports.UxChoiceContainerAttribute = UxChoiceContainerAttribute;
//# sourceMappingURL=ux-choice-container-attribute.js.map