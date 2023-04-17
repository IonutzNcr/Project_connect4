
import Config from "./config.js";
import Solution from "./solution.js";




 export default class Game extends Solution {


    constructor(row, coll, players) {
        super();
        this.coll = coll;
        this.row = row;
        for(let i = 1; i <+this.coll+1;i++){
            Game.gravity.push(this.row);
        }
        this.players = [...players];
        Game.nbroundtotal = coll*row;
      
        
    }
    
    static gravity = []
    static round = 0;

    static nbroundtotal
    static solution = [];
    start() {
      
        this.gameboard = new Gameboard(this.row, this.coll,this.players);
        super.getSolutions(this.row, this.coll, Game);
       
        Game.nbroundtotal = this.coll * this.row;
        this.gameboard.createGameboardHtml()
        this.createInfoDiv();
       
    }

    createInfoDiv(){
        const div = document.createElement("div");
        div.classList.add("info");
        const playersScoreDiv =  document.createElement("div");
        this.players.forEach((e,index)=>{
            const p = document.createElement("p");
            p.classList.add(`para${index}`);
            p.textContent = `${e.name.value} has ${e.score}pt(s)`;
            playersScoreDiv.appendChild(p);

        })
        div.appendChild(playersScoreDiv);

        const turnDiv =  document.createElement("div");
        turnDiv.classList.add("turn");
        const whoPlaying = document.createElement("p");
        whoPlaying.textContent = `${this.players[Game.round].name.value} is playing`;
        const isWinning = document.createElement("p");
        isWinning.classList.add("winner");

        turnDiv.appendChild(whoPlaying);
        turnDiv.appendChild(isWinning);

        div.appendChild(turnDiv);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonDiv");
        const reset = document.createElement("button");
        reset.setAttribute("id","reset");
        reset.textContent="RESET";
        const replay = document.createElement("button");
        replay.setAttribute("id","replay");
        replay.textContent = "PLAY AGAIN";
        const undo = document.createElement("button");
        undo.setAttribute("id","undo");
        undo.textContent = "UNDO";

        buttonDiv.appendChild(reset);
        buttonDiv.appendChild(replay);
        buttonDiv.appendChild(undo);

        div.appendChild(buttonDiv);
        document.querySelector("#bigContainer").appendChild(div);

        //events 

        reset.addEventListener("click",()=>{
            location.reload();
        })

        replay.addEventListener("click",()=>{
            //removes all cases
            let cases = document.querySelectorAll(".move")
            cases.forEach(e=>{
                e.remove();
            })
            //vider les tableau moves 
            console.log(this.players);
            this.players.forEach(e=>{
                e.moves = [];
            })

            //reset gravity
            console.log(this.row)
            Game.gravity.forEach((e,index)=>{
                Game.gravity[index] = this.row;
            })

            //reset round
            Game.round = 0;

            //reset turn div 
            document.querySelector(".turn :first-child").textContent = `${this.players[Game.round].name.value} is playing`;
            //reset winner div
            document.querySelector(".winner").textContent = "";
            document.querySelector("#gameboard").classList.remove("disabled");

        })

        undo.addEventListener("click",()=>{
            //Remet le round precedent 
            if(Game.round == 0 ){
                Game.round = this.players.length-1;
            } else {
                Game.round--
            }

            //recuperer le dernier move joué
            let last_move = this.players[Game.round].moves.pop()
            console.log(last_move);

            //supprimer la derniere case dans le gameboard
            document.querySelector(`[data-move=${last_move}]>div`).remove();

            //remet la gravité a sa place
            let coll = last_move.split("c");
            console.log(coll)
            coll = +coll[1];

            console.log("coll",coll);
            console.log("this gravirt",Game.gravity[coll-1])

            Game.gravity[coll-1]++;
            console.log("this gravirt",Game.gravity[coll-1])

            //Reset turn div 
            document.querySelector(".turn :first-child").textContent = `${this.players[Game.round].name.value} is playing`;
        })

        undo.classList.add("disabled")
    }



}


class Gameboard {
    constructor(row, coll, players) {
        this.coll = coll;
        this.row = row;
        this.players = [...players];
        
        
    }

    createGameboardHtml() {
     
     
        for (let i = 1; i < +this.coll + 1; i++) {
            
            const div = document.createElement("div")
            div.classList.add("coll")
            for (let k = 1; k < +this.row + 1; k++) {
                const row = document.createElement("div");
                row.classList.add("case")
                row.setAttribute("data-move", `r${k}c${i}`)
                //////////////////////// GAME LOGIC /////////////////////////////
                row.addEventListener("click", (e) => {
                  
                    let coll = e.target.dataset.move
                    coll = coll.split("c");
                    
                    coll = coll[1];
                    
                    console.log(Game.round);
                    this.play(this.players[Game.round],coll);

                })

                /////////////////////// END OF GAME LOGIC /////////////////////////////////

                div.appendChild(row)
            }
            document.querySelector("#gameboard").appendChild(div)
        }
    }

    play(player,coll){

        

        if(Game.gravity[coll-1]>0){

            setTimeout(function(){
                document.querySelector("audio").play();
            },1700)
           

            document.querySelector(`[data-move=r${Game.gravity[coll - 1]}c${coll}]`).innerHTML = `<div class='move p${Game.round +1}' style='background-color:${player.color.value}'></div>`

            player.moves.push(`r${Game.gravity[coll - 1]}c${coll}`)
            
            if (this.checkWinner(player.moves)) {
               
               document.querySelector(".winner").textContent = `${player.name.value} a gagné !!`;
               player.score++;
               document.querySelector(`.para${Game.round}`).textContent = `${player.name.value} has ${player.score}pt(s)`;
               document.querySelector("#undo").classList.add("disabled");
               document.querySelector("#gameboard").classList.add("disabled");
               return;
            }
           
            if(Game.round == this.players.length -1){
                 Game.round = 0;
            } else {
                Game.round++;
            }
           
            Game.gravity[coll - 1] = Game.gravity[coll - 1] - 1;
            document.querySelector(".turn :first-child").textContent = `${this.players[Game.round].name.value} is playing`;
            //allow undo button
            document.querySelector("#undo").classList.remove("disabled");

            //disabled undo & gameboard if fin de game 
            
            let nbMaxPlayer = Game.nbroundtotal / this.players.length;

            if(this.players[0].moves.length >= nbMaxPlayer){
                let nbMove = 0;
                this.players.forEach(e=>{
                    nbMove+= e.moves.length;
                })
                if(Game.nbroundtotal==nbMove){
                    document.querySelector("#undo").classList.add("disabled");
                    document.querySelector("#gameboard").classList.add("disabled");
                    document.querySelector(".winner").textContent = "DRAW YOU IDIOT";
                }
            }
           

        }

    }

    checkWinner(moves) {
        let win = false;

        Game.solution.forEach(sol => {
            let hasAllElems = sol.every(elem => moves.includes(elem))
            // console.log(sol);
            if (hasAllElems) {
                sol.forEach(e=>{
                    document.querySelector(`[data-move=${e}]`).firstChild.classList.add("brille");
                })
                win = true;
                return;
            }
        })
        return win;
    }
}




/*  const game = new Game();
game.start() */


const configuration = new Config()