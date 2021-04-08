console.log('epiPlotly.js loaded');

(async function(){

    loadScript=url=>new Promise(function(resolve, reject){
        let s = document.createElement('script')
        s.src=url
        s.onload=resolve
        document.head.appendChild(s)
    })
    
    /*

    // Praful, either Plotly is missing something or I am :-D - whydoesn't this work?
    loadScript=async url=>{
        import(url)
    }
    */

    if(typeof(Plotly)=="undefined"){
        await loadScript('https://cdn.plot.ly/plotly-latest.min.js')
    }

    class epiPlotly extends HTMLElement {
      connectedCallback(){
        this.innerHTML = `<p><hr>Hello world from epiPlotly at ${Date()}<hr>Plotly = ${typeof(Plotly)}</p>`;
        let div = document.createElement('div')
        this.appendChild(div)
        this.plotDataURL=this.plotDataURL||'https://episphere.github.io/plot/demo.json'
        fetch(this.plotDataURL)
            .then(x=>x.json())
            .then(x=>Plotly.newPlot(div,x.traces,x.layout))
      }
    }

    customElements.define('epi-plotly', epiPlotly);

})()
