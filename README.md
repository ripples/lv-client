# lv-client
This repository is a submodule of the [Lecture-Viewer](https://github.com/ripples/lecture-viewer) system developed by the [ripples team at UMass Amherst](https://github.com/ripples). 

The purpose of lv-client is to act as the frontend web interface for the [Lecture-Viewer](https://github.com/ripples/lecture-viewer) microservice stack.
It allows instructors and students to have ease of access to their learning media created using other components of the system.


### How to run
We only support running lv-media through docker and docker-compose. Follow the instructions in the [parent](https://github.com/ripples/lecture-viewer) repository readme


### Documentation
ESDoc is being used for documentation and documentation generation. 
To use it, run `npm run doc` in this folder and open source.html of the created esdoc folder. 
Please refer to the [ESDoc documentation](https://esdoc.org/) for how to implement.


### Code style
We adhere to the [ESLint Google style guide](https://github.com/google/eslint-config-google).
Please follow this style guide to maintain a high quality repository.


### Core Technologies used
* [Docker](http://docker.io/)
* [React](https://facebook.github.io/react/docs/top-level-api.html)
* [React-Redux](https://github.com/reactjs/react-redux)
* [Babel](https://babeljs.io/)
* [Gulp](http://gulpjs.com/)
* [Webpack](https://webpack.github.io/)
* [ESLint](http://eslint.org/)
* [ESDoc](https://esdoc.org/)
