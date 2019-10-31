import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { products } from './products';
import { sampleTypes } from './types';
import { Product } from './model';

@Component({
  selector: 'my-app',
  template: `
      <h2>Grid with InCellEditing</h2>
      <h5>After a value is selected in the dropdown with arrow keys and Enter, related formGroup become 'pristine' and Add button is disabled</h5>
      <kendo-grid
          [kendoGridInCellEditing]="createFormGroup"
          [kendoGridBinding]="products"
          [height]="500"
          [pageSize]="10"
          [pageable]="true"
          [sortable]="true"
          [navigable]="true"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand>Add new</button>
        </ng-template>
        <kendo-grid-column field="PType" title="Type">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem" let-formGroup="formGroup">
                <kendo-dropdownlist id="field_ptype" name="field_ptype" 
                                    [formControl]="formGroup.get('PType')"
                                    
                                    [data]="types" 
                                    [textField]="'Name'" 
                                    [valueField]="'Id'"
                ></kendo-dropdownlist>
            </ng-template>
            <ng-template kendoGridCellTemplate let-dataItem>
                {{dataItem?.PType?.Name}}
            </ng-template>
        </kendo-grid-column>  
        <kendo-grid-column field="ProductName" title="Product Name"></kendo-grid-column>
        <kendo-grid-column field="UnitPrice" editor="numeric" title="Price"></kendo-grid-column>
        <kendo-grid-column field="Discontinued" editor="boolean" title="Discontinued"></kendo-grid-column>
        <kendo-grid-column field="UnitsInStock" editor="numeric" title="Units In Stock"></kendo-grid-column>
        <kendo-grid-command-column title="command" width="220">
            <ng-template kendoGridCellTemplate let-isNew="isNew">
                <button kendoGridRemoveCommand>Remove</button>
                <button kendoGridSaveCommand [disabled]="formGroup?.invalid">Add</button>
                <button kendoGridCancelCommand>Discard</button>
            </ng-template>
        </kendo-grid-command-column>
      </kendo-grid>
      
      <div *ngIf="formGroup">
            Pristine: {{formGroup?.pristine}} | Valid: {{formGroup?.valid}}      
      </div>

      <br/>
      <br/>
      <h2>Corrected grid with InCellEditing</h2>

      <kendo-grid
          [kendoGridCustomInCellEditing]="createFormGroup"
          [kendoGridBinding]="products"
          [height]="500"
          [pageSize]="10"
          [pageable]="true"
          [sortable]="true"
          [navigable]="true"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand>Add new</button>
        </ng-template>
        <kendo-grid-column field="PType" title="Type">
            <ng-template kendoGridEditTemplate let-dataItem="dataItem" let-formGroup="formGroup">
                <kendo-dropdownlist id="field_ptype" name="field_ptype" 
                                    [formControl]="formGroup.get('PType')"
                                    
                                    [data]="types" 
                                    [textField]="'Name'" 
                                    [valueField]="'Id'"
                ></kendo-dropdownlist>
            </ng-template>
            <ng-template kendoGridCellTemplate let-dataItem>
                {{dataItem?.PType?.Name}}
            </ng-template>
        </kendo-grid-column>  
        <kendo-grid-column field="ProductName" title="Product Name"></kendo-grid-column>
        <kendo-grid-column field="UnitPrice" editor="numeric" title="Price"></kendo-grid-column>
        <kendo-grid-column field="Discontinued" editor="boolean" title="Discontinued"></kendo-grid-column>
        <kendo-grid-column field="UnitsInStock" editor="numeric" title="Units In Stock"></kendo-grid-column>
        <kendo-grid-command-column title="command" width="220">
            <ng-template kendoGridCellTemplate let-isNew="isNew">
                <button kendoGridRemoveCommand>Remove</button>
                <button kendoGridSaveCommand [disabled]="formGroup?.invalid">Add</button>
                <button kendoGridCancelCommand>Discard</button>
            </ng-template>
        </kendo-grid-command-column>
      </kendo-grid>
      
      <div *ngIf="formGroup">
            Pristine: {{formGroup?.pristine}} | Valid: {{formGroup?.valid}}      
      </div>
      
  `
})
export class AppComponent {
    public products: any[] = products;
    public formGroup: FormGroup;
    public types: any[] = sampleTypes;

    constructor(private formBuilder: FormBuilder) {
        this.createFormGroup = this.createFormGroup.bind(this);
    }

    public createFormGroup(args: any): FormGroup {
        console.log('createGroup');

        const item = args.isNew ? new Product() : args.dataItem;

        this.formGroup = this.formBuilder.group({
            'ProductID': item.ProductID,
            'ProductName': [item.ProductName, Validators.required],
            'UnitPrice': item.UnitPrice,
            'UnitsInStock': [item.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])],
            'Discontinued': item.Discontinued,
            "PType": [item.PType]
        });

        return this.formGroup;
    }
}
