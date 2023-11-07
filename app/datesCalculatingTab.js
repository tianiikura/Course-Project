import {datesHistory, addRecordToStorage} from "./datesHistoryStorage.js";
import { addMonth, addWeek, durationBetweenDates } from "./dateUtils.js";

export function runDateCalculting () {
    const dateForm = document.getElementById("chooseDateform");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const daysOptionInput = document.getElementById("daysOption");
    const periodOptionInput = document.getElementById("periodOption");
    const actualResultContainer = document.getElementById("actualResult");
    const weekPeriodButton = document.getElementById("weekPeriod");
    const monthPeriodButton = document.getElementById("monthPeriod");

    //Виставленн дати не раніше початкової і не пізніше кінцевої
    const enableEndDateInput = function () {
        endDateInput.disabled = startDateInput.value === "" ? true : false;
        endDateInput.min = startDateInput.value;
    }
    
    //Прессет періоду тиждень/місяць
    function chooseDatePeriod (event) {
        const dateValue = new Date(startDateInput.value);   
        if (event.target === weekPeriodButton) {
            addWeek(dateValue);
        }
        if (event.target === monthPeriodButton) {
            addMonth(dateValue);
        }
        endDateInput.valueAsDate = dateValue;
        
    }

    const calculateTime = function (event) {
        event.preventDefault();
        const startDateValue = startDateInput.value;
        const endDateValue = endDateInput.value;
        const periodOptionValue = periodOptionInput.value;
        const daysOptionValue = daysOptionInput.value;

        const result = durationBetweenDates(startDateValue, endDateValue, periodOptionValue, daysOptionValue);
        
        actualResultContainer.innerText = result;

        const record = {
            startDate: startDateValue,
            endDate: endDateValue,
            result: result,
        };

        addRecordToStorage(record);
        renderTable();
    }

    weekPeriodButton.addEventListener("click", chooseDatePeriod);
    monthPeriodButton.addEventListener("click", chooseDatePeriod);
    startDateInput.addEventListener("change", enableEndDateInput);
    endDateInput.addEventListener("change", () => startDateInput.max = endDateInput.value);
    dateForm.addEventListener("submit", calculateTime);
    
    enableEndDateInput();
    renderTable();
}

function renderTable () {
    let tableBody = document.getElementById("historyTableData"); 
    while(tableBody.firstElementChild) {
        tableBody.firstElementChild.remove();
    }
    datesHistory.forEach((record) => {
        let newRow = document.createElement("tr");
        tableBody.append(newRow);

        let cell = document.createElement("td");
        newRow.append(cell);
        cell.innerText = record.startDate;

        cell = document.createElement("td");
        newRow.append(cell);
        cell.innerText = record.endDate;
        
        cell = document.createElement("td");
        newRow.append(cell);
        cell.innerText = record.result;
    });   
};