function json_formatter(nodes, arrows){
    var json = {"node_data": [], 
                "arrow_data": []}
    
    for(element of nodes){
        json.node_data.push({
            "position": [element.x, element.y],
            "text": element.text
        })
    }

    for(element of arrows){
        json.arrow_data.push({
            "start": element.start_node.node_id,
            "origin": element.origin, 
            "end": element.end_node.node_id, 
            "insertion": element.insertion,
            "cp1": [    element.cp_list[1].x,
                        element.cp_list[1].y],

            "cp2": [    element.cp_list[2].x,
                        element.cp_list[2].y] 

        })
    }
    return json
}