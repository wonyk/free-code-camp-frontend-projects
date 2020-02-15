# D3 Scatterplot

An attempt to create a scatterplot of the fastest 35 ascends by professional cyclists on Alpe d'Huez for Tour de France.

It has fulfilled all the requirements of [Visualize Data with a Scatterplot Graph](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-scatterplot-graph) task.

## Acknowledgements

To start off, I would like to thank MDN and w3schools for the helpful HTML, CSS and JS guides which serve as a great learning resource. Both resources complement each other well such that W3 provides a good introduction while MDN reinforce the concept and build upon the technical details.

Next, I am thankful to Christian Robertson for the nice looking and fitting [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed) font, which is hosted on Google Fonts.

Additionally, I appreciate D3.js for their effort in constantly updating their [API](https://github.com/d3/d3/blob/master/API.md) which is my main source of learning and guidance for this project.

Moreover, thank you to all the Stack Overflow contributors who showcase varying methods to accomplish some of the task's goals.

Lastly, kudos to [CSS Autoprefixer](https://autoprefixer.github.io/) for adding CSS support to older browsers.

## Supported Browsers

Tested working on Firefox 72.0+ (beta), Chrome 79+, Edge 44+ and above (in terms of css and functionality).

Unfortunately, IE is not supported because of multiple technical issues:

1. Promises such as `then` are not supported by IE natively
2. Even if Babel is used, D3 has Fetch API that IE does not support and Babel does not polyfill Fetch by default.
3. Although using Babel@5, Fetch and promises polyfills can work, the performance and time trade-off to maintain would overweigh the current state of the website.

The CSS has a minimum theoretical support of the 'last 4 versions' on [browserl.ist](https://browserl.ist/?q=last%204%20versions).

The information is correct as of the latest commit. Should there be any discrepencies, please contact me for further arrangements.
