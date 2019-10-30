import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputExamplesComponent } from './components/input-exaxmples/input-examples.component';
import { FileExamplesComponent } from './components/file-examples/file-examples.component';

const routes: Routes = [
    {
        component: InputExamplesComponent,
        path: 'input-examples'
    },
    {
        component: FileExamplesComponent,
        path: 'file-examples'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
