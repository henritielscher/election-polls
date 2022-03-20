import createDiagram from "./createDiagram.js";

const dateConfig = {
	altInput: true,
	altFormat: "d.m.Y",
	enableTime: false,
	dateFormat: "Y-m-d",
};

class Survey {
	constructor(container) {
		this.container = container;
		this.parliamentSelect = container.querySelector("select");
		this.formContainer = container.querySelector(".form-container");
		this.surveySelect =
			container.querySelector(".survey-select") ?? undefined;
		this.diagram = container.querySelector("canvas") ?? undefined;
		this.dateInput = container.querySelector("input");
		this.fp = flatpickr(this.dateInput, dateConfig);
		this.error = container.querySelector(".error");
		this.foundSurveys;
		this.surveyInfo;
		this.events();
	}

	// EVENTS
	events() {
		document.addEventListener(
			"DOMContentLoaded",
			this.setMaxDate.bind(this)
		);
		this.container.addEventListener("change", (e) => {
			if (e.target.className === "survey-select") {
				let surveyIndex = e.target.value;
				this.diagram = createDiagram(
					this.foundSurveys[surveyIndex],
					this.container
				);
				this.surveyInfo = this.createSurveyInfo(
					this.foundSurveys[surveyIndex].meta
				);
				this.container.appendChild(this.diagram);
				this.container.appendChild(this.surveyInfo);
			}
		});
	}

	// METHODS
	getSurveys(surveys, parliaments, institutes, parties, taskers) {
		// Update den Kalender mit allen verfügbaren Umfragen des Parlaments
		let enableDates = [];
		for (let id in surveys) {
			if (surveys[id].Parliament_ID === this.parliamentSelect.value) {
				enableDates.push(surveys[id].Date);
			}
		}
		this.fp.set("enable", enableDates);

		// Falls kein Datum gefunden, dann nimm das aktuellste Datum der Umfragen
		if (!enableDates.includes(this.dateInput.value)) {
			this.dateInput.value = enableDates.pop();
			this.fp.setDate(this.dateInput.value);
		}

		// Durchlaufe Surveys und speichere in erster Liste mit den Surveys
		let result = [];
		for (let id in surveys) {
			if (
				surveys[id].Parliament_ID === this.parliamentSelect.value &&
				surveys[id].Date === this.dateInput.value
			) {
				// Erstelle Custom Object aus gefundener Umfrage
				// Hole Variablen aus der Umfrage
				const {
					Surveyed_Persons,
					Tasker_ID,
					Institute_ID,
					Parliament_ID,
					Results,
				} = surveys[id];

				let surveyObj = {
					meta: {
						surveyed: Surveyed_Persons,
						tasker: taskers[Tasker_ID].Name,
						institute: institutes[Institute_ID].Name,
						parliament: parliaments[Parliament_ID].Shortcut,
					},
					poll: [],
				};
				// Pushe Ergebnisse in poll-Array
				for (let partyID in Results) {
					surveyObj.poll.push({
						id: partyID,
						name: parties[partyID].Shortcut,
						percentage: Results[partyID],
					});
				}
				// Sortiere Poll-Ergebnisse
				surveyObj.poll.sort((a, b) => a.id - b.id); // Ergebnis nach Index sortieren
				let sonstige = surveyObj.poll.shift(); // ersten Eintrag entfernen und speichern
				surveyObj.poll.sort((a, b) => b.percentage - a.percentage); // nach Prozenten
				surveyObj.poll.push(sonstige); // Sonstige ans Ende einfügen
				result.push(surveyObj);
			}
		}
		// Speichere aktuelle Umfragen in Variable
		this.foundSurveys = result;
		this.handleFoundSurveys(this.foundSurveys);
	}

	handleFoundSurveys(surveys) {
		this.clearContent();
		if (!surveys.length) {
			// KEIN EINTRAG GEFUNDEN
			this.error.textContent =
				"Es konnte leider keine Umfrage für diesen Tag gefunden werden.";
		} else if (surveys.length === 1) {
			// EIN EINTRAG GEFUNDEN
			this.createSurveySelection(surveys, true, false); // Erstelle ausgegrautes Select-Field mit Meta-Daten
			this.diagram = createDiagram(surveys[0], this.container);
			this.surveyInfo = this.createSurveyInfo(surveys[0].meta);
			this.container.appendChild(this.diagram);
			this.container.appendChild(this.surveyInfo);
		} else {
			// MEHRERE EINTRÄGE GEFUNDEN
			this.createSurveySelection(surveys, false, true); // Erstelle Select-Field mit allen Umfragen
		}
	}

	createSurveySelection(surveys, disable, firstOption) {
		let select = document.createElement("select");
		select.className = "survey-select";
		// Erstelle dynamisch Optionen des Select-Felds
		select.innerHTML = surveys
			.map((survey, index) => {
				const { institute, tasker, surveyed } = survey.meta;
				return `
                    <option value="${index}">${institute}</option>
                    `;
			})
			.join("");

		if (disable) select.disabled = true;
		if (firstOption) {
			let chooseOptionLabel = document.createElement("option");
			chooseOptionLabel.value = "";
			chooseOptionLabel.textContent = "Bitte wählen Sie eine Umfrage.";
			chooseOptionLabel.setAttribute("selected", true);
			chooseOptionLabel.setAttribute("disabled", true);
			select.prepend(chooseOptionLabel);
		}
		this.surveySelect = select;
		this.formContainer.appendChild(select);
	}

	createSurveyInfo(meta) {
		let info = document.createElement("ul");
		info.className = "survey-info";
		info.innerHTML = `
            <li>Institut: ${meta.institute}</li>
            <li>Auftrag: ${meta.tasker}</li>
            <li>Befragte: ${meta.surveyed}</li>
        `;
		return info;
	}

	// Setzt das größte Datum für die Auswahl des Kalenders
	setMaxDate() {
		let today = new Date();
		this.fp.set("maxDate", today);
	}
	// Setzt das niedrigste Datum für die Auswahl des Kalenders
	setMinDate(minDate) {
		this.fp.set("minDate", minDate);
	}
	// Setze Optionen für das Parlament-Select
	setParliamentOptions(parliamentOptions) {
		this.parliamentSelect.innerHTML = parliamentOptions;
	}
	// Elemente reseten
	clearContent() {
		if (document.querySelector(".network-error")) {
			document.querySelector(".network-error").remove();
		}
		if (this.surveyInfo) this.surveyInfo.remove();

		if (this.error) this.error.textContent = "";
		if (this.surveySelect) this.surveySelect.remove();
		if (this.diagram) this.diagram.remove();
	}
}

export default Survey;
