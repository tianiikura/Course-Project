import {loadCountries, loadHolidays} from "./api.js";
import {showAlert} from "./alert.js";
import {sortByProperty} from "./utils.js";

const INITIAL_START_YEAR = 2001;
const INITIAL_END_YEAR = 2050;


let isHolidayTabPrepared = false;
export function initHolidayTab () {
    if (isHolidayTabPrepared === true) {
        return;
    }; 

    isHolidayTabPrepared = true;
    const countriesList = document.getElementById("countriesList");
    const yearsList = document.getElementById("yearsList");
    let holidaysTable = document.querySelector(".holiday-list_table");
    let tableBody = document.querySelector(".holiday-list_table-body");
    let dateSort = document.querySelector(".holiday-list_date-sort");
    let isSortingDown = false;
   
    async function createCountryList() {
        try {
            let countries = await loadCountries();  
            countries.forEach((country) => {
                let countryOption = document.createElement("option");
                countryOption.textContent = country.country_name;
                countryOption.value = country["iso-3166"];
                countriesList.append(countryOption);
            });
        } catch(error) {
            showAlert("Error! Smth get wrong with request");
        }
    }

    function createYearList() {
        const currentYear = (new Date).getFullYear();
        for (let year = INITIAL_START_YEAR; year < INITIAL_END_YEAR; year ++) {
            let yearOption = document.createElement("option");
            yearOption.textContent = year;
            yearOption.value = year;
            yearsList.append(yearOption);
        }
        yearsList.value = currentYear;
    }
    
    async function renderHolidayTable() {
        try{
            let selectedCountry = countriesList.value; 
            let selectedYear = yearsList.value;
            if(!selectedCountry || !selectedYear) {
                return;
            }
            let holidays= await loadHolidays(selectedCountry, selectedYear);
            while(tableBody.firstElementChild) {
                tableBody.firstElementChild.remove();
            }
            
            holidays = holidays.map((holiday) => ({
                name: holiday.name,
                iso: holiday.date.iso.slice(0, 10),
            }))

            holidays.sort(sortByProperty("iso", isSortingDown));
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
        } catch(error) {
            holidaysTable.classList.add("disabled");
            showAlert("Error! Smth get wrong with request");
        };
    };

    function toggleDateSort () {
        isSortingDown = !isSortingDown;
        dateSort.classList.toggle("sorting-down", isSortingDown);

        renderHolidayTable();
    }

    createYearList();
    createCountryList();
    renderHolidayTable();
    toggleDateSort();

    countriesList.addEventListener("change", renderHolidayTable);
    yearsList.addEventListener("change", renderHolidayTable);
    dateSort.addEventListener("click", toggleDateSort);

}