
import {axios} from "../config.js"

function getIndex(){
    return new Promise(
        function(resolve,reject){   
            axios.get("/index")
            .then(result=>{
                resolve(result.data);
            });
        }
    )
}
export {
    getIndex
}