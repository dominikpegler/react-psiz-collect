# react-psiz-collect

(work in progress)

React version of [psiz-collect](https://github.com/psiz-org/psiz-collect) experiment
* with `<script>` tags only
* no toolchains, no bundler necessary
* conversion from JSX to browser compatible JavaScript is done by running watcher script `jsx_preprocessor.sh`. This requires the following 2 steps:  
      1. Run `npm init -y`   
      2. Run `npm install babel-cli@6 babel-preset-react-app@3`  
* Stimulus images must be placed in `assets/img/` folder and referenced in `imgPaths.js`  
* final version should be tied to a flask or fastapi backend and integrable into [dallinger](https://dallinger.readthedocs.io)
      
      
