class arrow{
    constructor(start_node, origin, cp1, cp2, end_node, insertion){
        this.cp_list = []
        this.cpoints = [cp1,cp2]

        this.start_node = start_node
        this.end_node = end_node
        this.origin = origin
        this.insertion = insertion

        this.cp_list.push(new cpoint(this.start_node.attaches_at(this.origin), 0))
        this.cp_list.push(new cpoint(cp1, 1))
        this.cp_list.push(new cpoint(cp2, 2))
        this.cp_list.push(new cpoint(this.end_node.attaches_at(this.insertion), 3))

        this.editor_mode = true
      }
  
    start(){
      return this.cp_list[0]
    }
     cp1(){
      return this.cp_list[1]
    }
     cp2(){
      return this.cp_list[2]
    }
     end(){
      return this.cp_list[3]
    }
    
    draw_bcurve(){
      noFill()
      beginShape()
      vertex(this.start().x, this.start().y)
      bezierVertex(this.cp1().x, this.cp1().y, 
                   this.cp2().x, this.cp2().y, 
                   this.end().x, this.end().y)
      endShape()
    }
    
    draw_triangle(){
      push()
    translate(this.end().x, this.end().y)
    fill(0,0,0)
    this.tx = bezierTangent(this.start().x, 
                       this.cp1().x, 
                       this.cp2().x, 
                       this.end().x,1)
    
    this.ty = bezierTangent(this.start().y, 
                       this.cp1().y, 
                       this.cp2().y, 
                       this.end().y,1)
    
    this.a = atan2(this.ty, this.tx)
      
    rotate(this.a)
    scale(3)
    triangle(-0.1, -0.1, -5, 2, -5, -2)
    pop()
      
    }
    //to update position
    update_pos(){
      for(let cp_ of this.cp_list){
          cp_.update_pos()
      }
    }
    
    clicked(){
      for(let cp_ of this.cp_list){
        let pos = cp_.pos()
        if(dist(pos[0],pos[1], mouseX, mouseY)<10){
          cp_.is_dragging(true)
          arrow.last_dragged_cp = cp_
          arrow.last_clicked_arrow = this
          return true
        }
      }
      return false
    }
    
    update_endpoints(){
        this.cp_list[0].update_pos(this.start_node.attaches_at(this.origin))
        this.cp_list[3].update_pos(this.end_node.attaches_at(this.insertion))
    }

    display(){
      
     for(let cp_ of this.cp_list){
          cp_.display()
          
      }
      this.update_endpoints()
      this.draw_bcurve()
      this.draw_triangle()
    }

    set_editor_mode(val){
      this.editor_mode = val
      for(let i = 1;  i<2+1;i++){
          this.cp_list[i].set_editor_mode(val)
      }
    }
  }
  arrow.last_clicked_arrow = null
  arrow.last_dragged_cp = null
