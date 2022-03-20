function setMeasures(survey, canvas) {
    const { width, height } = canvas;
    // Höchste Prozentzahl ermitteln
    let maxBar = 0;
    survey.poll.forEach((party) => {
        if (party.percentage > maxBar) maxBar = party.percentage;
    });

    let barCount = survey.poll.length;
    let xStroke = 4;
    let yStroke = 2;
    let marginBar = barCount <= 7 ? 15 : 10;
    let marginTop = 20;
    let marginRight = 20;
    let marginLeft = 30;
    let diagramWidth = width - marginLeft - marginRight - yStroke;
    let max =
        maxBar % 5 === 0
            ? maxBar + 5 - (maxBar % 5)
            : maxBar + 10 - (maxBar % 5);
    let lineDistance = Math.floor((height - xStroke - marginTop) / (max / 5));
    let barWidth = Math.floor((diagramWidth - barCount * marginBar) / barCount);
    let diagramHeight = (max / 5) * lineDistance;
    let percentHeight = diagramHeight / max;

    return {
        barCount,
        barWidth,
        diagramHeight,
        diagramWidth,
        // factor,
        height,
        lineDistance,
        marginBar,
        marginLeft,
        marginRight,
        marginTop,
        max,
        percentHeight,
        width,
        xStroke,
        yStroke,
        poll: survey.poll,
    };
}

export default setMeasures;
