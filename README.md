# castlabs-exercise
This is a castslab given exercise to get detailed information from a .MP4 container. 
This is the stream url. 
```bash
https://demo.castlabs.com/tmp/text0.mp4
```

I didn't use any js framework or third parties for this assignment. It's a core JavaScript solution using Module Pattern.
And modules can't be load without `live-server`.

# Project Folder/File Structure
We have `index.html`. This is the starting point. Then we have a folder `module`. This `module` folder contains multiple core JavaScript modules.
`module/index.js` is the main file that will import other modules, and we have two more modules. First is `module/constants` and second is `module/loadMPFFiles`.
In this `module/loadMPFFiles` module we have calculating box size, determine type or data.
# How To Run Assignment 
Since we are using Module, browsers are unable to run project without a server.
```bash
npm install live-server -g
```
you have to install `live-server` it's a simple node package. Before `live-server` you should have installed `node` in your machine.

After installation go to the project directory and just type `live-server .`
It should open `localhost:8080` in your default browser.

Here you go you can see output in your console as well as images that will be fetched from the MDAT box and loaded into the browser.