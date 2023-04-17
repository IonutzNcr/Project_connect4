

export default class Solution {
    getSolutions(row, coll, cls) {
        let nbColl = coll;
        let nbRow = row;
        let n = 4;

        // regulateur d'iteration par collonne ;

        //regulateur d'iteration par row;

        /* par ligne */

        let l = 1;

        for (let r = l; r < nbRow + 1; r++) {
            let k = 1;
            while (k < nbColl - (n - 2)) {

                let arr = [];
                for (let c = k; c < n + k; c++) {
                    
                    arr.push("r" + r + "c" + c);

                }
                cls.solution.push(arr);
                arr = [];
                k++;
            }

        }

        /*  par collone */
        let k = 1;

        for (let c = k; c < nbColl + 1; c++) {
            let l = 1;
            while (l < nbRow - (n - 2)) {
                let arr = [];
                for (let r = l; r < n + l; r++) {

                    arr.push("r" + r + "c" + c);

                }
                cls.solution.push(arr);
                arr = [];
                l++;
            }
        }

        /* EN ANTI-DIAGONAL ca l'air de marcher  */
        function checkDeadColumnAD(column) {
            let arr = ["c" + nbColl, "c" + (nbColl - 1), "c" + (nbColl - 2)];

            let condition = arr.filter(e => {
                if (e == column) {
                    return true
                }
            })

            if (condition.length == 1) return true;
            return false;


        }

        function checkDeadRowAD(row) {
            let arr = ["r" + nbRow, "r" + (nbRow - 1), "r" + (nbRow - 2)];

            let condition = arr.filter(e => {
                if (e == row) {
                    return true
                }
            })

            if (condition.length == 1) return true;
            return false;


        }


        for (let r = 1; r < nbRow; r++) {
            if (checkDeadRowAD("r" + r)) break;
            for (let c = 1; c < nbColl; c++) {
                if (checkDeadColumnAD("c" + c)) continue;
                let arr = [];
                for (let k = 0; k < 4; k++) {
                    arr.push("r" + (r + k) + "c" + (c + k));
                }
                cls.solution.push(arr);
            }

        }

        /* EN DIAGONAL*/

        function checkDeadColumnD(column) {
            let arr = ["c" + nbColl , "c" + (nbColl-1), "c" + (nbColl-2)];

            let condition = arr.filter(e => {
                if (e == column) {
                    return true
                }
            })

            if (condition.length == 1) return true;
            return false;


        }

        function checkDeadRowD(row) {
            let arr = ["r" + 1, "r" + 2, "r" + 3];

            let condition = arr.filter(e => {
                if (e == row) {
                    return true
                }
            })

            if (condition.length == 1) return true;
            return false;


        }


        for (let r = 1; r < nbRow+1; r++) {
          
            if (checkDeadRowD("r" + r)) continue;
            for (let c = 1; c < nbColl+1; c++) {
               
                if (checkDeadColumnD("c" + c)) break;
                let arr = [];
                for (let k = 0; k < 4; k++) {
                   
                    arr.push("r" + (r - k) + "c" + (c + k));
                }
                cls.solution.push(arr);
            }

        }


    }
}