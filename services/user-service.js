const { throws } = require('assert');
const fs = require('fs')
const fsPromises = fs.promises;
const path = './data/users.json'
const toDoPath = '../D1/db.json'



// const readUsers = (callback)=>{
//    return fs.readFile(path,{encoding:'utf8'} ,callback)
   
// } 

const readUsers = () => {

    return fsPromises.readFile(path, { encoding: 'utf8' })
}

    const readToDoList =  ()=>{

        return fsPromises.readFile(toDoPath,{encoding:'utf8'})
        
     } 



// const addUser = (user,callback) =>{

//     return fs.writeFile(path,JSON.stringify(user,null,2),{encoding:'utf8'} ,callback)
// }

const updateUsers = async (db,) => {
    console.log(JSON.stringify(db))
    try {
      let result =   fsPromises.writeFile(path,JSON.stringify(db,null,2),{encoding:'utf8'})
        return result
    } catch (error) {
        console.log(error)
    }
        
    }



module.exports =userService =  {
    readUsers,
    updateUsers,
}


