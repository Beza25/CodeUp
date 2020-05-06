

function handleMenu(user) {
 
    // const user = {name: "Alex", username: "alex", level: 1}
   
    let gameLevel = user.level.number
    // let gameLevel = 3
    document.getElementById("game-container").hidden = true
    document.getElementById("level-container").hidden = true 
    
    const menuPage = document.getElementById("profile-container"),
        mainContainer = document.getElementById("center-container")

    // menuPage.hidden = false
    menuPage.style.display = "flex"
    mainContainer.style.backgroundImage ="url('https://i.imgur.com/jTQ0gbh.gif')"
    menuPage.innerHTML = ""
   

    const leftMenuDiv = document.createElement("div"),
        topMenuDiv = document.createElement("div"),
        rightMenuDiv = document.createElement("div"),
        bottomMenuDiv = document.createElement("div"),
        centerDiv = document.createElement("div")

    leftMenuDiv.id = "left-menu"
    topMenuDiv.id = "top-menu"
    rightMenuDiv.id = "right-menu"
    bottomMenuDiv.id = "bottom-menu"
    centerDiv.id = "center-menu"
  //------------------------TOP-----------------------------
 
    const welcomeNode = document.createElement("welcome")
    const welcomeH1Node = document.createElement("h1")
    welcomeH1Node.innerText = `Welcome ${user.name}`
    welcomeNode.appendChild(welcomeH1Node) 
    topMenuDiv.append(welcomeNode)

 //-----------------------LEFT------------------------------ 
 

       const avatarNode = document.createElement("div"),
       avatarH1 = document.createElement("h1"),
       avatarsArray = ["https://i.pinimg.com/originals/3e/a9/cd/3ea9cde6a4ac10bc429f37dcbf3e1da3.gif",
       "https://gifimage.net/wp-content/uploads/2018/11/funny-black-panther-gif.gif",
       "https://i.gifer.com/UmFy.gif",
       "https://i.pinimg.com/originals/51/a3/11/51a311efea91761a0ddccb5e9341f88a.gif",
       "https://i.gifer.com/T94r.gif"
   ]
      
   avatarNode.id = "avatar-div"
   avatarH1.className = "center-text"
   avatarH1.innerText = "Choose Your Avator"
   leftMenuDiv.append(avatarH1)


   avatarsArray.forEach( avatar => {
       const  avatarImg = document.createElement("img"),
           avatarDiv = document.createElement("div")
           
       avatarImg.src = avatar
       avatarImg.height = "100"
       avatarDiv.classList.add("avatar-card")
       avatarDiv.append(avatarImg)
       


       avatarNode.append(avatarDiv)

       //Select Avator
       avatarDiv.onclick = () => {
           //avatarDiv.querySelectorAll("img")
          if ( avatarDiv.style.border === "thick solid blue"){
              
                avatarDiv.style.border = ""
            } else {
                let avaArray = avatarNode.querySelectorAll("div")
                avaArray.forEach(avatar => avatar.style.border="")
                avatarDiv.style.border = "thick solid blue"
            
                user.avatar = avatarDiv.querySelector("img").src
                console.log(user.avatar)
            }
       }
       // Sets Default avatar to first avatar
       if (avatar === avatarsArray[0]){
        avatarDiv.style.border = "thick solid blue"     
        user.avatar = avatarDiv.querySelector("img").src
       }
   })
   leftMenuDiv.append(avatarNode)
    
    
    //-----------------------RIGHT------------------------------
    
    //  /Level header
    const levelDiv = document.createElement("div")
    const levelH1Node = document.createElement("h1")
    levelDiv.id = "level-menu-div"
    levelH1Node.innerText = "LEVEL"
    levelH1Node.className = "center-text"
    levelDiv.appendChild(levelH1Node)

    //level number
    const levelNumberNode = document.createElement("div")
    levelNumberNode.id = "level-number"
    levelNumberNode.innerText = user.level.number
    // levelNumberNode.innerText = "3"
    // play button
    const playDiv = document.createElement("div")
    const playBtn = document.createElement("button")
    playBtn.innerText = "PLAY" 
    playBtn.className = "button"

    playBtn.value = "button"
    playDiv.appendChild(playBtn)
   
    playBtn.addEventListener("click", () => getLevels(gameLevel, user))

    rightMenuDiv.append(levelDiv, levelNumberNode, playDiv)

    centerDiv.append(leftMenuDiv, rightMenuDiv)

   
      //-----------------------BOTTOM------------------------------ 

    const bottomDiv = document.createElement("div"),
        levels = [1,2,3,4],
        chooseDiv = document.createElement("div")
    
    bottomDiv.id = "level-select-list"
    chooseDiv.innerHTML = '<h1 class="center-text">Unlock a Level</h1>'
    chooseDiv.className = "center-text"


    levels.forEach(level => {
        const levelSelectDiv = document.createElement("div")

        levelSelectDiv.classList.add("level-select")
        levelSelectDiv.innerText = level
        bottomDiv.append(levelSelectDiv)
        if (level <= user.level.number) {
            // if (level <= 3) {
            // if result is >80
            // make the next level clickable 
            // incremnt level 
        
            levelSelectDiv.style.backgroundColor = "#009DFF"
            levelSelectDiv.onclick = () => {
                gameLevel = level
                levelNumberNode.innerText = level
            }
        } else {
            levelSelectDiv.style.backgroundColor = "grey"
        }
       
    })
    bottomMenuDiv.append(chooseDiv, bottomDiv)
    menuPage.append(topMenuDiv, centerDiv,bottomMenuDiv  )
    // debugger
   
}




 //  menuPage = [                          -continor of all
//                       [ Welcome User ] - top
 //         [    [ left: avator ] [right: level] ] - center
 //         [ bottom: container has the level number things] -bottom
//  ]




//  <div id= "profile-container">
//  <div id= "welcome">
//      <div id ="top">
//          <div id= "left">
//              
//              <div id="avator"></div>
//          </div>
//          <div id="right">
//              <div id= "levelInfo"></div>
//          </div>
//      </div>
//      <div id= "bottom">
//      </div>
//  </div>

// </div>
    
    


