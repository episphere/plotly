// usage:
// Plotly = (await import('https://episphere.github.io/plotly/esm.mjs')).esm

await import("https://cdn.plot.ly/plotly-2.34.0.min.js")
const esm = Plotly
delete window.Plotly
export{esm}
