import ValidateConfig from "./validate.js";
import Game from "./p4.js"

export default class Config extends ValidateConfig {
    //gere les parametres de la game 

    // la creation des joueurs 
    // ainsi que leur couleurs 
    // leur nom 

    static player_counter = 1;

    constructor() {
        super();
        this.colors = ["#000000","#F90F14","#2ED600","#283FD6"]
        this.players = [];
        this.setTitle();
        this.setSettingRC();
        this.setSettingPlayers();

        this.setButtonStart();
        this.setDOM();

    }

    setTitle() {
        this.title = document.createElement("div");
        this.title.classList.add("title_container");
        const p = document.createElement("p");
        p.textContent = "GAME SETTINGS";
        this.title.appendChild(p);

    }

    setSettingRC() {
        this.rc = document.createElement("div");
        this.rc.classList.add("rc_container");
        const divRow = document.createElement("div");
        divRow.classList.add("r_container");
        const prow = document.createElement("p");
        prow.textContent = "ROW";
        divRow.appendChild(prow);
        this.input1 = document.createElement("input");
        this.input1.setAttribute("type", "number");
        divRow.appendChild(this.input1);
        const divColl = document.createElement("div");
        divColl.classList.add("r_container");
        const pcol = document.createElement("p");
        pcol.textContent = "COLUMN";
        divColl.appendChild(pcol);
        this.input2 = document.createElement("input");
        this.input2.setAttribute("type", "number");
        divColl.appendChild(this.input2);

        this.rc.appendChild(divRow);
        this.rc.appendChild(divColl);

    }

    setSettingPlayers() {

        this.playersSettings = document.createElement("div");
        this.playersSettings.classList.add("players_container");

        //declaration 
        function createPlayerDiv(msg, obj) {

            const div_player = document.createElement("div");
            const p = document.createElement("p");
            p.textContent = msg;
            div_player.appendChild(p);
            const div_inputs = document.createElement("div");
            const input_name = document.createElement("input");
            input_name.setAttribute("type", "text");
            
            //MANAGE COLORS 

            const input_color = document.createElement("input");
            input_color.setAttribute("type", "color");
            input_color.setAttribute("value",obj.colors[0]);
            obj.colors.shift()


            div_inputs.appendChild(input_name);
            div_inputs.appendChild(input_color);
            div_player.appendChild(div_inputs);
            obj.players.push({name:input_name,color:input_color,moves:[],score:0})
            obj.playersSettings.appendChild(div_player);
            Config.player_counter++;
        }

        createPlayerDiv(`PLAYER ${Config.player_counter} NAME`, this);
        createPlayerDiv(`PLAYER ${Config.player_counter} NAME`, this);

        //BUTTON ADD NEW PLAYER

        this.buttonAdd = document.createElement("button");
        this.buttonAdd.textContent = "+ PLAYER";

        this.buttonAdd.addEventListener("click", () => {
            if(Config.player_counter<5){
                createPlayerDiv(`PLAYER ${Config.player_counter} NAME`, this);
            }
           
        })


    }

    setButtonStart() {
       
        this.button = document.createElement("button");
        this.button.textContent = "START GAME";
        this.button.setAttribute("id", "start-game");
        this.button.addEventListener("click", () => {
           
           if(super.checkInputs(this.players,[this.input1,this.input2])) {
            this.hideConfig();
            const game = new Game(+this.input1.value,+this.input2.value,this.players);

            game.start()
           } else {
            console.log("Invalid Settings");
           }
        })
    }

    setDOM() {
        const container = document.createElement("div");
        container.classList.add("config_container");

        container.appendChild(this.title);
        container.appendChild(this.rc);
        container.appendChild(this.playersSettings);
        container.appendChild(this.buttonAdd);
        container.appendChild(this.button);

        document.querySelector("Body").appendChild(container);
    }

    hideConfig(){
        document.querySelector(".config_container").classList.add("hidden");
    }



}