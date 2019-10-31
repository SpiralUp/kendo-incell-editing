import { Directive, Input } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import { EditingDirectiveBase } from '@progress/kendo-angular-grid';
import { GridComponent } from '@progress/kendo-angular-grid';
import { LocalDataChangesService } from '@progress/kendo-angular-grid';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';

/**
 * A directive which encapsulates the editing operations of the Grid when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-incell-directive)).
 */
@Directive({
    selector: '[kendoGridCustomInCellEditing]'
})
export class CustomInCellEditingDirective extends EditingDirectiveBase {

    /**
     * The function that creates the `FormGroup` for the edited model.
     */
    /* tslint:disable-next-line:no-input-rename */
    @Input('kendoGridCustomInCellEditing')
    public createFormGroup: (args: CreateFormGroupArgs) => FormGroup;

    constructor(protected grid: GridComponent, protected localDataChangesService: LocalDataChangesService) {
        super(grid, localDataChangesService);
    }

    // Need mixin
    protected createModel(args: any): any {
        return this.createFormGroup(args);
    }

    protected saveModel({dataItem, formGroup, isNew}: any): any {
        console.log('saveModel', dataItem, isNew);
        if (!formGroup.dirty && !isNew) {
            return;
        }

        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);

            return dataItem;
        }

        this.markAllAsTouched(formGroup);
    }

    /**
     * @hidden
     */
    public ngOnInit(): void {
        super.ngOnInit();

        this.subscriptions.add(this.grid.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.grid.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }

    protected removeHandler(args: any): void {
        super.removeHandler(args);

        this.grid.cancelCell();
    }

    protected cellClickHandler(args: any): void {
        console.log('In cellClickHandler::isEditedRow:', args.isEditedRow, ' isEdited:', args.isEdited);
        console.log('In cellClickHandler::isEdited zajedno:', args.isEditedRow || !!args.isEdited);
        if (!(args.isEditedRow || !!args.isEdited)  && args.type !== 'contextmenu') {
            this.grid.editCell(args.rowIndex, args.columnIndex, this.createFormGroup(args));
        }
    }

    protected cellCloseHandler(args: any): void {
        const {formGroup, dataItem} = args;

        if (!formGroup.valid) {
            args.preventDefault();
        } else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    }

    markAllAsTouched(control: AbstractControl): void {
        control.markAsTouched();
        if (control.hasOwnProperty('controls')) {
            let controls = (control as any).controls;
            for (let inner in controls) {
                if (controls.hasOwnProperty(inner)) {
                    this.markAllAsTouched(controls[inner]);
                }
            }
        }
    }
}
