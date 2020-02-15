# D3 Bar Chart

This is a bar chart which has the Gross Domestic Product (GDP) of USA plotted against time. It is done as a task for Free Code Camp Data Visualization Projects #1.

It has fulfilled all the requirements of [Visualize Data with a Bar Chart](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-bar-chart) task.

## Acknowledgements

To start off, I would like to thank MDN and w3schools for the helpful HTML, CSS and JS guides which serve as a great learning resource. Both resources complement each other well such that W3 provides a good introduction while MDN reinforce the concept and build upon the technical details.

Next, I am grateful to Steve Matteson for the simple yet elegant [Open Sans](https://fonts.google.com/specimen/Open+Sans) font, which is hosted on Google Fonts.

Also, a shout out to all the great developers out there who are willing to showcase your D3 projects which serve as an inspiration to my project.

Moreover, Google's [Material Design Palette Tool](https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6002ee) has allowed me to pick suitable colours to enhance the aesthetics of the bar chart.

Lastly, kudos to [CSS Autoprefixer](https://autoprefixer.github.io/) for adding CSS support to older browsers.

## Supported Browsers

Tested working on Firefox 72.0+ (beta), Chrome 79+, Edge 44+ and above (in terms of css and functionality).

Unfortunately, IE is not supported because of multiple technical issues:

1. Promises such as `then` are not supported by IE natively
2. Even if Babel is used, D3 has Fetch API that IE does not support and Babel does not polyfill Fetch by default

The CSS has a minimum theoretical support of the 'last 4 versions' on [browserl.ist](https://browserl.ist/?q=last%204%20versions).

The information is correct as of the latest commit. Should there be any discrepencies, please contact me for further arrangements.
