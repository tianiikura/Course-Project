"use strict";
import {isWorkingDay, addDay} from "./dateUtils.js";


export function durationBetweenDates (startDate, endDate, dimension, daysOption) {
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
            differenceInDays = getAllDays(startDateTime, endDateTime);
            break;
        case "workingDays":
            differenceInDays = getWorkingDays(startDateTime, endDateTime);
            break;
        case "weekends":
            differenceInDays = getWeekendDays(startDateTime, endDateTime);  
            break;
    }
    
    let periodAmount = differenceInDays * periodDuration;

    return `${periodAmount} ${dimension}`;
};

function getAllDays (startDate, endDate) {
    return Math.floor(Math.abs(endDate - startDate) / (24 * 60 * 60 * 1000));
};
function getWorkingDays (startDate, endDate) {
    let differenceInDays = 0;
    for (let c = new Date(startDate); c < endDate; addDay(c)) {
        if (isWorkingDay(c)) {
            differenceInDays++;
        }
    };
    return differenceInDays;
};
function getWeekendDays (startDate, endDate) {
    return getAllDays(startDate, endDate) - getWorkingDays(startDate, endDate);
};