import RX from "rxjs";

let button = document.querySelector("button");
RX.observable.fromEvemt(button, "click").subscribe(() => console.log(111));
