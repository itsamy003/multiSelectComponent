import { Component, OnInit, Input, Self, ContentChild, TemplateRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, Validators, NgControl } from '@angular/forms';
import { MultiSelectTemplateDirective } from '../directives/multi-select-template.directive';

@Component({
  selector: 'ngr-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor, Validators {
  @Input() options: Array<any>;
  @Input('settings') multiSelectConfig;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect: EventEmitter<any>  = new EventEmitter();

  // Read structural directives as TemplateRefs
  @ContentChild(MultiSelectTemplateDirective, { read: TemplateRef }) multiSelectTemplate;
  searchFieldValue: String;
  isDropdownOpend: Boolean = false;
  selectedItems: [{ id: Number, name: String }];
  selectedItemsValues: String;
  previousItemSelected: any; // particularly useful for single selection
  onChange = (obj: Object) => { };
  onTouched = (obj: Object) => { };
  writeValue(obj: any): void {
    this.selectedItems = obj || [];
    this.previousItemSelected = this.selectedItems[0] || [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    // set default configurations
    if (!this.multiSelectConfig) {
      this.multiSelectConfig
        = { token: { tokenView: true, maxToShow: 2 }, hasSingleSelection: false, selectBox: { label: '--Select--', context: 'items'} };
    }
    // set must have properties
    if (this.multiSelectConfig && !('hasSingleSelection' in this.multiSelectConfig)) {
      this.multiSelectConfig['hasSingleSelection'] = false;
    }
    this.setSelectedTitle();
    // const control = this.controlDir.control;
  }
  isItemInSelectedItems(item) {
    if (!(this.selectedItems && this.selectedItems.length > 0)) { return; }
    return this.selectedItems.some((obj) => obj.id === item.id);
  }
  removeFromSelectedItems(item) {
    let itemIndex = 0;
    const isItemIn = this.selectedItems.some((obj, index) => {
      itemIndex = index;
      return obj.id === item.id;
    });
    if (isItemIn) {
      this.selectedItems.splice(itemIndex, 1);
    }
    this.setSelectedTitle();
  }
  toggleSelection(item) {
    const isSelected = this.isItemInSelectedItems(item);
    if (!isSelected) {
      this.onSelect.emit(item);
      this.selectedItems.push(item);
      if (this.multiSelectConfig.hasSingleSelection && this.selectedItems.length > 1 && this.previousItemSelected) {
        this.removeFromSelectedItems(this.previousItemSelected);
      }
      this.previousItemSelected = item;
    } else {
      this.removeFromSelectedItems(item);
    }
    this.setSelectedTitle();
  }
  // dropdown related
  closeDropdown() {
    this.isDropdownOpend = false;
  }
  setSelectedTitle() {
    let limitArray = [];
    let remaining = [];
    if (this.selectedItems && this.selectedItems.length > 0) {
      if (this.selectedItems.length > this.multiSelectConfig.token.maxToShow) {
        limitArray = this.selectedItems.slice(0, this.multiSelectConfig.token.maxToShow);
        remaining = this.selectedItems.slice(this.multiSelectConfig.token.maxToShow, this.selectedItems.length);
        this.selectedItemsValues = limitArray.map(ele => ele.name).toString() + ' +' + remaining.length + ' Selected';
      } else {
        this.selectedItemsValues = this.selectedItems.map(ele => ele.name).toString()
                                   + ` ${this.multiSelectConfig.selectBox.context} Selected`;
      }
    } else {
      this.selectedItemsValues = this.multiSelectConfig.selectBox.label;
    }
  }
}
