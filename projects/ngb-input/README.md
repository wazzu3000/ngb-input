# NgbInput

Extension no official from `@ng-bootstrap/ng-bootstrap` to generate inputs with
validators. **!Warning!** You should will not use this library in a release
enviroment because this is an alpha version and this may be contains some bugs
than have not been fixed.

## Installation

You must be install **ng-bootstrap** before of start to install it, you shall
check the steps to install **ng-bootstrap** in the follow [link](https://ng-bootstrap.github.io/#/getting-started)

Once installed you need run the next command to install via npm

```bash
npm i ngb-input --save
```

On finish the installation, you need import the main module

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
<ngb-input type="text" id="foo" name="foo" [(ngModel)]="foo" label="Some field" [required]="true" ...></ngb-input>
```

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
<ngb-file id="foo" name="foo" accept="image/*" label="Upload your photo" [(ngModel)]="foo"></ngb-file>
```

The attributes support are:

| Attribute             | Type      | Default               | Description                           |
|-----------------------|-----------|-----------------------|---------------------------------------|
| id                    | string    | ''                                | The HTML id for the element
| name                  | string    | ''                                | The HTML name for the element
| accept                | string    | ''                                | The file types accepted, this works like HTML input accept attribute
| multiple              | boolean   | false                             | Enable the possibility of select many files
| label                 | string    | ''                                | Label that sepecifics the type of file to upload
| placeholder           | string    | ''                                | Default text to show in the button before to select a file
| disabled              | boolean   | false                             | Enabled or disabled this component
| height                | string    | '200px'                           | Set the height using the css syntax
| width                 | string    | '200px'                           | Set the width using the css syntax
| requiredError         | string    | 'Required'                        | Message to show when the field is required and this haven't any file selected
| ~~invalidTypeError~~  | string    | ''                                |
| maxSizeExceededError  | string    | 'A file exceeds the limit size'   | Message to show when a file exceeds the size limit
| dirty                 | boolean   | false                             | Set the input as touched and show an error if apply
| filesUploadedChange   | Event     | -------                           | Event fired when the file selected is updated

### Todo

Finish documentation and examples
