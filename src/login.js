function login(){
    document.getElementById("profile-container").style.display = "none"
    const loginContainer = document.getElementById("login-container"),
        loginDiv = document.createElement("div"),
        loginH1 = document.createElement("h1")
    loginH1.innerText = "Sign In "
    loginH1.className = "cneter-text"
    
    const loginForm = document.createElement("form"),
          loginInput = document.createElement("input"),
          br = document.createElement("br")

    loginDiv.className = "login-div"
    loginInput.value= ""
    loginInput.type = "text"
    loginInput.name = "username"
    loginInput.placeholder = "Username"
    
    const submitBtn = document.createElement("button")
    submitBtn.value = "submit"
    submitBtn.className = "submit"
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

    signUpDiv.className = "login-div"
    signUpH1.innerText = "Sign Up"
    signUpH1.className = "cneter-text"

    nameInput.placeholder = "Name"
    userNameInput.placeholder = "User Name"
    userNameInput.id= "singUp-username"
  

    submitSignUpBtn.value = "submit"
    submitSignUpBtn.className = "submit"
    submitSignUpBtn.innerText = "SUBMIT"
    signUpForm.append(nameInput, br2, userNameInput, br3, submitSignUpBtn)

    signUpDiv.append(signUpH1, signUpForm)
    signUpForm.addEventListener("submit", (event) => handleSignUp(event))
    // signUpForm.onsubmit = () => handleSignUp(event)
    
//   _____________________
//   [                   ]
//   [ [login]  [ signup]]  <--- loginContainer
//   [___________________]       display flex 


    const loginLine = document.createElement("div")
    loginLine.id = "login-line"
    
    loginForm.append(loginInput, br, submitBtn)
    loginDiv.append(loginH1, loginForm)
    loginContainer.append(loginDiv, loginLine, signUpDiv)

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
        document.getElementById("login-container").style.display = "none"
        handleMenu(newUser)  
    })
 
}

function handelSubmit(e){ //login
    e.preventDefault()
    // debugger

    const userInput = e.target.querySelector("input").value
    e.target.reset()
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(usersArr => {
 
        usersArr.forEach(user => {
            if(user.username === userInput ){ 
                document.getElementById("login-container").style.display = "none"
                handleMenu(user)
            }
        })
    })
}

// function renderUser(user, userInput){
//     if(user.username === userInput ){ 
//         console.log("if statment")
//         document.getElementById("login-container").hidden = true
//         // document.getElementById("profile-container").hidden = false
//         handleMenu(user)
//         // debugger
//     }else{
//         console.log("else statment")
//         // debugger

        
//         document.getElementById("login-container").hidden = false
//         document.getElementById("profile-container").hidden = true

//     }
    

// }






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