"use strict";
import {runDateCalculting} from "./datesCalculating.js";
import {initTabs} from "./tabs.js";

function runApp () {
    runDateCalculting();
    initTabs();
}
document.addEventListener("DOMContentLoaded", runApp);

