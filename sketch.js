/*
#########################################
Authors:             Tanmay B.(@tanmayyb), Taskin R. (), Syed _()
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
//default editor mode set as 'false'
let editor_mode_variable = false

function preload(){
  //load contents of JSON file into "json" variable synchronously
  json = loadJSON('./data/data.json');
  console.log("loaded json")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  init_sketch_settings()
  //fill list of nodes and arrows
  setup_nodes(json.node_data)
  console.log("node setup done")
  setup_arrows(json.arrow_data)
  console.log("arrow setup done")
}

function draw() {
  clear()
  display(arrows)
  display(nodes)
}

function setup_nodes(node_data){
  for(let [index, data_entry] of node_data.entries()){
    //pushe node to list with saved position and index
    nodes.push(new node(data_entry.position, index))
    //updated the node's text
    nodes[index].update_text(data_entry.text)
  }
}

function setup_arrows(arrow_data){
  for(let data_entry of arrow_data){
    //push saved arrow to the list of arrows
    arrows.push(new arrow(  nodes[data_entry.start], 
                            data_entry.origin, 
                            data_entry.cp1, 
                            data_entry.cp2, 
                            nodes[data_entry.end], 
                            data_entry.insertion))
  }
}

//this function is used in draw()
function display(list){
  for(let element of list){
    //both node and arrow classes have display function
    element.display()
  }
}

//check which node/arrow is clicked
function mousePressed() {
  //check node list for click
  for(let node of nodes){
    if(node.clicked()){
      node.update_pos();
    }
  }
  //check arrow list for click
  for(let arrow of arrows){
    if(arrow.clicked()){
      arrow.update_pos();
    }
  }
}

//reset clicked states
function mouseReleased() {
  if(arrow.last_dragged_cp != null){
  arrow.last_dragged_cp.is_dragging(false)
  arrow.last_dragged_cp = null
  }
  if(node.last_dragged!=null){
    node.last_dragged.dragging = false
    node.last_dragged = false
  }
}

//sketch settings
function init_sketch_settings(){
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER)
  bezierDetail(20);
}

function keyPressed(){
  //if save command is invoked
  if(key == 's'){  
    saveJSON(json_formatter(nodes, arrows), 'data')
    //for troubleshooting:
    //console.log(json_formatter(nodes, arrows))
    //console.log(json)
  }
  //if editor mode command is invoked
  if(key=='e'){
    editor_mode_variable = !editor_mode_variable
    console.log(editor_mode_variable)
    editor_mode(editor_mode_variable)
  }
}

function editor_mode(val){
    for(element of nodes){
      element.set_editor_mode(val)
    }
    for(element of arrows){
      element.set_editor_mode(val)
    }
}