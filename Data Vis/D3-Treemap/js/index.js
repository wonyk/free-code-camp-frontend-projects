let svg = d3.select('svg')
const width = 1000
const height = 600

d3.json(
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
).then(data => {
  // Create the tooltip
  let tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

  // Generate the tree
  let treemapLayout = d3.treemap()
  treemapLayout
    .size([width, height])
    .paddingOuter(2)
    .paddingInner(1)

  let rootNode = d3
    .hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value)

  const root = treemapLayout(rootNode)
  // Generate the colour scale
  let arrayKey = [''].concat(root.children.map(child => child.data.name))
  // There are 8 colours built in but we are using the last 7
  const color = d3.scaleOrdinal(arrayKey, d3.schemeDark2)
  // Draw the treemap
  const node = svg
    .selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x0}, ${d.y0})`)

  node
    .append('rect')
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('class', 'tile')
    .attr('fill', d => color(d.data.category))
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .on('mouseover', () => tooltip.style('opacity', 0.9))
    .on('mousemove', d => {
      let { name, category, value } = d.data
      tooltip
        .style('top', event.pageY - 50 + 'px')
        .style('left', event.pageX + 20 + 'px')
        .attr('data-value', value)
        .html(
          `<p>Name: ${name}</p><p>Category: ${category}</p><p>Box Office: $${value}</p>`
        )
    })
    .on('mouseout', () => tooltip.style('opacity', 0))

  node
    .append('text')
    .attr('class', 'text')
    .selectAll('tspan')
    .data(d => {
      const words = d.data.name.split(' ')
      let twoWords = []
      for (i = 0; i < words.length; i += 2) {
        if (words[i + 1]) twoWords.push(words[i] + ' ' + words[i + 1])
        else twoWords.push(words[i])
      }
      return twoWords
    })
    .enter()
    .append('tspan')
    .attr('x', 4)
    .attr('dy', (d, i) => 13)
    .text(d => d)

  // Create the legend
  let legend = svg.append('g').attr('id', 'legend')

  legend
    .selectAll('rect')
    .data(root.children.map(child => child.data.name))
    .enter()
    .append('rect')
    .attr('class', 'legend-item')
    .attr('x', (d, i) => {
      let remainder = i % 4
      return 100 + remainder * 220
    })
    .attr('y', (d, i) => {
      let quot = Math.floor(i / 4)
      return 650 + quot * 35
    })
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', d => color(d))

  legend
    .selectAll('text')
    .data(root.children.map(child => child.data.name))
    .enter()
    .append('text')
    .attr('class', 'legend-text')
    .attr('x', (d, i) => {
      let remainder = i % 4
      return 130 + remainder * 220
    })
    .attr('y', (d, i) => {
      let quot = Math.floor(i / 4)
      return 665 + quot * 35
    })
    .text(d => d)
})
