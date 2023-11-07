import { runDateCalculting } from "./datesCalculatingTab.js";
import {initHolidayTab} from "./holidayTab.js";

export function initTabs () {
    let calculationDateTabButton = document.querySelector(".tab1");
    let holidaysTabButton = document.querySelector(".tab2");
    let calculationDateTab = document.querySelector(".first-tab");
    let holidaysTab = document.querySelector(".second-tab");

    function switchBetweenTabs (event) {
        if (event.currentTarget === holidaysTabButton) {
            holidaysTabButton.classList.add("active");
            holidaysTab.classList.remove("disabled");
            calculationDateTab.classList.add("disabled");
            calculationDateTabButton.classList.remove("active");
            initHolidayTab();
        }
        else if (event.currentTarget === calculationDateTabButton) {
            calculationDateTabButton.classList.add("active");
            calculationDateTab.classList.remove("disabled");
            holidaysTab.classList.add("disabled");
            holidaysTabButton.classList.remove("active");
        }
    };
    calculationDateTabButton.addEventListener("click", switchBetweenTabs);
    holidaysTabButton.addEventListener("click", switchBetweenTabs);

    runDateCalculting();
};