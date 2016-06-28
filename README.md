#lv-client, The ripples Lecture Viewer Client
###Purpose of this Submodule
This repository is a submodule of the Lecture-Viewer system developed by the [ripples team at UMass Amherst](https://github.com/ripples). The purpose of lv-client is to serve the frontend of the application with docker-compose, as well as provide a development environment for future iterations of the project.

###Usage of this Submodule
To properly spin up and use the Lecture-Viewer server system for non-development purposes, use docker-compose from the head module. All dependencies will automatically be downloaded and mounted. For more information, please visit [lecture-viewer](https://github.com/stanleyrya/lecture-viewer).
Development Environments are described later in this README.

###Intended Submodule Capability
lv-client is intended to provide a web interface for Instructors and Students to have ease of access to their learning media created using other components of the system. Some notable features would be :
  * Viewing Lecture video, Slides, and Whiteboard images
  * Scrolling through a feed for available media
  * Managing enrollment as either a student or instructor
It should be able to accomplish this by working with the database and backend pieces of the application for proper data flow and structure.

###Development Environment and Requirements
####Installing Docker
To use this application for development, be sure to install [Docker](https://www.docker.com/). Docker is a tool used to create consistent environments for deployment and development across multiple platforms. Luckily, after installation and initialization of your docker-machine, we've done the hard work for you.

####Framework Familiarity
The frameworks and technologies to develop lv-client include:
  * [React](https://facebook.github.io/react/docs/top-level-api.html)
  * [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html)
  * [Broswerify](http://browserify.org/)
  * [Watchify](https://github.com/substack/watchify)
To download these dependencies, be sure to npm install at the base level of this repository.
All of these, Luckily, are mostly handled for you when developing and using this application. When developing frontend components, keep in mind that the scripts aren't pushed to the frontend until they are updated either through
```
npm run build
```
or
```
npm run bundle
```
The difference between the two is that ```npm run bundle``` will continue to update as the code is changed. see watchify and browserify docs for more information on that.

The included scripts in package.json are available for easy Docker Development and other neccessary functions for development.
