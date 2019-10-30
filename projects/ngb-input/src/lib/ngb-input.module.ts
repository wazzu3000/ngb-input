import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbInputComponent } from './components/ngb-input/ngb-input.component';
import { NgbSearchComponent } from './components/ngb-search/ngb-search.component';
import { NgbFileComponent } from './components/ngb-file/ngb-file.component';
import { NgbDropdownDomponent } from './components/ngb-dropdown/ngb-dropdown.component';

import { FileDropDirective } from './directives/file-drop.directive';
import { NgbInputDirective } from './directives/ngb-input.directive';

@NgModule({
    imports: [
        NgbDropdownModule,
        NgbTypeaheadModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        NgbInputComponent,
        NgbSearchComponent,
        NgbFileComponent,
        NgbDropdownDomponent,
        FileDropDirective,
        NgbInputDirective
    ],
    exports: [
        NgbDropdownModule,
        NgbTypeaheadModule,
        FormsModule,
        NgbInputComponent,
        NgbSearchComponent,
        NgbFileComponent,
        NgbDropdownDomponent,
        NgbInputDirective
    ]
})
export class NgbInputModule { }