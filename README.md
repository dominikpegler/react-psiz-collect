# react-psiz-collect

React version of [psiz-collect](https://github.com/psiz-org/psiz-collect) experiment
* with `<script>` tags only (no toolchains, no bundler)  
* conversion from JSX to browser compatible JavaScript is done by running watcher script `jsx_preprocessor.sh`. This requires the following 2 steps:  
      1. Run `npm init -y`   
      2. Run `npm install babel-cli@6 babel-preset-react-app@3`  

## Prepare experiment

* Stimulus images must be placed in `assets/img/` folder and referenced in `imgPaths.js` 
* Create `config.js` and `config.json` from the example files  
* Place SSL certificate as `cert.pem` and private key as `key.pem`  in repo's root directory 

## Run
* `docker-compose up`
      
## Open experiment in browser
* `https://<SERVER_URL>/?project_id=<PROJECT_ID> `  

