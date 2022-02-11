class node{
    constructor(pos, id){
        this.x = pos[0]
        this.y = pos[1]

        this.dim = [100, 70]
        
        this.node_id = id
        this.text = null

        this.editor_mode = false

        this.dragging = null
        this.activated = 0
        //this.color = 0;
    }
  
    display(){
        this.update_if_clicked();

        beginShape()
        this.check_activation()
        ellipse(this.x, this.y, this.dim[0], this.dim[1])
        fill(0,0,0)
            strokeWeight(0.1)
            if(this.text!=null){
                text(this.text, this.x, this.y)
            }
            strokeWeight(1)
        endShape()
        
        if(this.editor_mode){
            text(this.node_id,this.x+50,this.y+50)
        }

        this.update_state()
    }

    update_text(string){
        this.char_space = 10
        this.dim[0] = this.char_space*string.length
        this.text = string
    }
  
    return_id(){
      return this.node_id
    }

    attach_at(loc){
        if(loc == "b"){ return [this.x, this.y + this.dim[1]/2]}
        if(loc == "t"){ return [this.x, this.y - this.dim[1]/2]}
        if(loc == "l"){ return [this.x - this.dim[0]/2, this.y]}
        if(loc == "r"){ return [this.x + this.dim[0]/2, this.y]}
    }

    clicked(){
        if(dist(this.x, this.y, mouseX, mouseY)<20){
            this.dragging = true
            node.last_dragged = this
            return true
          
        }
        return false
      }

      update_if_clicked(){
        if(this.dragging == true){
            this.x = mouseX
            this.y = mouseY
        }
      }

    set_editor_mode(val){
        this.editor_mode = val
    }
    check_activation(){
        if ( this.activated ) { fill(174, 243, 89) } else { fill(255,255,255) }
    }
    update_state(activation){
        if ( activation ) { this.activated = true } else { this.activated = false }
    }
  
  }

  node.last_dragged = null