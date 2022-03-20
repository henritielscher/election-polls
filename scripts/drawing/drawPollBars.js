import { colors } from "../parties.js";

function drawPollBars(c, ctx) {
    // ZEICHNE BALKEN
    c.poll.forEach((party) => {
        ctx.fillStyle = colors[party.id];
        // ctx.fillStyle = "red";
        ctx.fillRect(
            c.marginLeft + c.yStroke + c.marginBar,
            c.height - party.percentage * c.percentHeight,
            c.barWidth,
            party.percentage * c.percentHeight
        );

        // SETZE PROZENTZAHLEN
        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(
            party.percentage + "%",
            c.marginLeft +
                c.yStroke +
                c.marginBar +
                c.barWidth / 2 -
                c.marginBar,
            c.height - party.percentage * c.percentHeight - 10
        );
        ctx.translate(c.marginBar + c.barWidth, 0);
    });
}

export default drawPollBars;
