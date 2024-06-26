import { game as gController } from "./memory.js";

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlayScene');
        this.resources = [];
        this.cards = gController.init(()=>null); // Inicialitzar cartes
    }

    preload() {  
        this.cards.forEach((r)=>{
            if (!this.resources.includes(r.front))
                this.resources.push(r.front);
        });
        this.resources.push("../resources/back.png");
        this.resources.forEach((r)=>this.load.image(r,r)); // Primer paràmetre nom Segon paràmetre direcció
    }

    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        this.g_cards = this.physics.add.staticGroup();
        this.cards.forEach((c, i)=> this.g_cards.create(250 + 100*i, 300, c.current));

        this.g_cards.children.iterate((c, i) => {
            c.setInteractive();
            c.on('pointerup', ()=> gController.click(this.cards[i]));
        });
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }
}