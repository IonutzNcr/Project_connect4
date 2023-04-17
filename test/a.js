import Divin from "./b.js";

class Troll extends Divin{
    static name = "Troll"

    constructor(){
        super();
    }
    troll(cls){
        super.divin(Troll);
        console.log("I'm troll")
    }
}

const al = new Troll();
al.troll();


let string = "D233";

console.log(string!="" && isNaN(+string));