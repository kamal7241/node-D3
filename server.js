console.log("start")
const express = require('express')
const app = express()
const morgan = require('morgan')

// -	2 - Create a middleware that logs the request url, method, and current time 
    app.use(morgan('tiny'))
// -	3 - Create a global error handler that logs the error and return {“error”:”internal server error”} with status code 500 
app.use((req,res,next)=>{
    next()
})
// -	Use async methods.
// -	Modularize your code into files.
// -	Test your api through postman
const registerNewUser= async (username,password,firstName)=> {
        // userServ.readUsers((err,data)=>{
    //     if(err){
    //         console.log(err)
    //         return
    //     }
    //     console.log("read users starts")
    //         const db = JSON.parse(data)
    //         console.log(db)
    
    // })
        if(username && password && firstName){
            console.log(username,password,firstName)
            let dbString = await userServ.readUsers() || '[]'
            db = JSON.parse(dbString)
            db.push({username,password,firstName})
           const writeDataPromise =  userServ.updateUsers(db)
           let re =  await writeDataPromise
           return db
        }
        throw new Error("not valid please fill username and password and first anme")
   
}

const loginUser= async(username,password)=>{
        const dbString = await userServ.readUsers() || '[]';
        let  db = JSON.parse(dbString);
        console.log(typeof db)
        let user =  await new Promise(resolve => setTimeout(()=>{
         let user =   db.find(user => {
               return user.username == username && user.password == password
           })
           resolve(user)
        }, 0));
        
        if(user){
            user.loggedIn  = true;

            userServ.updateUsers(db)
            return user

        }
        throw  new Error("user not exist")
}

// var options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders: function (res, path, stat) {
//       res.set('x-timestamp', Date.now())
//     }
//   }
// app.use(express.static('public',/* options*/))
app.use(express.json()) // for parsing application/json (it would provide body )

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded (it would provide body )

const userServ = require('./services/user-service')


app.post('/register',(req,res,next)=>{
    let {username,password,firstName} = req.body    

   registerNewUser(username,password,firstName)
   .then(db =>{
    console.log("db",db)
        res.status(200).send({message:"success",user:{username,password,firstName}})
   })
   .catch(err =>{
    console.log("err",err)
       res.status(404).send({error:err.message})
   })
    console.log("after registering")
 })


app.post('/login',(req,res,next)=>{
    let {username, password} = req.body
    // Return ({message: "logged in successfully", profile:{name:”username”}}) if the user exist in your file
    // Change property LoggedIn: true
    // Else
    // Return ({error:”invalid credentials” }) with 401 status code
    loginUser(username, password)
    .then(user => {
        console.log(user)
        res.status(200).send({message:"success",user})

    })
    .catch(err =>{
        res.status(404).send({error:err.message})
    })
})
app.get('/todos',(req,res,next)=>{
    // Return the list of todos

})

app.post('/todos',(req,res,next)=>{
    // Accepts title, username
    // If username exists, and logged in, create it else return an descriptive error message 
    // Return ({message: "todo created successfully"},
})

app.delete('/todos/:id',(req,res,next)=>{
//     Delete the todo with selected id
// Enhancements
// He has to own the todo, and has to be logged in 
})

app.patch('/todos/:id',(req,res,next)=>{
    // - Edit the todo with the selected id 
    // Accepts {title:””,status:””}
    // - Return ({message:”todo was edited successfully”}) if success
    // - Return ({error:”invalid attributes”}) if user tries to edit a non existing attribute 
    // Enhancements he has to own the todo and logged in
    
})



app.get('/',  (req, res)=> {
    res.send('Hello World')
  })
   
app.listen(3000)
  