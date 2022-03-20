# German Election Polls :clipboard:

## Description

This small we app was created during my six-months further education to make use of the browser built in Canvas API.
Basically it shows the latest election polls for each German federal state (or nationwide) in comparison fetched from the [dawum.de](https://dawum.de/) API.

**Check out the working project [here](http://wahlumfragen.renderness.com/)**
<br>
_It's best used on Desktop size due to it's legend in the footer area. Although the poll sizes are calculated dynamically_

Self-reflecting my work here I'm definitely aware that some functions got to much body and should have been splitted up in the favour of clean code, but since then (September '21) I learned a lot and am definitely happy with how it came out at the end.

---

## Features

-   Canvas API - a browser built-in API to draw shapes | [MDN-Link](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
-   Flatpickr - a library extending the Date Picker features | [Link](https://flatpickr.js.org/)

---

## Project Explanation

[index.js](/index.js)

-   imports all script dependencies: some Date helper functions, a function to create the legend in the footer area and most importantly the Survey class
-   then creates two instances of that [Survey-Class](/scripts/Survey.js)
-   initializes global variables (surveys, parliaments and so on) for later usage
-   on document load it fetches all data from the external API and saves it in the global variables
-   in the same function it sets all the necessary inputs of each Survey class (e.g. setting the minimum date, fills the parliament choices and uses the getSurveys method to hand over the data)

[Survey.js](/scripts/Survey.js)

The two most important functions are _getSurveys()_ and _handleFoundSurveys()_.

_getSurveys()_

-   uses the Flatpckr library to grey out all dates, that have no surveys and picks the first possible date to be selected
-   it then takes the values from date and parliament input to generate a survey object that contains all necessary data to generate the actual poll canvas, sorts the poll values and pushes that survey into the result-Array in case there are multiple surveys on one day
-   the results will then be processed by...

_handleFoundSurveys()_

-   it basically dispatches the different scenarios of having, no, one or multiple found surveys
-   in case exactly one is found it automatically calls the main draw function createDiagram() otherwise the change event on the survey select does it.

[createDiagram.js](/scripts/createDiagram.js)

-   imports a couple helper functions to draw the different axes of the diagram
-   the setMeasures() method takes the given survey and canvas to then return an object with all measurements which then will be given to helper functions to draw the actual canvas
-   when resizing the window the diagram size will be recalculated with these methods
