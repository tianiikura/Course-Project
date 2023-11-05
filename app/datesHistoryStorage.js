"use strict";

export const datesHistory = JSON.parse(localStorage.getItem("datesHistory")) || []; 

export function addRecordToStorage (record) {
    datesHistory.push(record);
    datesHistory.length > 10 && datesHistory.shift();
    localStorage.setItem("datesHistory", JSON.stringify(datesHistory));
}
