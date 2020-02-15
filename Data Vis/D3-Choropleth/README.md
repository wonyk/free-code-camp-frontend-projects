# D3 Choropleth Map

This project is a Choropleth Map based on US education levels. It is created using D3.js.

It has fulfilled all the requirements of the '[Visualize Data with a Choropleth Map](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map)' task.

## Acknowledgements

To start off, I would like to thank MDN and w3schools for the helpful HTML, CSS and JS guides which serve as a great learning resource. Despite having completed multiple web dev tasks, these resources remained crucial in assisting with debugging and refreshing my knowledge.

Additionally, I appreciate D3.js for their effort in maintaining their [API](https://github.com/d3/d3/blob/master/API.md) which is my main source of learning and guidance for this project. As my third D3 project, this is one documentation I have referred to the most. Also, the wide array of available APIs have never failed to amaze me that almost every need can be fulfilled.

Next, I am grateful to Google for being the principal designer of the [Nato Sans](https://fonts.google.com/specimen/Noto+Sans) font, which is *also* hosted on Google Fonts.

Moreover, thank you to all the Stack Overflow contributors who showcase varying methods to accomplish some of the task's goals. (Special mention to those whose answers helped me with the tooltip and the d3 axes)

Lastly, kudos to [CSS Autoprefixer](https://autoprefixer.github.io/) for always reliably adding CSS support to older browsers.

## Supported Browsers

Tested working on Firefox 73.0+ (beta), Chrome 79+, Edge 44+ and above (in terms of css and functionality).

Unfortunately, IE is not supported because of multiple technical issues:

1. Promises APIs such as `then` are not supported by IE natively
2. D3 uses Fetch API that IE does not support and Babel does not polyfill Fetch by default
3. There are huge tradeoffs to maintain the project if Babel@5 as well as multiple Polyfills are used just to support IE

The CSS has a minimum theoretical support of the 'last 4 versions' on [browserl.ist](https://browserl.ist/?q=last%204%20versions).

The information is correct as of the latest commit. Should there be any discrepencies, please contact me for further arrangements.
