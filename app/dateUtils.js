"use strict";

export function isWorkingDay (c) {
   return c.getDay() !== 6 && c.getDay() !== 0;
};

export function addDay (c) {
    c.setDate(c.getDate() + 1);
};

export function addWeek (dateValue) {
    dateValue.setDate(dateValue.getDate() + 7);
};

export function addMonth (dateValue) {
    dateValue.setMonth(dateValue.getMonth() + 1);
};