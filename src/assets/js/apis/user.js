
import {axios} from "../config.js"
function Login(user){ 
    //console.log(user);   
    return new Promise(
        (resolve,reject)=>{            
            axios.post("/user/login",user)
            .then(result=>{
                resolve(result.data);
            });
        }
    )
}

function Logout(){       
    return new Promise(
        (resolve,reject)=>{            
            axios.get("/user/logout")
            .then(result=>{
                resolve(result.data);
            });
        }
    )
}


function getUserSessionData(){       
    return new Promise(
        (resolve,reject)=>{            
            axios.get("/user/sessiondata")
            .then(result=>{
                resolve(result.data);
            });
        }
    )
}


export {
    Login,Logout,getUserSessionData
}