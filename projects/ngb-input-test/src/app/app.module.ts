import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbInputModule } from './../../../ngb-input/src/lib/ngb-input.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { InputExamplesComponent } from './components/input-exaxmples/input-examples.component';
import { FileExamplesComponent } from './components/file-examples/file-examples.component';

@NgModule({
    declarations: [
        AppComponent,
        InputExamplesComponent,
        FileExamplesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
