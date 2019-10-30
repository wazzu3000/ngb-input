# NgbInput

Extension no official from `@ng-bootstrap/ng-bootstrap` to generate inputs with
validators. **!Warning!** You should will not use this library in a release
enviroment because this is an experimental version and this may be contains some
bugs than have not been fixed.

## NgbInputComponent

### Example to use

The main idea to use this is like a html input, but with some new attributes to
help you to write forms easier. Example:

```html
<ngb-input type="text" id="foo" name="foo" [(ngModel)]="foo" label="Some field" [required]="true" ...></ngb-input>
```

The new attributes add are:

| Attribute             | Type      | Default               | Description                           |
|-----------------------|-----------|-----------------------|---------------------------------------|
| label                 | string    | ''                    | Label that sepecifics the type of information require
| debounce              | number    | 0                     | Added a time out to update the model
| requiredError         | string    | 'Campo requerido'     | Message to show when the field is required and this haven't any value
| formattError          | string    | 'Formato invalido'    | Message to show when the field's value doesn't mach with the pattern
| manuallyHandleErrors  | boolean   | false                 |
| showRequiredError     | boolean   | false                 |
| showFormattError      | boolean   | false                 |
| dirty                 | boolean   | false                 | Set the input as touched and show an error if apply

## NgbFileComponent

Components that works like ```<input type="file">``` with validators, label and
drag & drop functions.

The new attributes support are:

| Attribute             | Type      | Default               | Description                           |
|-----------------------|-----------|-----------------------|---------------------------------------|
| id                    | string    | ''                    | The HTML id for the element
| name                  | string    | ''                    | The HTML name for the element
| accept                | string    | ''                    | The file types accepted, this works like HTML input accept attribute
| multiple              | boolean   | false                 | Enable the possibility of select many files
| label                 | string    | ''                    | Label that sepecifics the type of file to upload
| disabled              | boolean   | false                 | Enabled or disabled this component
| height                | string    | '200px'               | Set the height using the css syntax
| width                 | string    | '200px'               | Set the width using the css syntax
| requiredError         | string    | 'Campo requerido'     | Message to show when the field is required and this haven't any file selected
| dirty                 | boolean   | false                 | Set the input as touched and show an error if apply
| filesUploadedChange   | Event     | -------               | Event fired when the file selected is updated
