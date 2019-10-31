import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {GridModule, SharedModule} from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import {DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {CustomInCellEditingDirective} from "./custom-incell-editing.directive";


@NgModule({
    declarations: [
        AppComponent,
        CustomInCellEditingDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        GridModule,
        SharedModule,
        DropDownListModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

