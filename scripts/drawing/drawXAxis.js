function drawXAxis(c, ctx) {
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(c.marginLeft + c.yStroke / 2, c.height - c.xStroke / 2);
    ctx.lineTo(c.width - c.marginRight, c.height - c.xStroke / 2);
    ctx.lineWidth = c.xStroke;
    ctx.strokeStyle = "#222";
    ctx.stroke();
    ctx.closePath();
}

export default drawXAxis;
