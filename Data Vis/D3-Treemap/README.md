# D3 Choropleth Map

This project is a tree map of the top 100 grossing movies grouped by their genres. It is created using D3.js.

It has fulfilled all the requirements of the '[Visualize Data with a Treemap Diagram](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-treemap-diagram)' task.

## Acknowledgements

To start off, I would like to thank MDN and w3schools for the helpful HTML, CSS and JS guides which serve as a great learning resource. Despite having completed multiple web dev tasks, these resources remained crucial in assisting with debugging and refreshing my knowledge.

Additionally, I appreciate D3.js for their effort in maintaining their [API](https://github.com/d3/d3/blob/master/API.md) which is my main source of learning and guidance for this project. As my fifth D3 project, I am still amazed and wowed by the fact that D3 has built in APIs to create appealing [trees, treemaps and packs](https://github.com/d3/d3-hierarchy/tree/v1.1.9#d3-hierarchy) etc. Without FreeCodeCamp, I would not have delved so deep into their APIs. With this, I will continue to explore D3 and use it to the fullest potential.

This is reinforced by the extraordinary array of community created projects including the ones which is similar to what I need to create for this task. Thanks to [observablehq](https://observablehq.com/explore) and [bl.ocks](https://bl.ocks.org/) for making this possible.

Next, I am grateful to Eben Sorkin and Christian Robertson for being the principal designer of the [Gelasio](https://fonts.google.com/specimen/Gelasio) and [Roboto](https://fonts.google.com/specimen/Roboto) respectively, which are hosted on Google Fonts.

Lastly, kudos to [CSS Autoprefixer](https://autoprefixer.github.io/) for always reliably adding CSS support to older browsers.

## Supported Browsers

Tested working on Firefox 73.0+ (beta), Chrome 79+, Edge 44+ (EdgeHTML) and above (in terms of css and functionality).

Unfortunately, IE is not supported because of multiple technical issues:

1. Promises APIs such as `then` are not supported by IE natively
2. D3 uses Fetch API that IE does not support and Babel does not polyfill Fetch by default
3. There are huge tradeoffs to maintain the project if Babel@5 as well as multiple Polyfills are used just to support IE

The CSS has a minimum theoretical support of the 'last 4 versions' on [browserl.ist](https://browserl.ist/?q=last%204%20versions).

The information is correct as of the latest commit. Should there be any discrepencies, please contact me for further arrangements.
