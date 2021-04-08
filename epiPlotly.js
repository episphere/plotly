console.log('epiPlotly.js loaded');

(async function(){

    loadScript=url=>new Promise(function(resolve, reject){
        let s = document.createElement('script')
        s.src=url
        s.onload=resolve
        document.head.appendChild(s)
    })
    
    /*
    loadScript=async url=>{
        import(url)
    }
    */

    if(typeof(Plotly)=="undefined"){
        await loadScript('https://cdn.plot.ly/plotly-latest.min.js')
    }

    class epiPlotly extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `<p><hr>Hello world from epiPlotly at ${Date()}<hr>Plotly = ${typeof(Plotly)}</p>`;
      }
    }

    customElements.define('epi-plotly', epiPlotly);

})()
