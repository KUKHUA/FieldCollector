import Collector from "./dist/bundle.js";

window.collector = new Collector();

document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");
    const button = document.getElementById("jsonbtn");
    button.addEventListener("click",() => {
        textarea.value = JSON.stringify(window.collector.json("theDiv"));
    })
});
