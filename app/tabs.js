"use strict";
import {initHolidayTab} from "./holidayTab.js";

export function initTabs () {
    let tabSwitchButton1 = document.querySelector(".tab1");
    let tabSwitchButton2 = document.querySelector(".tab2");
    let firstTab = document.querySelector(".first-tab");
    let secondTab = document.querySelector(".second-tab");
    let firstTabClasses = firstTab.classList;
    let secondTabClasses = secondTab.classList;

    function switchBetweenTabs (event) {
        if (event.target === tabSwitchButton2) {
            secondTabClasses.remove("disabled");
            firstTabClasses.add("disabled");
            initHolidayTab();
        }
        else if (event.target === tabSwitchButton1) {
            firstTabClasses.remove("disabled");
            secondTabClasses.add("disabled");
        }
    };
    tabSwitchButton1.addEventListener("click", switchBetweenTabs);
    tabSwitchButton2.addEventListener("click", switchBetweenTabs);
};