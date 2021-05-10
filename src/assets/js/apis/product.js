//import axios from "axios"
import {axios} from "../config.js"
//axios.defaults.withCredentials = true;
function getProductList(paramObj){
    return new Promise(
        function(resolve,reject){
            axios.get("/product/list",{params:paramObj})
            .then(result=>{
                resolve(result.data);
            });
        }
    )
}

export {
    getProductList
}