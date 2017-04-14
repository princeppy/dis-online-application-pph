#DIS Admission Application
dis-admission-application

##Setting Up environment 
* follow [Install Multiple Versions of Node.js using nvm](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)
* [Node Version Manager](https://github.com/creationix/nvm#install-script)
* [How I Setup Angular + Node Projects](http://start.jcolemorrison.com/how-i-setup-angular-node-projects/) (depricated)
    Make sure the following packages are installed
    ```
    npm install -g express
    npm install -g yo
    npm install -g generator-angular
    npm install -g generator-karma
    npm install -g express-generator
    npm install -g bower
    npm install -g nodemon
    ```
* [Yeoman generator for AngularJS](https://github.com/yeoman/generator-angular)
    ```
    npm install -g grunt-cli bower yo generator-karma generator-angular express express-generator
    ```
##Setting Up The Project
*   
```
cd <projectfolder>/client
bower cache clean
npm cache clean
yo angular
npm list
npm prune
npm list
```