"use strict";
//Перехід між табами
function initTabs () {
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
        }
        else if (event.target === tabSwitchButton1) {
            firstTabClasses.remove("disabled");
            secondTabClasses.add("disabled");
        }
    };
    tabSwitchButton1.addEventListener("click", switchBetweenTabs);
    tabSwitchButton2.addEventListener("click", switchBetweenTabs);
};
//розрахунок періоду між датами
function durationBetweenDates (startDate, endDate, dimension, daysOption) {
    let startDateTime = new Date(startDate);
    let endDateTime = new Date(endDate);
    let periodDuration;
    
    switch (dimension) {
    case "days":
        periodDuration = 1
        break;
    case "hours":
        periodDuration = 24;
        break;
    case "minutes":
        periodDuration = 24 * 60;
        break;
    case "seconds":
        periodDuration = 24 * 60 * 60;
        break;
    default:
        return "Invalid dimension. Please choose from the list.";
    }

    let differenceInDays = 0;
    switch (daysOption) {
        case "allDays":
            differenceInDays = Math.floor(Math.abs(endDateTime - startDateTime) / (24 * 60 * 60 * 1000));
            break;
        case "workingDays":
            for (let c = new Date(startDate); c < endDateTime; c.setDate(c.getDate() + 1)) {
                let isWeekend = c.getDay() === 6 || c.getDay() === 0;
                if (isWeekend === false) {
                    differenceInDays++;
                }
            };
            break;
        case "weekends":
            for (let c = new Date(startDate); c < endDateTime; c.setDate(c.getDate() + 1)) {
                let isWeekend = c.getDay() === 6 || c.getDay() === 0;
                if (isWeekend === true) {
                    differenceInDays++;
                }
            };
            break;
    }
    
    let periodAmount = differenceInDays * periodDuration;

    return `${periodAmount} ${dimension}`;
};

function runDateCalculting () {
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
    startDateInput.addEventListener("change", enableEndDateInput);
    enableEndDateInput();
    endDateInput.addEventListener("change", () => startDateInput.max = endDateInput.value);

    //Прессет періоду тиждень/місяць
    function chooseDatePeriod (event) {
        const dateValue = new Date(startDateInput.value);   
        if (event.target === weekPeriodButton) {
            dateValue.setDate(dateValue.getDate() + 7);
        }
        if (event.target === monthPeriodButton) {
            dateValue.setDate(dateValue.getDate() + 30);
        }
        endDateInput.valueAsDate = dateValue;
        
    }
    weekPeriodButton.addEventListener("click", chooseDatePeriod);
    monthPeriodButton.addEventListener("click", chooseDatePeriod);

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

        addToTable(record);

        console.log(startDateValue, endDateValue, periodOptionValue, result);
    }

    dateForm.addEventListener("submit", calculateTime);
}


let datesHistory = JSON.parse(localStorage.getItem("datesHistory")) || []; 

function addRecordToStorage (record) {
    datesHistory.push(record);
    datesHistory.length > 10 && datesHistory.shift();
    localStorage.setItem("datesHistory", JSON.stringify(datesHistory));
}

function addToTable (record) {
    let tableBody = document.getElementById("historyTableData");
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


    tableBody.children.length > 10 && tableBody.firstElementChild.remove();
};

function runApp () {
    datesHistory.forEach(addToTable);
    runDateCalculting();
    initTabs();
    initHolidayTab();
}
document.addEventListener("DOMContentLoaded", runApp);

const API_URL = "https://calendarific.com/api/v2/";
const API_KEY = "pSAlqM4GMzkfE7RyfpUukFAaFhgjLFHJ";
async function loadCountries() {
    const response = await fetch(API_URL + "countries" + "?api_key=" + API_KEY);
    const countries = await response.json();
    console.log(countries);
    return countries.response.countries;
}
async function loadHolidays(country, year) {
    const response = await fetch(
        API_URL+"holidays" + "?api_key=" + API_KEY +
        "&country=" + country + "&year=" + year
    );
    const holidays = await response.json();
    console.log(holidays);
    return holidays.response.holidays;
}

function initHolidayTab () {
    const countriesList = document.getElementById("countriesList");
    const yearsList = document.getElementById("yearsList");
    let holidaysTable = document.querySelector(".holiday-list_table");
    let tableBody = document.querySelector(".holiday-list_table-body");
    let dateSort = document.querySelector(".holiday-list_date-sort");
    let isSortingDown = false;
   
    async function createCountryList() {
        let countries = await loadCountries();  
        countries.forEach((country) => {
            let countryOption = document.createElement("option");
            countryOption.textContent = country.country_name;
            countryOption.value = country["iso-3166"];
            countriesList.append(countryOption);
        })
    }

    function createYearList() {
        const currentYear = (new Date).getFullYear();
        for (let year = 2001; year < 2050; year ++) {
            let yearOption = document.createElement("option");
            yearOption.textContent = year;
            yearOption.value = year;
            yearsList.append(yearOption);
        }
        yearsList.value = currentYear;
    }
    
    async function renderHolidayList() {
        let selectedCountry = countriesList.value; 
        let selectedYear = yearsList.value;
        if(!selectedCountry || !selectedYear) {
            return;
        }
        while(tableBody.firstElementChild) {
            tableBody.firstElementChild.remove();
         }
        let holidays= await loadHolidays(selectedCountry, selectedYear);
        holidays = holidays.map((holiday) => ({
            name: holiday.name,
            iso: holiday.date.iso.slice(0, 10),
        }))

        holidays.sort(sortByProperty("iso", isSortingDown));
        console.log(holidays);
        holidays.forEach((holiday) => {
            let newRow = document.createElement("tr");
            tableBody.append(newRow);
        
            let cell = document.createElement("td");
            newRow.append(cell);
            cell.innerText = holiday.iso;
        
            cell = document.createElement("td");
            newRow.append(cell);
            cell.innerText = holiday.name;
        });
        holidaysTable.classList.remove("disabled"); 
    };

    function toggleDateSort () {
        isSortingDown = !isSortingDown;
        dateSort.classList.toggle("sorting-down", isSortingDown);

        renderHolidayList();
    }

    createYearList();
    createCountryList();
    renderHolidayList();
    toggleDateSort();

    countriesList.addEventListener("change", renderHolidayList);
    yearsList.addEventListener("change", renderHolidayList);
    dateSort.addEventListener("click", toggleDateSort);
}

function sortByProperty(property, direction) {
    if (direction) {
        return (a, b) => {
            return a[property] > b[property] ? 1 : -1;
          };
    } else {
        return (a, b) => {
            return a[property] < b[property] ? 1 : -1;
          };
    }
}