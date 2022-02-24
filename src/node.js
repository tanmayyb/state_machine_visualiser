class node {
    constructor(pos, id) {
        this.x = pos[0]
        this.y = pos[1]

        this.dim = [100, 70]

        this.node_id = id
        this.text = null

        this.editor_mode = false

        this.dragging = null
        this.activated = false

        this.connected = [];
        //this.color = 0;
    }

    // common function among all elements used to display element with p5.js functions
    display() {
        this.update_pos();

        beginShape()
        //if this.activated ==  true fill with green if not then fill with white
        this.check_activation()
        //make an ellipse with that fill
        strokeWeight(1)
        if (this.text == "ERROR" || this.text == "SYS_SHUTDOWN") {
            strokeWeight(2)
            stroke(255, 0, 0)
        }
        ellipse(this.x, this.y, this.dim[0], this.dim[1])
        stroke(0, 0, 0)
        fill(0, 0, 0)
        strokeWeight(0.1)
        textSize(12)
        if (this.text != null) {
            text(this.text, this.x, this.y)
        }
        strokeWeight(1)
        endShape()
        if (this.editor_mode) {
            text(this.node_id, this.x + 50, this.y + 50)
        }

        this.update_state()
    }

    update_text(string) {
        this.char_space = 10
        this.dim[0] = this.char_space * string.length
        this.text = string
    }

    return_id() {
        return this.node_id
    }

    attaches_at(loc) {
        //where dim is size and a,b are properties of ellipses
        let padding = 2
        let a = this.dim[0] / 2 + padding
        let b = this.dim[1] / 2 + padding
        var theta = 0

        if (loc == "b") { theta = -PI / 2 }
        if (loc == "t") { theta = PI / 2 }
        if (loc == "l") { theta = PI }
        if (loc == "r") { theta = 0 }

        if (loc == "tr") { theta = PI / 4 }
        if (loc == "tl") { theta = 3 * PI / 4 }
        if (loc == "bl") { theta = 5 * PI / 4 }
        if (loc == "br") { theta = 7 * PI / 4 }

        return [this.x + a * cos(theta), this.y - b * sin(theta)]

    }

    clicked() {
        if (dist(this.x, this.y, mouseX, mouseY) < 20) {
            this.dragging = true
            node.last_dragged = this
            return true
        }
        return false
    }

    update_pos() {
        if (this.dragging == true) {
            this.x = mouseX
            this.y = mouseY
        }
    }

    set_editor_mode(val) {
        this.editor_mode = val
    }
    check_activation() {
        if (this.activated) { fill(174, 243, 89) } else { fill(255, 255, 255) }
    }
    update_state(activation) {
        if (activation) { this.activated = true } else { this.activated = false }
    }


}
//static variables
node.last_dragged = null
node.active = null
