import Collector from "/FieldCollector/Collecter.js";

const eventSource = new EventSource("http://127.0.0.1:1337");
eventSource.onmessage = function (event) {
    window.location.reload();
};

window.collector = new Collector();

document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");
    const button = document.getElementById("jsonbtn");
    button.addEventListener("click",() => {
        textarea.value = JSON.stringify(window.collector.json("theDiv"));
    })
});
