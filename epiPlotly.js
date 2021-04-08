console.log('epiPlotly.js loaded');

(function(){

    class epiPlotly extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `<p><hr>Hello world from epiPlotly at ${Date()}<hr></p>`;
      }
    }

    customElements.define('epi-plotly', epiPlotly);

})()
