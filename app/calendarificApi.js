"use strict";

const API_URL = "https://calendarific.com/api/v2/";
const API_KEY = "pSAlqM4GMzkfE7RyfpUukFAaFhgjLFHJ";

export async function loadCountries() {
    const response = await fetch(`${API_URL}countries?api_key=${API_KEY}`);
    const countries = await response.json();
    if (!Array.isArray(countries.response.countries)) {
        throw new Error("Countries is not array");  
    };
    return countries.response.countries;
}
export async function loadHolidays(country, year) {
    const response = await fetch(
        `${API_URL}holidays?api_key=${API_KEY}&country=${country}&year=${year}`
    );
    const holidays = await response.json();
    if (!Array.isArray(holidays.response.holidays)) {
        throw new Error("Holidays is not array");  
    };
    return holidays.response.holidays;
}
