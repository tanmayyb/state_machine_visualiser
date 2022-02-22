/*
#########################################
Authors:            Tanmay B.(@tanmayyb), Taskin R.(navid.rahman@ryerson.ca), Syed ()
Created:            27-01-2021 
Lang used:          JS
Dependencies used:  p5.js
Main program file:  index.html (run through browser-sync for sync. processing)
Relative files:     sketch.js (for actual JS), data.json (for saves) and node.js, arrow.js, cpoint.js, json_formatter.js
#########################################
npm install browser sync
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
browser-sync start --server --directory --files "*"
#########################################
*/

let json = {}
let nodes = []
let arrows = []
const points = ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
//default editor mode set as 'false'
let editor_mode_variable = false
let recording = false

var fps = 60;
// the canvas capturer instance
var capturer = new CCapture({
  format: 'png',
  framerate: fps
});

function preload() {
  //load contents of JSON file into "json" variable synchronously
  json = loadJSON('./data/data.json');
  console.log("loaded data.json")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  init_sketch_settings()
  //fill list of nodes and arrows
  setup_nodes(json.node_data)
  console.log("node setup done")
  setup_arrows(json.arrow_data)
  connect_nodes()
  node.active = nodes[0]
  console.log("arrow setup done")
  frameRate(fps)
}

// Sets up linked-list of nodes
function connect_nodes() {
  for (let arrow of arrows) {
    if (arrow.start_node != null && arrow.end_node != null) {
      arrow.start_node.connected[points.indexOf(arrow.origin)] = arrow.end_node
      arrow.end_node.connected[points.indexOf(arrow.insertion)] = arrow.start_node
    }
  }
}

// Main loop
function draw() {
  clear()

  node.active.update_state(true)
  display(nodes)
  display(arrows)
  //render_text(arrows, json.arrow_data)
  update_recorder(recording)
}

// function setup_text(text_data) {
//   for (let obj of text_data) {
//     texts.push((obj.position, obj.text))
//   }
// }

// Uses arrow data from data.json to generate list of arrow objects.
function setup_nodes(node_data) {
  for (let [index, data_entry] of node_data.entries()) {
    //pushed node to list with saved position and index
    nodes.push(new node(data_entry.position, index))
    //updated the node's text
    nodes[index].update_text(data_entry.text)
  }
}

// Uses arrow data from data.json to generate list of arrow objects.
function setup_arrows(arrow_data) {
  for (let data_entry of arrow_data) {
    //push saved arrow to the list of arrows
    arrows.push(new arrow(nodes[data_entry.start],
      data_entry.origin,
      data_entry.cp1,
      data_entry.cp2,
      nodes[data_entry.end],
      data_entry.insertion,
      data_entry.text))
  }
}

//this function is used in draw()
function display(list) {
  for (let element of list) {
    //both node and arrow classes have display function
    element.display()
  }
}

// function render_text(arrows, arrow_data) {
//   for (let arrow of arrows) {
//     let x = bezierPoint(arrow.start().x, arrow.cp1().x, arrow.cp2().x, arrow.end().x, 1 / 2)
//     let y = bezierPoint(arrow.start().y, arrow.cp1().y, arrow.cp2().y, arrow.end().y, 1 / 2)
//     //text(, x, y)
//   }
// }

//check which node/arrow is clicked
function mousePressed() {
  //check node list for click
  for (let node of nodes) {
    if (node.clicked()) {
      node.update_pos();
    }
  }
  //check arrow list for click
  for (let arrow of arrows) {
    if (arrow.clicked()) {
      arrow.update_pos();
    }
  }
}

//reset clicked states
function mouseReleased() {
  if (arrow.last_dragged_cp != null) {
    arrow.last_dragged_cp.is_dragging(false)
    arrow.last_dragged_cp = null
  }
  if (node.last_dragged != null) {
    node.last_dragged.dragging = false
    node.last_dragged = false
  }
}

//sketch settings
function init_sketch_settings() {
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER)
  bezierDetail(20);
}

// Checking for user input
function keyPressed() {
  //to log keypresses
  //console.log("key_pressed: "+keyCode)
  
  //if save command is invoked
  if (key == 's') {
    saveJSON(json_formatter(nodes, arrows), 'data')
    // for (let node of nodes) {
    //   console.log(node.node_id + ":\n")
    //   for (let n of node.connected) {
    //     if (n != null) {
    //       console.log(n.node_id)
    //     }
    //   }
    //   console.log("\n")
    // }
    //for troubleshooting:
    //console.log(json_formatter(nodes, arrows))
    //console.log(json)
  }
  //if editor mode command is invoked
  if (key == 'e') {
    editor_mode_variable = !editor_mode_variable
    console.log("editormode status:", editor_mode_variable)
    editor_mode(editor_mode_variable)
  }
  //if recording command is invoked
  if (key == 'r') {
    //recorder is false at first
    recording = !recording
    //makes recording true
    if (!recording) {
      noLoop()
      console.log('recording finished')
      capturer.stop()
      capturer.save()
      return
    }
    capturer.start()
    console.log('recording started')
  }

  if (keyCode >= 97 && keyCode <= 104) {
    n = keyCode - 97
    if (node.active.connected[n] != null) {
      transition(node.active.connected[n])
    }
  }
}

// Changes active node from one to the other hence transitions states
function transition(next_node) {
  node.active.update_state(false)
  node.active = next_node
  next_node.update_state(true)
}

// Updates recording
function update_recorder(recording) {
  if (recording) {
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
}

// Allows user to change positions of nodes, and adjust shape of arrows
function editor_mode(val) {
  for (element of nodes) {
    element.set_editor_mode(val)
  }
  for (element of arrows) {
    element.set_editor_mode(val)
  }
}