"use strict";
import {runDateCalculting} from "./datesCalculatingTab.js";
import {initTabs} from "./tabs.js";

function runApp () {
    runDateCalculting();
    initTabs();
}
document.addEventListener("DOMContentLoaded", runApp);

