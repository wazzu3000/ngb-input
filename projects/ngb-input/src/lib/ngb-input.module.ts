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

export type DefaultMessages = {
    errors: {
        ngbInput?: {
            required?: string;
            invalidFormat?: string;
        },
        ngbFile?: {
            required?: string;
            invalidType?: string;
            maxSizeExceeded?: string;
        }
        ngbDropDown?: {
            required?: string;
        }
    },
    information: {
        ngbDropDown?: {
            empty?: string,
            placeholder?: string
        },
        ngbFile?: {
            placeholder?: string;
            drop?: string;
        }
    }
}

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
export class NgbInputModule {
    public static initializeApp(defaultmessages: DefaultMessages) {
        NgbInputComponent.init(defaultmessages.errors.ngbInput || {});
        NgbDropdownDomponent.init(defaultmessages.errors.ngbDropDown || {}, defaultmessages.information.ngbDropDown || {});
        NgbFileComponent.init(defaultmessages.errors.ngbFile || {}, defaultmessages.information.ngbFile || {});

        return {
            ngModule: NgbInputModule,
        }
    }
}