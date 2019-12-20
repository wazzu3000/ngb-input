import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { InputExamplesComponent } from './components/input-examples/input-examples.component';
import { FileExamplesComponent } from './components/file-examples/file-examples.component';
import { DropdownExamplesComponent } from './components/dropdown-examples/dropdown-examples.component'

const routes: Routes = [
    {
        component: IndexComponent,
        path: ''
    },
    {
        component: InputExamplesComponent,
        path: 'input-examples'
    },
    {
        component: FileExamplesComponent,
        path: 'file-examples'
    },
    {
        component: DropdownExamplesComponent,
        path: 'dropdown-examples'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
