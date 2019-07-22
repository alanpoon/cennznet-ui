import $ from "jquery"
require("./d3.v2.min.js");
const d3 = window.d3;
require("./d3-floorplan/src/floorplan");
require("./d3-floorplan/src/heatmap");
require("./d3-floorplan/src/imagelayer");
require("./d3-floorplan/src/overlays");
require("./d3-floorplan/src/pathplot");
require("./d3-floorplan/src/vectorfield");
import gentleman_image from "../static/magician.svg";
import lady_image from "../static/lady.svg";
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}
export default function execute(image,gentleman,lady){
    $("#pay_but").data("href","/#/xpay/belanja?diner="+lady+"&type=belanja_pay");
    $("#invoice_but").data("href","/#/xpay/belanja?diner="+lady+"&type=belanja_statement");
    $("#diner_panel").html(lady);
     d3.xml(gentleman_image,function(xml){
        d3.xml(lady_image,function(xml_lady){
            var data = {
                "heatmap": {
                    "binSize": 3,
                    "units": "\u00B0C",
                    "map": [
                        {"x": 21, "y": 12, "value": 20.2,id:1},
                        {"x": 24, "y": 12, "value": 19.9,id:2,icon:gentleman_image},
                        {"x": 27, "y": 12, "value": 19.7,id:3},
                        {"x": 30, "y": 12, "value": 19.7,id:4},
                        {"x": 21, "y": 15, "value": 20.5,id:5},
                        {"x": 24, "y": 15, "value": 19.3,id:6},
                        {"x": 27, "y": 15, "value": 19.4,id:7},
                        {"x": 30, "y": 15, "value": 19.9,id:8},
                        {"value": 19.9, id:9,"points": [{"x":2.513888888888882,"y":8.0},
                                                   {"x":6.069444444444433,"y":8.0},
                                                   {"x":6.069444444444434,"y":5.277535934291582},
                                                   {"x":8.20833333333332,"y":2.208151950718685},
                                                   {"x":13.958333333333323,"y":2.208151950718685},
                                                   {"x":16.277777777777825,"y":5.277535934291582},
                                                   {"x":16.277777777777803,"y":10.08151950718685},
                                                   {"x":17.20833333333337,"y":10.012135523613962},
                                                   {"x":17.27777777777782,"y":18.1387679671458},
                                                   {"x":2.513888888888882,"y":18.0}]}]
                    },
                "vectorfield": {
                    "binSize": 3,
                    "units": "ft/s",
                    "map": [
                        {"x": 18, "y": 21, "value": {"x": 4, "y": 3}},
                        {"x": 21, "y": 21, "value": {"x": 3, "y": 3}},
                        {"x": 18, "y": 24, "value": {"x": 1, "y": 2}},
                        {"x": 21, "y": 24, "value": {"x": -3, "y": 4}},
                        {"x": 24, "y": 24, "value": {"x": -4, "y": 1}}]
                    },
                "pathplot": [{
                    "id": "flt-1",
                    "classes": "planned",
                    "points": [{"x": 23.8, "y": 30.6},{"x": 19.5, "y": 25.7},{"x": 14.5, "y": 25.7},{"x": 13.2, "y": 12.3}]
                    }]
                };
        
                var xscale = d3.scale.linear()
                           .domain([0,50.0])
                           .range([0,500]),
                yscale = d3.scale.linear()
                           .domain([0,33.79])
                           .range([0,380]),
                map = d3.floorplan().xScale(xscale).yScale(yscale),
                imagelayer = d3.floorplan.imagelayer(),
                heatmap = d3.floorplan.heatmap(),
                vectorfield = d3.floorplan.vectorfield(),
                pathplot = d3.floorplan.pathplot(),
                overlays = d3.floorplan.overlays().editMode(true),
                mapdata = {};
            
            mapdata[imagelayer.id()] = [{
                url: image,
                x: 0,
                y: 0,
                height: 33.79,
                width: 50.0
                 }];
            
            map.addLayer(imagelayer)
               .addLayer(heatmap)
               .addLayer(vectorfield)
               .addLayer(pathplot)
               .addLayer(overlays);
            
            
            mapdata[heatmap.id()] = data.heatmap;
            mapdata[overlays.id()] = data.overlays;
            mapdata[vectorfield.id()] = data.vectorfield;
            mapdata[pathplot.id()] = data.pathplot;
            
            var svg = d3.select("#demo").append("svg");
        
                //.attr("height", 487).attr("width",720)
                svg.attr("height", 380).attr("width",500)
                .attr("id","svg_canvas")
                .datum(mapdata).call(map);
               
            data.heatmap.map.forEach(function(d) {
                if (d.id ==gentleman){
                    var g_gentleman = makeSVG("g",[]);
                    g_gentleman.setAttribute("transform","translate("+xscale(d.x)+","+yscale(d.y)+")");
                    g_gentleman.setAttribute("class","gentleman");
                    var ch = xml.documentElement.children;
                    for (var i=0;i<ch.length;i++){
                        g_gentleman.append(ch[i]);
                    }
                    document.getElementsByClassName("map-layers")[0].append(g_gentleman);
                   
                }else if (d.id ==lady){
                    var g =makeSVG("g",[]);
                    g.setAttribute("transform","translate("+xscale(d.x)+","+yscale(d.y)+")scale(0.1)")
                    g.setAttribute("id","lady");
                    
                    var ch = xml_lady.documentElement.children;
                    for (var i=0;i<ch.length;i++){
                        g.append(ch[i]);
                    }
                    document.getElementsByClassName("map-layers")[0].append(g);
                    $("#lady").data("diner",d.id);
                    $("#lady").click(function(){
                        var id = $(this).data("diner");
                        $("#diner_panel").html(id);
                        $("#pay_but").data("href","/#/xpay/belanja?diner="+id+"&type=belanja_pay");
                        $("#invoice_but").data("href","/#/xpay/belanja?diner="+id+"&type=belanja_statement");
                    })
                }else{

                }
            })
    })
});
    $("#pay_but").click(function(){
        var href = $(this).data("href");
        window.location.href = href;
    });
    $("#invoice_but").click(function(){
        var href = $(this).data("href");
        window.location.href = href;
    });
}