import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbInputModule } from './../../../ngb-input/src/lib/ngb-input.module';
import { AppRoutingModule } from './app-routing.module';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppComponent } from './components/app/app.component';
import { IndexComponent } from './components/index/index.component';
import { InputExamplesComponent } from './components/input-examples/input-examples.component';
import { FileExamplesComponent } from './components/file-examples/file-examples.component';
import { DropdownExamplesComponent } from './components/dropdown-examples/dropdown-examples.component'

import { ButtonShowCodeDirective } from './directives/button-show-code.directive';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InputExamplesComponent,
        FileExamplesComponent,
        DropdownExamplesComponent,
        ButtonShowCodeDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HighlightModule,
        NgbInputModule
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: function () {
                    return {
                        typescript: () => import('highlight.js/lib/languages/typescript'),
                        xml: () => import('highlight.js/lib/languages/xml')
                    };
                }
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
