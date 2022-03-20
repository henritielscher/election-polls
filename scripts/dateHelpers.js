// Ermittelt das niedrigste Datum für die Auswahl des Kalenders
function getMinDate(surveys) {
    let date = new Date();
    for (let id in surveys) {
        let compareDate = new Date(surveys[id].Date);
        if (compareDate < date) date = compareDate;
    }

    let firstSurveyDate = formatDate(date);
    return firstSurveyDate;
}

function formatDate(date) {
    let year = date.getFullYear();
    let month = "0" + (date.getMonth() + 1).toString().slice(-2);
    let day = ("0" + date.getDate().toString()).slice(-2);
    return `${year}-${month}-${day}`;
}

export { formatDate, getMinDate };
