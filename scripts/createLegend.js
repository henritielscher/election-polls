// ERSTELLT LEGENDE IM FOOTER BEREICH
let legend = document.querySelector("footer ul");
import { colors, partyNames } from "./parties.js";

function createLegend() {
    legend.innerHTML = partyNames
        .map((party, index) => {
            if (party !== null)
                return `
    <li><span style="background-color: ${colors[index]};"></span> ${party}</li>
  `;
        })
        .join("");
}

export default createLegend;
