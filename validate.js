export default class ValidateConfig{
    checkInputs(players,array_rowcoll){
        let name_validator = true;
        let color_validator = true;
        let rowcoll_validator = true;

        players.forEach(player => {
            if(player.name.value === ""){
                name_validator = false;
            }
        });

        const colors = new Set();
        players.forEach((player) => {
         colors.add(player.color.value)

        });
        console.log(colors)
        if(colors.size != players.length){
            color_validator = false;
        }




        array_rowcoll.forEach(number=>{
            
            if(isNaN(+number.value) || number.value == ""){
                rowcoll_validator = false;
            }
        })
        if(name_validator && rowcoll_validator && color_validator){
            return true;
        } else return false;
    }
}


/// probleme a regler sur cette partie et potentiellement lié a la class config