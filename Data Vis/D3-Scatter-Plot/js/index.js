const height = 550
const width = 1300
const xpadding = 100
const ypadding = 50

const svg = d3
  .select('.svg')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
).then(data => {
  // Constants
  const [min, max] = d3.extent(data, d => d.Year)
  const newData = data.map(d => {
    return {
      ...d,
      Time: d3.timeParse('%M:%S')(d.Time)
    }
  })

  // create margin for the 2 timing to allow for space on the chart
  const [fast, slow] = d3.extent(newData, d => d.Time)
  const fastest = new Date(fast.getTime())
  const slowest = new Date(slow.getTime())
  fastest.setSeconds(fastest.getSeconds() - 15)
  slowest.setSeconds(slowest.getSeconds() + 15)

  // Create the axes
  const xScale = d3
    .scaleLinear()
    .domain([min - 1, max + 1])
    .range([xpadding, width - xpadding])

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))

  const yScale = d3
    .scaleTime()
    .domain([fastest, slowest])
    .range([height - ypadding, ypadding])

  const yAxis = d3.axisLeft(yScale).tickFormat(d => d3.timeFormat('%M:%S')(d))

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, ' + (height - ypadding) + ')')
    .call(xAxis)

  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + xpadding + ', 0)')
    .call(yAxis)

  // Create the axes title
  svg
    .append('text')
    .attr('x', -300)
    .attr('y', ypadding - 5)
    .attr('transform', 'rotate(-90)')
    .text('Record Timings (Mins)')

  svg
    .append('text')
    .attr('x', 600)
    .attr('y', height - 5)
    .text('Year of Achievement')

  // Create the data circles for the scatterplot
  svg
    .selectAll('circle')
    .data(newData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.Year))
    .attr('cy', d => yScale(d.Time))
    .attr('r', 6)
    .attr('fill', d => {
      if (d.Doping.length === 0) {
        return '#0246ff'
      }
      return '#f33b39'
    })
    .attr('opacity', d => {
      if (d.Doping.length === 0) {
        return 1
      }
      return 0.8
    })
    .attr('data-xvalue', d => d.Year)
    .attr('data-yvalue', d => d.Time.toISOString())
    .on('mouseover', d => {
      tooltip.style('visibility', 'visible').attr('data-year', d.Year)
      tooltip
        .select('.details')
        .text(
          d.Name +
            ' (' +
            d.Nationality +
            ') @ ' +
            d3.timeFormat('%M:%S')(d.Time) +
            ' mins in ' +
            d.Year
        )
      tooltip
        .select('.info')
        .text(d.Doping.length !== 0 ? d.Doping : 'Clean Cyclist')
    })
    .on('mousemove', () => {
      return tooltip
        .style('top', d3.event.pageY - 10 + 'px')
        .style('left', d3.event.pageX + 10 + 'px')
    })
    .on('mouseout', () => {
      return tooltip.style('visibility', 'hidden')
    })

  // Legend
  let legend = svg.append('g').attr('id', 'legend')
  legend
    .append('text')
    .attr('x', 1000)
    .attr('y', 300)
    .text('Suspected of Doping')

  legend
    .append('text')
    .attr('x', 1040)
    .attr('y', 330)
    .text('Clean Cyclists')

  legend
    .append('rect')
    .attr('x', 1145)
    .attr('y', 285)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', '#f33b39')
    .attr('opacity', 0.8)

  legend
    .append('rect')
    .attr('x', 1145)
    .attr('y', 315)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', '#0246ff')

  // Create the tooltip
  const tooltip = d3.select('#tooltip')
})
