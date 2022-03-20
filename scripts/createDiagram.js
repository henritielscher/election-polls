import drawXAxis from "./drawing/drawXAxis.js";
import drawYAxis from "./drawing/drawYAxis.js";
import drawPollBars from "./drawing/drawPollBars.js";
import setMeasures from "./drawing/setMeasures.js";

function createDiagram(survey, parent) {
    // Content nach neuer Suchanfrage leeren
    if (parent.querySelector("canvas")) {
        parent.querySelector("canvas").remove();
    }
    if (parent.querySelector(".survey-info")) {
        parent.querySelector(".survey-info").remove();
    }

    // CANVAS ERSTELLEN
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = parent.clientWidth - 32;
    canvas.height = canvas.width / 1.25;

    let measures = setMeasures(survey, canvas);

    ctx.fillStyle = "#eee"; // Hintergrundfarbe
    ctx.fillRect(0, 0, canvas.width, measures.height);

    // Canvas speichern, um bei X-Achse später das Canvas zu reseten
    ctx.save();

    // FUNKTIONEN ZUM ZEICHNEN
    drawYAxis(measures, ctx);
    drawPollBars(measures, ctx);
    drawXAxis(measures, ctx);

    return canvas;
}

export default createDiagram;
