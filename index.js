const express = require('express')
const app = express()
const port = 3001
const jwt  = require('jsonwebtoken')


secretKey = "this is a secret key"


const USERS = [{
  name : "Dwight",
  email : "Danger@gmail.com",
  password : "123",
  auth: "Admin"
}];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('HI I am the home Page');
  console.log(req.headers);
})

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password , username , auth} = req.body;


    const existignUser = USERS.find((user) => user.email == email)
    if(existignUser){
      res.status(404).send("User alredy exists");
    }

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
      //create new user
    const newUser = {email , password}

    USERS.push(newUser);
    const token = jwt.sign({password},secretKey);
    res.status(200).send("new user created");

  // return back 200 status code to the client
  res.send('Hello World!')
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const email = req.body.email;
  const password = req.body.password

  const existignUser = USERS.find((user) => user.email === email)
  if(!existignUser){
    res.status(404).send("Invalid User");
  }
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  if(existignUser.password == password){
      res.status(200).send("user exists")
  }

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const token = jwt.sign({password : existignUser.password} , secretKey);
  res.send('Hello World from route 2!')
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send(QUESTIONS)
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  // res.send(SUBMISSION)
  res.send(USERS)
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send(SUBMISSION)
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.post("/addQuestions" , function(req , res){
  const {title , description , testCases} = req.body;
  const newQues = {title , description , testCases};
  const auth = req.body.auth;
  const authorisedUser = USERS.find((user) => user.auth == auth);
  if(authorisedUser){
    QUESTIONS.push(newQues);
    // res.status(200).send(QUESTIONS);
    res.send("Question added")
  }else{
    res.send("Not authorised to add questions")
    // res.json(USERS)
  }

})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
