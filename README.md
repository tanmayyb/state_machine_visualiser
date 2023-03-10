# dummy_state_machine_2022


![state_machine](https://user-images.githubusercontent.com/72982560/213274442-7793da56-2c9e-4aa9-a363-e33621159c2c.png)



## Table of Contents

- [Authors](#authors)
- [Why does this repo exist?](#why-does-this-repo-exist?)


### Authors
Taskin Rahman and Tanmay Bishnoi.

### Why does this repo exist?
Let's say you need to show what 'state' the rover is in your video project. You want to show what its mind is doing atm. Is it waiting for you to give instructions? Is is scanning it's environment? etc.
You use a state machine to show that. Our webapp emulates a custom state machine with transitionable state, recorder and background transparency functionalities built in.  

### How to install/setup

1. Install [nvm][nvm] for windows (not necessary just recommended for use with npm).

2. Install npm (to install browser sync):
    ```bash
    nvm install node
    nvm use node
    ```
3. Install Browsersync using npm(to make the html page dynamic):
    ```bash
    npm install -g browser-sync
    ```
4. Clone repo into local folder (or download and extract .zip file if you're a simp):
    ```bash
    clone command goes here
    ```

### How to launch/use

Open CMD/Terminal/PowerShell IN YOUR DIRECTORY and enter:
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Unrestricted
```
Then enter this to launch the tool:
```
browser-sync start -s
```

Webscripts in the code:
p5.js
CCapture.js
(need internet when running index.html, don't need to download)

### Tutorials on how to use

How does the code work?
How to configure nodes:?
How to configure arrows:?
Check our wiki! (might not be updated :P)

### Who to call for help?
The main contributors - if they pick up. Worth a try though.

[nvm]: https://github.com/coreybutler/nvm-windows/releases "download nvm-windows"
