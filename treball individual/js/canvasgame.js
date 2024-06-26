import { game as gController } from "./memory.js";

var game_canvas = $('#game');
let canvas = game_canvas[0].getContext('2d');
if (canvas){
    // Inicialitzar CANVAS
    game_canvas.attr("width", 800);
    game_canvas.attr("height", 600);
    // ------------- START ------------
    // Load resources
    let resources = {};
    let cards = gController.init(()=>null); // Inicialitzar cartes
    let loadCardResource = function(src){
        if (!resources[src]){
            resources[src] = {image: null, ready: false}
            resources[src].image = new Image();
            resources[src].image.src = src;
            resources[src].image.onload = ()=> resources[src].ready = true;
        }
    }
    loadCardResource("../resources/back.png");
    cards.forEach(c=>loadCardResource(c.front));
    const c_w = 96;
    const c_h = 128;
    let selectCard = -1;
    let colliders = [];
    cards.forEach((_,indx)=>{
        colliders.push({
            xMin:()=>((selectCard==indx)?0:2)+100*indx,
            xMax:()=>2+100*indx + c_w + ((selectCard==indx)?2:0),
            yMin:()=>0,
            yMax:()=>c_h + ((selectCard==indx)?2:0),
            checkClick: function(x,y){
                return x >= this.xMin() && x <= this.xMax() && y >= this.yMin() && y <= this.yMax();
            }
        });
    });
    // Binding events
    const e_click = {click: false, x: -1, y: -1};
    let key = null;
    game_canvas.on("click", function(e){
        e_click.click = true;
        e_click.x = e.pageX - this.offsetLeft;
        e_click.y = e.pageY - this.offsetTop;
    });
    $(document).keydown(e=>key = e.key);
    // --------------------------------
    let checkInput = function(){
        if (e_click.click){
            selectCard = -1;
            cards.some((card, indx)=>{
                let click = colliders[indx].checkClick(e_click.x, e_click.y);
                if (click) gController.click(card);
                return click; 
            });
        }
        else if (key){
            if (key == "Escape")
                gController.save();
            if (key == "ArrowRight")
                selectCard = Math.min(selectCard + 1, cards.length - 1);
            else if (key == "ArrowLeft")
                selectCard = Math.max(selectCard - 1, 0);
            else if (key == "Enter" && selectCard >= 0)
                gController.click(cards[selectCard]);
        }
        e_click.click = key = false;
    }
    let draw = function(){
        canvas.reset();
        cards.forEach((card, indx)=>{
            if (resources[card.current].ready === true){
                let coll = colliders[indx];
                canvas.drawImage(resources[card.current].image, 
                    coll.xMin(), coll.yMin(), coll.xMax()-coll.xMin(), coll.yMax()-coll.yMin());
            }   
        });
    }
    // ------------- UPDATE -----------
    let gameLoop = function (){
        checkInput();
        draw();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
    // --------------------------------
}