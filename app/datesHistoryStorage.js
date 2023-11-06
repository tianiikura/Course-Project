"use strict";

const STORAGE_KEY = "datesHistory";
const STORAGE_LIMIT = 10;

export const datesHistory = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 

export function addRecordToStorage (record) {
    datesHistory.push(record);
    datesHistory.length > STORAGE_LIMIT && datesHistory.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datesHistory));
}
