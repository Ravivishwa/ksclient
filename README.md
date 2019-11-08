Prerequisites
---

* NodeJS 8+
* Yarn

Dev Setup
---

* `yarn install`
* `yarn start`

Production Build
---
* Test:
`yarn start:production`
* Build:
`yarn build`

Features
---

#### Quick scaffolding
Create components, containers, routes, selectors and sagas

`yarn generate`


#### Dependency size test
This command will generate a stats.json file from your production build, which you can upload to the webpack analyzer or Webpack Visualizer. This analyzer will visualize your dependencies and chunks with detailed statistics about the bundle size.

`yarn analyze`


#### Linting
This command Lints your JavaScript and your CSS.

`yarn lint`

This command Lints your code and tries to fix any errors it finds.

`yarn lint:eslint:fix -- .`
