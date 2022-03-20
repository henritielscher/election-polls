"use strict";
// IMPORTIERE SKRIPTE
import Survey from "./scripts/Survey.js";
import createLegend from "./scripts/createLegend.js";
import { formatDate, getMinDate } from "./scripts/dateHelpers.js";

// WÄHLE ELEMENTE AUS
let header = document.querySelector("header");
let footer = document.querySelector("footer");
let wrapper = document.querySelector(".wrapper");
let firstSurvey = document.querySelector(".left");
let secondSurvey = document.querySelector(".right");

// INITIERE DIE BEIDEN SURVEY INSTANZEN

let first = new Survey(firstSurvey);
let second = new Survey(secondSurvey);
let surveyInst = [first, second];

// INITIERE VARIABLEN
let surveys;
let parliaments;
let institutes;
let parties;
let taskers;
let searchArgs;

// EVENTS
document.addEventListener("DOMContentLoaded", () => {
	fetchJSONData(); // Fetch Json Daten, um sie in den Variablen zu speichern
	createLegend(); // erzeuge die Legende im Footer
	// Erstelle den dynamischen Abstand vom Wrapper zum Header
	wrapper.style.marginTop = `${header.clientHeight + 30}px`;
	wrapper.style.marginBottom = `${footer.clientHeight + 30}px`;
});

window.addEventListener("resize", () => {
	wrapper.style.marginTop = `${header.clientHeight + 30}px`;
	wrapper.style.marginBottom = `${footer.clientHeight + 30}px`;
	surveyInst.forEach((s) => s.handleFoundSurveys(s.foundSurveys));
});

// Bei Änderungen des Datums oder des Parlaments
surveyInst.forEach((s) => {
	s.dateInput.addEventListener("input", () => {
		s.getSurveys(...searchArgs);
	});
	s.parliamentSelect.addEventListener("change", () => {
		s.getSurveys(...searchArgs);
	});
});

// Hole Daten aus API und speichere in Variablen
function fetchJSONData() {
	fetch("wahl.php")
		.then((res) => res.json())
		.then((data) => {
			// Variablen deklarieren
			surveys = data.Surveys;
			parliaments = data.Parliaments;
			institutes = data.Institutes;
			parties = data.Parties;
			taskers = data.Taskers;
			searchArgs = [surveys, parliaments, institutes, parties, taskers];

			// ermittle das Datum der ersten Umfrage
			let minDate = getMinDate(surveys);
			// Ermittle vorhandene Optionen im Parlament-Select
			let parliamentOptions = getParliamentOptions(parliaments);
			let today = formatDate(new Date());
			// Erstelle Abfrage der aktuellsten Umfragen für Berlin (links) und Bundestag (rechts)

			surveyInst.forEach((s) => {
				s.setMinDate(minDate);
				s.setParliamentOptions(parliamentOptions);
				s.fp.setDate(today);
				if (s.container === firstSurvey) s.parliamentSelect.value = "0";
				if (s.container === secondSurvey)
					s.parliamentSelect.value = "3";
				s.getSurveys(...searchArgs);
			});
		})
		.catch((err) => {
			let error = document.querySelector(".network-error");
			error.style.padding = "1rem 2rem";
			error.textContent =
				"Die Verbindung zur Datenbank konnte leider nicht hergestellt werden. Versuchen Sie es später noch einmal.";
			wrapper.prepend(error);
		});
}

function getParliamentOptions(parliamentObj) {
	let select = document.createElement("select");
	for (let id in parliamentObj) {
		let option = document.createElement("option");
		option.textContent = parliaments[id].Shortcut;
		option.value = id;
		select.appendChild(option);
	}
	return select.innerHTML;
}
