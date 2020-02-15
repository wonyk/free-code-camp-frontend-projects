let svg = d3.select('svg')
const width = svg.attr('width')
const height = svg.attr('height')

// Geo Paths for Counties
let path = d3.geoPath()

const run = async () => {
  const edu = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  )
  const us = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  )
  // Do stuff after the fetches
  ready(edu, us)
}
run()

const ready = (edu, us) => {
  // Prepare the legend
  let legend = svg.append('g').attr('id', 'legend')
  const max = d3.max(edu, d => d.bachelorsOrHigher)
  const start = 650
  const end = 850
  // Color scale
  const blues = d3
    .scaleThreshold()
    .domain(d3.range(0, max, max / 6))
    .range(d3.schemeBlues[6])

  // Value scale
  const xScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([start, end])

  const xAxis = d3
    .axisBottom(xScale)
    .tickValues(d3.range(0, max, max / 6))
    .tickSizeOuter(0)

  legend
    .append('g')
    .attr('transform', 'translate(0, 70)')
    .attr('id', 'scale')
    .call(xAxis)

  // Fill in the colour rectangles
  legend
    .selectAll('rect')
    .data(d3.schemeBlues[6])
    .enter()
    .append('rect')
    .attr('width', (end - start) / 6)
    .attr('height', 25)
    .attr('x', (d, i) => start + (i * (end - start)) / 6)
    .attr('y', 70 - 25)
    .attr('fill', (d, i) => d)

  // Create tooltips
  let tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

  // Convert and create the US Map using topojson and d3 geoPath
  const geojson = topojson.feature(us, us.objects.counties)
  svg
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(geojson.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'county')
    .attr('data-fips', d => d.id)
    .attr('data-education', d => {
      let index = edu.findIndex(data => data.fips === d.id)
      return edu[index].bachelorsOrHigher
    })
    .attr('fill', d => {
      let index = edu.findIndex(data => data.fips === d.id)
      return blues(edu[index].bachelorsOrHigher)
    })
    .on('mouseover', () => tooltip.style('opacity', 1))
    .on('mousemove', d => {
      const educationData = edu.filter(data => data.fips === d.id)
      const { state, area_name, bachelorsOrHigher } = educationData[0]
      tooltip
        .html(`<p> ${area_name}, ${state}: ${bachelorsOrHigher}%</p>`)
        .style('left', d3.event.pageX + 15 + 'px')
        .style('top', d3.event.pageY - 70 + 'px')
        .attr('data-education', bachelorsOrHigher)
    })
    .on('mouseout', () => tooltip.style('opacity', 0))
}
