class cpoint{
    constructor(array, id){
      this.x = array[0]
      this.y = array[1]
      
      this.color = {red:0,green:0,blue:0}
      this.strokeWeight = 10

      this.visibility = false
      this.clickability = false

      this.dragging = false
      
      this.set_cp(id)
      
    }
    
    set_cp(id){
      if(id == 1){
            this.clickability = true
            this.update_color(255, 0, 0);
        } 
      if(id == 2){
            this.clickability = true
            this.update_color(0, 0, 255);
        }
    }
    
    pos(){
      return [this.x, this.y]
    }
    
    update_color(r,g,b){
      this.color.red = r
      this.color.green = g
      this.color.blue = b
    }
    
    display(){
        this.update_pos()
        stroke(this.color.red, this.color.green, this.color.blue)
        strokeWeight(this.strokeWeight)
        if(this.visibility==true){
            point(this.x, this.y)
        }
        stroke(0,0,0)
        strokeWeight(1)

    }
    
    is_dragging(val){
        if(this.clickability == true){
            this.dragging = val
            if(this.dragging == true){
                this.update_pos();
                }
        }
    }
    update_pos(argument){
        if(arguments.length == 0){
            if(this.dragging == true){
                this.x = mouseX
                this.y = mouseY
            }
        }
        else if (arguments.length == 1){
            this.x = argument[0]
            this.y = argument[1]
        }
    }

    set_editor_mode(val){
      this.visibility = val  
    }
    update_x(x){
      this.x = x
    }
    update_y(y){
      this.y = y
    }
    
  }