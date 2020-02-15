const width = 5 * Math.ceil(2015 - 1753 + 1) // Each rect has width of max 5 * no. of years
const height = 35 * 12 + 85 // Each rect has height of 35 and 50 additional for legend
const paddingx = 80
const paddingy = 20
// 9 colours RdBu by colorbrewer2
const colours = [
  '#2166ac',
  '#4393c3',
  '#92c5de',
  '#d1e5f0',
  '#f7f7f7',
  '#fddbc7',
  '#f4a582',
  '#d6604d',
  '#b2182b'
]

const monthNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const monthWords = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

let svg = d3
  .select('.svg')
  .append('svg')
  .attr('width', width + 2 * paddingx)
  .attr('height', height + 2 * paddingy)

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
).then(rawData => {
  const monthlyData = [...rawData.monthlyVariance]
  let length = monthlyData.length
  // formulate the scales and axis
  const xScale = d3
    .scaleLinear()
    .domain([monthlyData[0].year, monthlyData[length - 1].year])
    .range([paddingx, width + paddingx])

  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format('d'))
    .tickSizeOuter([0])

  const yScale = d3
    .scaleBand()
    .domain(monthNum)
    .range([paddingy, height + paddingy - 85])

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(monthNum)
    .tickFormat(x => monthWords[x - 1])
    .tickSizeOuter([0])

  // legend axes
  const [minVariance, maxVariance] = d3.extent(monthlyData, d => d.variance)
  const minTemp = rawData.baseTemperature + minVariance
  const maxTemp = rawData.baseTemperature + maxVariance
  const difference = maxTemp - minTemp
  // Since we are making 9 colour scales, we will have 8 ticks. The calculation is to divide by 9 first
  // followed by rounding down and making 8 intermediate scales to let min and max stretch into extremes
  const step = difference / 9
  const firstTick = step + minTemp
  let tickArray = []
  for (x = 0; x < 8; x++) {
    tickArray.push(firstTick + x * step)
  }

  const threshold = d3
    .scaleThreshold()
    .domain(tickArray)
    .range(colours)

  const legendScale = d3
    .scaleLinear()
    .domain([minTemp, maxTemp])
    .range([paddingx + 100, paddingx + 460])

  const legend = d3
    .axisBottom(legendScale)
    .tickValues(tickArray)
    .tickFormat(d3.format('.1f'))
    .tickSizeOuter([0])

  let legendGroup = svg.append('g').attr('id', 'legend')

  legendGroup
    .append('g')
    .attr('transform', 'translate(0, ' + (height + paddingy) + ')')
    .call(legend)

  legendGroup
    .selectAll('rect')
    .data(colours)
    .enter()
    .append('rect')
    .attr('width', 40)
    .attr('height', 40)
    .attr('x', (d, i) => paddingx + 100 + i * 40)
    .attr('y', height + paddingy - 40)
    .attr('fill', d => d)

  // Init the tooltip
  let tooltip = d3.select('#tooltip')

  // Create the rect for the chart
  svg
    .selectAll('.cell')
    .data(monthlyData)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d.month))
    .attr('width', 5)
    .attr('height', 35)
    .attr('fill', d => threshold(rawData.baseTemperature + d.variance))
    .attr('data-month', d => d.month - 1)
    .attr('data-year', d => d.year)
    .attr('data-temp', d => rawData.baseTemperature + d.variance)
    .on('mousemove', d => {
      tooltip.style('visibility', 'visible')
      const xPosition = d3.event.pageX - 50
      const yPosition = d3.event.pageY - 70
      tooltip.style('top', yPosition + 'px')
      tooltip.style('left', xPosition + 'px')
      tooltip
        .attr('data-year', d.year)
        .select('#date')
        .text(d.year + ', ' + monthWords[d.month - 1])
      tooltip
        .select('#temp')
        .html(
          d3.format('.1f')(rawData.baseTemperature + d.variance) + ' &deg;C'
        )
    })
    .on('mouseout', () => tooltip.style('visibility', 'hidden'))

  // Draw the axes so that they appear above the rectangles
  svg
    .append('g')
    .attr('transform', 'translate(0, ' + (height + paddingy - 85) + ')')
    .attr('id', 'x-axis')
    .call(xAxis)

  svg
    .append('text')
    .text('Year')
    .attr('class', 'label')
    .attr('x', (width + paddingx * 2) / 2)
    .attr('y', height - paddingy + 10)

  svg
    .append('g')
    .attr('transform', 'translate(' + paddingx + ', 0)')
    .attr('id', 'y-axis')
    .call(yAxis)

  svg
    .append('text')
    .text('Month')
    .attr('class', 'label')
    .attr('x', paddingx - 30)
    .attr('y', paddingy - 5)
})
