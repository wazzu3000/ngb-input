# NgbInput

Extension no official from `@ng-bootstrap/ng-bootstrap` to generate inputs with
validators. **!Warning!** You should will not use this library in a release
enviroment because this is an alpha version and this may be contains some bugs
than have not been fixed.

| Index                                             |
|---------------------------------------------------|
| [1. NgbInputComponent](##NgbInputComponent)       |
| [2. NgbFileComponent](##NgbFileComponent)         |
| [3. NgbDropDownComponent](##NgbDropDownComponent) |

## Installation

You must be install **ng-bootstrap** before to start to install it, you shall
check the steps to install **ng-bootstrap** in the follow [link.](https://ng-bootstrap.github.io/#/getting-started)

Once installed you need run the next command to install it via npm.

```bash
npm i ngb-input --save
```

On finish the installation, you need import in the main module.

```typescript
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbInputModule } from 'ngb-input';

@NgModule({
    ...
    imports: [
        ...
        NgbModule,
        NgbInputModule
        ...
    ]
    ...
})
export class AppModule { }
```

Additional, you can add your custom default error and informative messages with
the follow code

```typescript
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbInputModule } from 'ngb-input';

@NgModule({
    ...
    imports: [
        ...
        NgbModule,
        NgbInputModule.initializeApp(options)
        ...
    ]
    ...
})
export class AppModule { }
```

## NgbInputComponent

### Example to use

The main idea to use this is like a html input, but with some new attributes to
help you to write forms easier. Example:

```html
<ngb-input type="text" id="foo" name="foo" [(ngModel)]="foo" label="Text required" [required]="true" ...></ngb-input>
```

![alt text](https://github.com/wazzu3000/ngb-input/blob/master/screenshots/ngb-input.png?raw=true "Basic input required")

> The error message is showed only when the input lost the focus and this is empty

The new attributes add are:

| Attribute             | Type      | Default                   | Description                           |
|-----------------------|-----------|---------------------------|---------------------------------------|
| label                 | string    | ''                        | Label that sepecifics the type of information require
| debounce              | number    | 0                         | Added a time out to update the model
| requiredError         | string    | 'This field is required'  | Message to show when the field is required and this haven't any value
| formatError           | string    | 'Invalid input data'      | Message to show when the field's value doesn't mach with the pattern
| manuallyHandleErrors  | boolean   | false                     |
| showRequiredError     | boolean   | false                     |
| showFormatError       | boolean   | false                     |
| dirty                 | boolean   | false                     | Set the input as touched and show an error if apply

## NgbFileComponent

Components that works like ```<input type="file">``` with validators, label and
drag & drop functions.

To use this component, you can write a code similar to these

```html
<ngb-file id="foo" name="foo" accept="image/*" label="Profile picture" placeholcer="Select a picture" [(ngModel)]="foo"></ngb-file>
```

You can add your custom html code into the tag to update the information to show
in the component. Example:

```html
<ngb-file id="foo" name="foo" accept="image/*" label="Profile picture" [(ngModel)]="foo" (ngModelChange)="drawImage($event)">
    <img *ngIf="imageSrc; else message" [src]="imageSrc" style="width: 100%; height: auto;" />
    <ng-template #message>
        Select a picture
    </ng-template>
</ngb-file>
```

```typescript
@Component({
    selector: 'foo',
    templateUrl: 'foo.html'
})
export class YourComponent() {
    public imageSrc = '';

    public drawImage(files: FileList) {
        if (files.length == 0) {
            this.imageSrc = '';
            return;
        }

        let reader = new FileReader();
        let self = this;
        reader.readAsDataURL(files[0]);
        reader.onloadend = evt => self.imageSrc = (evt.target.result as string);
    }
}
```

![alt text](https://github.com/wazzu3000/ngb-input/blob/master/screenshots/ngb-file.png?raw=true "File input with drop down")
![alt text](https://github.com/wazzu3000/ngb-input/blob/master/screenshots/ngb-file2.png?raw=true "Drawn image")

The attributes supported are:

| Attribute             | Type      | Default                           | Description                           |
|-----------------------|-----------|-----------------------------------|---------------------------------------|
| id                    | string    | ''                                | The HTML id for the element
| name                  | string    | ''                                | The HTML name for the element
| required              | boolean   | false                             | Set this field as required
| disabled              | boolean   | false                             | Enabled or disabled this field
| ngModel               | FileList  | null                              | The model for the element
| accept                | string    | ''                                | The file types accepted, this works like HTML input accept attribute
| multiple              | boolean   | false                             | Enable the possibility of select many files
| label                 | string    | ''                                | Label that sepecifics the type of file to upload
| placeholder           | string    | ''                                | Default text to show in the button before to select a file
| height                | string    | '200px'                           | Set the height using the css syntax
| width                 | string    | '200px'                           | Set the width using the css syntax
| requiredError         | string    | 'Required'                        | Message to show when the field is required and this haven't any file selected
| ~~invalidTypeError~~  | string    | ''                                |
| maxSizeExceededError  | string    | 'A file exceeds the limit size'   | Message to show when a file exceeds the size limit
| dirty                 | boolean   | false                             | Set the input as touched and show an error if apply
| filesUploadedChange   | Event     | -------                           | Event fired when the file selected is updated

## NgbDropDownComponent

Component that works like ```<select>```, added support to single or multi
select. This component can work with array of strings and array of objects.
Example:

```html
<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test2" name="test2" [(ngModel)]="test2" [options]="optionsBasic"></ngb-dropdown>
        {{ test2 }}
    </div>
</div>

<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test3" name="test3" [(ngModel)]="test3" [options]="optionsComplex" optionLabel="label"></ngb-dropdown>
        {{ test3 | json }}
    </div>
</div>

<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test4" name="test4" [(ngModel)]="test4" [options]="optionsComplex" optionLabel="label" optionValue="value"></ngb-dropdown>
        {{ test4 }}
    </div>
</div>

<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test5" name="test5" [(ngModel)]="test5" [options]="optionsBasic" [multiple]="true"></ngb-dropdown>
        {{ test5 | json }}
    </div>
</div>

<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test6" name="test6" [(ngModel)]="test6" [options]="optionsComplex" optionLabel="label" [multiple]="true"></ngb-dropdown>
        {{ test6 | json }}
    </div>
</div>

<div class="card">
    <div class="card-body">
        <ngb-dropdown id="test7" name="test7" [(ngModel)]="test7" [options]="optionsComplex" optionLabel="label" optionValue="value" [multiple]="true"></ngb-dropdown>
        {{ test7 | json }}
    </div>
</div>
```

```typescript
@Component({
    selector: 'foo',
    templateUrl: 'foo.html'
})
export class YourComponent() {
    public test2: any;
    public test3: any;
    public test4: any;
    public test5: any;
    public test6: any;
    public test7: any;
    public optionsBasic = [1, 2, 3, 4, 5];
    public optionsComplex = [
        {
            value: '1',
            label: 'One'
        },
        {
            value: '2',
            label: 'Two'
        },
        {
            value: '3',
            label: 'Three'
        },
        {
            value: '4',
            label: 'Four'
        }
    ]
}
```

![alt text](https://github.com/wazzu3000/ngb-input/blob/master/screenshots/ngb-dropdown.png?raw=true "Some examples with dropdown")

The attributes supported are:

| Attribute     | Type      | Default                   | Description
|---------------|-----------|---------------------------|----------
| id            | string    | ''                        | The HTML id for the element
| name          | string    | ''                        | The HTML name for the element
| required      | boolean   | false                     | Set this field as required
| disabled      | boolean   | false                     | Enabled or disabled this field
| label         | string    | ''                        | Label that sepecifics the type of option to select
| placeholder   | string    | ''                        | Default text to show in the dropdown before to select
| multiple      | boolean   | false                     | Define if the drop down will be single or multiple option
| optionLabel   | string    | ''                        | Define the attribute name to use to print the option label (used only for array of objects)
| optionValue   | string    | ''                        | Define the attribute name to use to set the ngModel value (used only for array of objects)
| requiredError | string    | 'This field is required'  | Message to show when the field is required and this haven't any option selected
| dirty         | boolean   | false                     | Set the input as touched and show an error if apply
| ngModel       | any       | null                      | The selected option*
| options       | any[]     | null                      | Array to populate the dropdown

*When you select an option, the ngModel is setted with the element selected, if
you use an object array and you set a value in the optionValue, the ngModel is
setted with the value of the attribute from the object selected.

### Todo

Finish documentation and examples
