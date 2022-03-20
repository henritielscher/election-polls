// function drawYAxis(canvas, ctx, beginX, factor) {
//   ctx.beginPath();
//   ctx.moveTo(beginX, canvas.height);
//   ctx.lineTo(beginX, canvas.height - factor * 40 - 1);
//   ctx.lineWidth = 2;
//   ctx.strokeStyle = "#222";
//   ctx.stroke();
//   ctx.closePath();

//   // Y-Achse beschriften
//   for (let i = factor * 5; i <= factor * 40; i += factor * 5) {
//     ctx.beginPath();
//     ctx.moveTo(beginX + 1, canvas.height - i);
//     ctx.lineTo(canvas.width, canvas.height - i);
//     ctx.strokeStyle = "#ccc";
//     ctx.stroke();
//     ctx.closePath();

//     // Prozent-Labels
//     ctx.font = "bold 12px sans-serif";
//     ctx.fillStyle = "black";
//     ctx.fillText(`${i / factor}`, beginX - 30, canvas.height - i + 4);
//   }
// }

function drawYAxis(c, ctx) {
    // Haupt-Y-Achse ziehen
    ctx.beginPath();
    ctx.moveTo(c.marginLeft, c.height);
    ctx.lineTo(c.marginLeft, c.height - c.diagramHeight - c.yStroke / 2);
    ctx.lineWidth = c.yStroke;
    ctx.strokeStyle = "#222";
    ctx.stroke();
    ctx.closePath();

    // Y-Achse Prozentlinien ziehen und beschriften
    for (let i = 0; i <= c.max / 5; i++) {
        ctx.beginPath();
        ctx.moveTo(c.marginLeft + c.yStroke / 2, c.height - c.lineDistance * i);
        ctx.lineTo(c.width - c.marginRight, c.height - c.lineDistance * i);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        ctx.closePath();

        // Prozent-Labels
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "black";
        if (i != 0)
            ctx.fillText(`${i * 5}`, 10, c.height - c.lineDistance * i + 3);
    }
}

export default drawYAxis;
