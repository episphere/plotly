console.log('epiPlotly.js loaded');

(async function(){

    loadScript=url=>new Promise(function(resolve, reject){
        let s = document.createElement('script')
        s.src=url
        s.onload=resolve
        document.head.appendChild(s)
    })

    if(typeof(Plotly)=="undefined"){
        await loadScript('https://cdn.plot.ly/plotly-latest.min.js')
        //const Plotly = import('https://cdn.plot.ly/plotly-latest.min.js')
    }

    class epiPlotly extends HTMLElement {
      connectedCallback(){
        if(this.textContent.length>0){this.plotDataURL=this.textContent}
        this.plotDataURL=this.plotDataURL||'https://episphere.github.io/plot/demo.json'
        if(this.plotDataURL.match(/^\s*http/)){
            this.innerHTML = `<a href="${this.plotDataURL}" target="_blank" style="font-size:x-small">${this.plotDataURL}</a><span style="font-size:xx-small"><br>${Date().slice(0,34)}</span>` // `<p><hr>Hello world from epiPlotly at ${Date()}<hr>Plotly = ${typeof(Plotly)}</p>`;
        }
        let div = document.createElement('div')
        this.appendChild(div)
        let that = this
        let doPlot=(x)=>{
            x.plotConfig=x.plotConfig||{}
            if(that.attributes.plotconfig){
                let att = that.attributes.plotconfig.value.split(';').map(xi=>{
                    let atti = xi.split(':')
                    if(atti[1]==='false'){atti[1]=false}
                    if(atti[1]==='true'){atti[1]=true}
                    x.plotConfig[atti[0]]=atti[1]
                })
            }
            Plotly.newPlot(div,x.traces,x.layout,x.plotConfig)
        }
        if(this.plotDataURL.match(/^\s*http/)){
            fetch(this.plotDataURL).then(x=>x.json()).then(x=>doPlot(x))
        }else{
            if(!this.innerHTML.match(/^\s*</)){
                //this.querySelector('a').remove()
                let div = this.children[0]
                this.innerText=''
                this.appendChild(div)
                let x
                eval('x='+this.plotDataURL)
                doPlot(x)
            }
                
        }
      }
    }
    try{
        customElements.define('epi-plotly', epiPlotly);
        console.log('epiPlotly custo element loaded')
    }catch(err){
        console.log('repeat epiPlotly defenition, ignored',err)
    }
})()
