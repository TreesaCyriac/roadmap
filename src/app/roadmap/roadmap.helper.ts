
export function formatDate(pDate) {
    const d = new Date(pDate);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0];
}

export function getInitialDate(pDate, pSec) {
    const d = new Date(pDate);
    d.setDate(d.getDate()-timeConvert(pSec));
    return d;
}

export function timeConvert(pTime) { 
    const days = Math.floor(pTime/86400); // 60*60*24
    return(days);
}

export function getDates(startDate, stopDate) {
    const daysDiff = Math.round((stopDate - startDate)/(1000*60*60*24));
    const dateArray = new Array();
    let currentDate = startDate;
    if(daysDiff < 10) {
        while (currentDate <= stopDate) {
            dateArray.push(formatDate(new Date (currentDate)));
            currentDate = addDays(currentDate, 1);
        }
    }
    else {
        while (currentDate <= stopDate) {
            dateArray.push(formatDate(new Date (currentDate)));
            currentDate = addDays(currentDate, 10);
        }
    }
    return dateArray;
}

function addDays(date, num) {
    const tmpDate = new Date(date.valueOf());
    tmpDate.setDate(tmpDate.getDate() + num);
    return tmpDate;
}
