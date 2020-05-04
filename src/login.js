function login(){
    document.getElementById("profile-container").hidden = true
    const loginContainer = document.getElementById("login-container")
    const loginDiv = document.createElement("div")
    const loginH1 = document.createElement("h1")
    loginH1.innerText = "Sign in "
    
    const loginForm = document.createElement("form")
    const loginInput = document.createElement("input")
    const br = document.createElement("br")
    loginInput.value= ""
    loginInput.type = "text"
    loginInput.name = "username"
    loginInput.placeholder = "Enter Username"
    const submitBtn = document.createElement("button")
    submitBtn.value = "submit"
    submitBtn.class = "submit"
    submitBtn.innerText = "SUBMIT"
    loginForm.addEventListener("submit", (event) => handelSubmit(event))


    /// sign up form
    const signUpDiv = document.createElement("div"),
         signUpH1 = document.createElement("h1"),
         signUpForm= document.createElement("form"),
         nameInput = document.createElement("input"),
         br2 = document.createElement("br"),
         br3 = document.createElement("br"),
         userNameInput = document.createElement("input"),
         submitSignUpBtn = document.createElement("button")

    signUpH1.innerText = "Sign Up"
    nameInput.placeholder = "Enter your name"
    userNameInput.placeholder = "Enter your User Name"
    submitSignUpBtn.value = "submit"
    submitSignUpBtn.class = "submit"
    submitSignUpBtn.innerText = "SUBMIT"
    signUpForm.append(nameInput, br2, userNameInput, br3, submitSignUpBtn)

    signUpDiv.append(signUpH1, signUpForm)
    signUpForm.addEventListener("submit", (event) => handleSignUp(event))
    // signUpForm.onsubmit = () => handleSignUp(event)
    
//   _____________________
//   [                   ]
//   [ [login]  [ signup]]  <--- loginContainer
//   [___________________]       display flex 



    
    loginForm.append(loginInput, br, submitBtn)
    loginDiv.append(loginH1, loginForm)
    loginContainer.append(loginDiv, signUpDiv)

}

function handleSignUp(e){
    e.preventDefault()
   
    const name = e.target.querySelectorAll("input")[0].value,
         userName = e.target.querySelectorAll("input")[1].value,
     
         newUser = {
                name: name,
                userName: userName,
  
            }
         
              
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {"Content-Type": "application/json",
        "Accept": "application/json"},
        body: JSON.stringify(newUser)
       
    })
    .then(resp => resp.json())
    .then(newUser => {
        console.log(newUser)

        document.getElementById("login-container").hidden = true
        handleMenu(newUser)})

        
}

function handelSubmit(e){
    e.preventDefault()

    const userInput = e.target.previousSibling.value
    e.target.parentElement.reset()
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(usersArr => {
        console.log(usersArr)
        usersArr.forEach(user => {
            console.log(user)
            renderUser(user, userInput)
        })
    })
    
   
}

function renderUser(user, userInput){
    // debugger
 

    if(user.username === userInput ){
        document.getElementById("login-container").hidden = true
        // document.getElementById("profile-container").hidden = false
        handleMenu(user)
    }else{
        
        document.getElementById("login-container").hidden = false
        document.getElementById("profile-container").hidden = true

    }
    

}






// <div id="login-container">
// <div id="login">
//  h1
//     <form id="loginForm">
//         <input type="text" username="username" placeholder="Enter Username">
//         <button value = "submit"> Submit </button>
//     </form>
// </div>

//  <div id="signUp">
//</div>
// </div> 