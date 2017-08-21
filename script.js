/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height)


// Data reloading
let reload = () => {

  let goalsScored = []
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(row => {
      goalsScored.push(+row.GoalsScored)
    })

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(goalsScored)])
    .range([0, height])

    const colorScale = d3.scaleLinear()
    .domain([0, d3.max(goalsScored)])
    .range(['peru', 'teal'])

    var xAxis = d3.scaleLinear()
                  .domain([0, goalsScored.length])
                  .range([0, width])

    var yAxis = d3.scaleLinear()
                  .domain([0, d3.max(goalsScored)])
                  .range([height - margin, 0])


    var barWidth = width/goalsScored.length

    svg.selectAll('rect')
      .data(goalsScored)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        return i * barWidth + marginLeft - 10
      })
      .attr('y', d => height - margin - yScale(d))
      .attr('width', 15)
      .attr('height', d => yScale(d))
      .attr('fill', colorScale)

      svg.append('g')
         .attr('class', 'axisSteelBlue')
         .attr('transform', `translate(${marginLeft - 10})`)
         .call(d3.axisLeft(yAxis).ticks(d3.max(goalsScored)))

      svg.append('g')
         .attr('class', 'axisSteelBlue')
         .attr('transform', `translate(${marginLeft - 10}, ${height - margin})`)
         .call(d3.axisBottom(xAxis).ticks(goalsScored.length))

      d3.selectAll('rect')
      .attr('height', 0)
        .transition()
        .duration(200)
        .delay((d, i) => i * 100)
        .attr('y', (d, i) => height - margin - yScale(d))
        .attr('height', (d, i) => yScale(d))


      // svg.append('g')
      //   .attr('class', 'axisBlue')
      //   .attr('transfrom', `translateX(${marginLeft}, ${height - margin})`)
      //   .call(d3.axisBottom(xAxis).ticks(goalsScored.length))

      // svg.append('g')
      //   .attr('class', 'axisBlue')
      //   .attr('transfrom', `translateY(${marginLeft - 39})`)
      //   .call(d3.axisLeft(yAxis).ticks(d.max(goalsScored)))
  })

}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  // console.log(reload())

}

// console.log(reload())
reload()
