/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])


const draw = (words) => {

  d3.select('#top-score').append('svg')
    .style('margin-bottom', 40)
    .attr('width', 750)
    .attr('height', 300)
    .attr('class', 'wordcloud')
    .append('g')
    .attr('transform', 'translate(320, 500)')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', d => d.size + 'px')
    .style('fill', (d, i) => fill(i))
    .attr('transform', d => {
      return `translate(${[d.x, d.y]})rotate(${d.rotate})`
    })
    .text(d => d.text)
}


const load = () => {
  // Load your data here...
  let names = []
  d3.tsv('stats.tsv', rows => {
    var players = rows
      .filter(function (d) { return +d.G > 0 })
      .map(function (d) { return { text: d.Name, size: +d.G }})
      .sort(function (a, b) { return d3.descending(a.size, b.size)})
      .slice(0, 100)

    d3.layout.cloud().size([width, height])
      .words(players)
      .padding(5)
      .rotate(function () { return ~~(Math.random() * 2) * 90})
      .font("Roboto")
      .fontSize(function (d) { return d.size })
      .on("end", draw)
      .start()
  })
}

load()
