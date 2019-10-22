# NgbInput

Extension no official from `@ng-bootstrap/ng-bootstrap` to generate inputs with
validators. **!Warning!** You should will not use this library in a release
enviroment because this is an experimental version and this may be contains some
bugs than have not been fixed.

## Example to use

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
