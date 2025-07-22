# FieldCollector
Converts common form elements inside a div all to json.

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

If you want to learn how to make a custom handler, look at one of the defualt ones [here](https://github.com/KUKHUA/FieldCollector/tree/main/FieldCollector/handlers/input).