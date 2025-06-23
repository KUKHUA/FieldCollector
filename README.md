# FieldCollector
A pluggable JavaScript library for collecting and processing data from form elements on a web page.

**This project is a work in progress.**
Not all planned handlers are complete, expect changes and bugs.

## Overview
**FieldCollector** allows you to define handlers for HTML elements and search through a parent HTML element to provide helpful functions or serialize them. Each handler determines what it provides for each element, and defines how to extract its data.

## Usage
For example,

```javascript

import Collector from "/FieldCollector/Collector.js";
//const myList = new HandlerList();
//myList.addHandler(HTMLInputElement, "input", inputHandlers.ButtonHandler);
//myList.addHandler(HTMLInputElement, `input[type="color"]`, inputHandlers.ColorHandler);

//pass myList to collector if you want
const collector = new Collector();

const data = collector.json("myForm");
console.log(data);

```

could result in the following:
```json
{
    "text":"fddfsgfsdsd",
    "password":"gffdgdfg",
    "checkbox":true,
    "color":"#000000",
    "date":"2025-06-13T00:00:00.000Z",
    "datetime-local":"2025-06-20T01:33:00.000Z"
}
```
*All the keys are from the id of the originating element.*

## Default Handlers
The default Handlers include:
### Input
* text
* password
* email
* hidden
* checkbox
* color
* date
* datetime-local
* file
* number
* radio
* range
* time

More handlers are planned and can be added manually.

## API
### `Collector`
Creates an instance of the processer. If no `HandlerList` is provided, a defualt one will be created.

#### `.search(htmlElement)`
Returns a JavaScript object where each key is the id of a element.

Each value will be:
* A handler result with helpful functions (for example: `enable()`, `disable()`, `focus()`, etc.), and a `.element` property of the HTML element.
* Or, if no handler is acceptable, it will be the HTML element itself.

This makes `.search` useful as a poteinal altertive to `document.getElementById()`:
```javascript
    const results = collector.search("myForm");
    results.username.element.value = "new value";
```

#### `.json(htmlElement)`
Returns a plain object with serilaized data. Each value is defined by the handler's `JSONProcess()` function. Note that if no handler is found for a element, with `.json()`, it will not be included.

### `HandlerList`
The HandlerList class registers and manages the handlers used by `Collector`. 
Each handler has the following fields:
* An element type (Like `HTMLInputElement`).
* A CSS selector (for querying DOM)
* A handler class/object
* An optional priority value (lower = hiher, no negatives)
* 
#### .addHandler(elementType, tagName, handler, priority = 0)
Registers a handler.
* `elementType`: Constructor of the HTML element (e.g. `HTMLInputElement`)
* `tagName`: A CSS selector (e.g. `input[type="text"]`)
* `handler`: An object or class with `shouldProcess`, `process`, and `JSONProcess` methods
* `priority`: Optional. Defaults to 0. Lower priority values are preferred when multiple handlers match.

#### .findHandlerFor(htmlElement)
Returns the best handler for the given HTML element. Returns `null` if nothing is found.

#### .getQuerySelector()
Returns a comma-seperated selector. This combines all of the ones given in `.addHandler`

### Handlers
Handlers must implement the following methods:

#### `shouldProcess(htmlElement)`
Returtns true if the handler is for the given element. (like `return htmlElement.type === "color";`)

#### `process(htmlElement)`
Returns a JSON object that can include helpful functions and a refrence to the HTML elemnt. This will show up in `.search()` results.
Example: 
```javascript
return {
    "disable": () => htmlElement.disabled = true,
    "enable": () => htmlElement.disabled = false,
    "focus": () => htmlElement.focus(),
    "blur": () => htmlElement.blur(),
    "isChecked": () => htmlElement.checked,
    "toggleChecked": () => htmlElement.checked = !htmlElement.checked,
    "setChecked": () => htmlElement.checked = true,
    "setUnchecked": () => htmlElement.checked = false,
    "onChange": (callback) => htmlElement.addEventListener("change", (event) => {
        callback(event);
    }),
    "element": htmlElement,
    };
```

#### `JSONProcess(htmlElement)`
Returns a serializable value (usually a primitive or plain object) that shows up in `.json()` results