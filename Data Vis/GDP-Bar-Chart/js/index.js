const width = 1000
const height = 385
const xmargin = 50
const ymargin = 30

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
).then(rawData => {
  let svg = d3
    .select('.barChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Init the 2 scales
  const xScale = d3
    .scaleTime()
    .domain([new Date(rawData.from_date), new Date(rawData.to_date)])
    .range([xmargin, 1000 - xmargin])

  const xAxis = d3.axisBottom(xScale)

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(rawData.data, gdp => gdp[1])])
    .range([height - ymargin, ymargin])

  const yAxis = d3.axisLeft(yScale)

  svg
    .append('g')
    .attr('transform', 'translate(0,' + (height - ymargin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis)

  svg
    .append('g')
    .attr('transform', 'translate(' + xmargin + ', 0)')
    .attr('id', 'y-axis')
    .call(yAxis)

  // Init the barchart and the length / width
  const gdpData = [...rawData.data]
  const barWidth = (width - 2 * xmargin) / gdpData.length
  const maxGDP = d3.max(gdpData, gdp => gdp[1])
  // Scale to calculate height of each bar based on the value
  const linearScale = d3
    .scaleLinear()
    .domain([0, maxGDP])
    .range([0, height - 2 * ymargin])

  svg
    .selectAll('rect')
    .data(gdpData)
    .enter()
    .append('rect')
    .attr('x', data => xScale(new Date(data[0])))
    .attr('y', data => height - ymargin - linearScale([data[1]]))
    .attr('width', Math.floor(barWidth) - 0.2)
    .attr('height', data => linearScale(data[1]))
    .attr('class', 'bar')
    .attr('data-date', data => data[0])
    .attr('data-gdp', data => data[1])

    // Show tooltip on mouseover
    .on('mouseover', data => {
      tooltip
        .style('visibility', 'visible')
        .attr('data-date', data[0])
        .select('.date')
        .text(data[0])
      tooltip.select('.value').text('$' + data[1] + ' Bil')
    })
    .on('mousemove', () => {
      const screenwidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      let mouseX = d3.event.clientX
      const xcord =
        screenwidth - mouseX < 135 || mouseX > 1175
          ? d3.event.pageX - 125
          : d3.event.pageX + 15
      return tooltip
        .style('top', d3.event.pageY - 10 + 'px')
        .style('left', xcord + 'px')
    })
    .on('mouseout', () => {
      return tooltip.style('visibility', 'hidden')
    })

  // Tooltip when mouseover
  const tooltip = d3
    .select('.barChart')
    .append('div')
    .attr('id', 'tooltip')

  tooltip
    .append('div')
    .attr('class', 'date')
    .attr('data-date')
  tooltip.append('div').attr('class', 'value')

  // Text on the Axes
  svg
    .append('text')
    .attr('x', 10)
    .attr('y', 15)
    .attr('class', 'description')
    .text('Gross Domestic Product (In Billions)')
})
