import { Component, OnInit, Input, Self, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, Validators, NgControl } from '@angular/forms';
import { MultiSelectTemplateDirective } from '../directives/multi-select-template.directive';

@Component({
  selector: 'ngr-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor, Validators {
  @Input() items: Array<any>;
   // Read in our structural directives as TemplateRefs
  @ContentChild(MultiSelectTemplateDirective, {read: TemplateRef}) multiSelectTemplate;
  searchFieldValue: String;
  isDropdownOpend: Boolean = false;
  selectedItems: [{id: Number, name: String}];
  selectedItemsValues: String;
  previousItemSelected: any; // particularly useful for single selection
  onChange = (obj: Object) => {};
  onTouched = (obj: Object) => {};
  writeValue(obj: any): void {
    this.selectedItems = obj || [];
    this.previousItemSelected = this.selectedItems[0] || [];
    this.setSelectedTitle();
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
    // const control = this.controlDir.control;
  }
  isItemInSelectedItems(item) {
    if (!(this.selectedItems && this.selectedItems.length > 0)) { return; }
    return this.selectedItems.some((obj) =>  obj.id === item.id);
  }
  removeFromSelectedItems(item) {
    let itemIndex = 0;
    const isItemIn = this.selectedItems.some((obj, index) => {
      itemIndex = index;
      return obj.id === item.id;
    });
    if (isItemIn ) {
      this.selectedItems.splice(itemIndex, 1);
    }
    this.setSelectedTitle();
  }
  toggleSelection(item) {
   const isSelected = this.isItemInSelectedItems(item);
   if ( !isSelected ) {
     this.selectedItems.push(item);
    //  if ( this.selectedItems.length > 1 && this.previousItemSelected ) {
    //    this.removeFromSelectedItems(this.previousItemSelected);
    //   }
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
    if ( this.selectedItems && this.selectedItems.length > 0 ) {
      if (this.selectedItems.length > 9) {
        limitArray = this.selectedItems.slice(0, 9);
        remaining = this.selectedItems.slice(9, this.selectedItems.length);
        this.selectedItemsValues = limitArray.map( ele => ele.name ).toString() + ' +' + remaining.length + ' Selected';
      } else {
        this.selectedItemsValues = this.selectedItems.map( ele => ele.name ).toString() + ' Selected';
      }
    } else {
      this.selectedItemsValues = '--Select--';
    }
  }
}
