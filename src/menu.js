

function handleMenu(user) {
   
    // const user = {name: "Alex", username: "alex", level: 1}
   
    let gameLevel = user.level.number
    document.getElementById("game-container").hidden = true
    document.getElementById("level-container").hidden = true 
    
    const menuPage = document.getElementById("profile-container")
    menuPage.hidden = false
    menuPage.innerHTML = ""


    const leftMenuDiv = document.createElement("div")
    const topMenuDiv = document.createElement("div")
    const rightMenuDiv = document.createElement("div")
    const bottomMenuDiv = document.createElement("div")
    const centerDiv = document.createElement("div")

  //------------------------TOP-----------------------------
 
    const welcomeNode = document.createElement("welcome")
    const welcomeH1Node = document.createElement("h1")
    welcomeH1Node.innerText = `Welcome ${user.name}`
    welcomeNode.appendChild(welcomeH1Node) 
    topMenuDiv.append(welcomeNode)

 //-----------------------LEFT------------------------------ 

       const avatarNode = document.createElement("div"),
       avatarsArray = ["https://cdn5.f-cdn.com/contestentries/1475693/24026982/5c7389da5006e_thumb900.jpg",
       "https://i.dlpng.com/static/png/6633913_preview.png",
       "https://mir-s3-cdn-cf.behance.net/project_modules/disp/b0eb3e20093725.562e563da7d9a.png",
       "https://miro.medium.com/max/404/1*JP-9BizwTVXEqcDhRLlR9A.png",
       "https://swiftludus.org/wp-content/uploads/2016/09/idle.png"
   ]
      
 
   avatarsArray.forEach( avatar => {
       const  avatarImg = document.createElement("img"),
           avatarDiv = document.createElement("div")
       avatarImg.src = avatar
       avatarImg.width = "75"
       avatarDiv.append(avatarImg)
       avatarNode.append(avatarDiv)
       avatarDiv.onclick = () => {
           avatarDiv.style.border = "thick solid blue"
       }
   })
   leftMenuDiv.append(avatarNode)
    
    
    //-----------------------RIGHT------------------------------
    
    //  /Level header
    const levelDiv = document.createElement("levelInfo")
    const levelH1Node = document.createElement("h1")
    levelH1Node.innerText = "LEVEL"
    levelDiv.appendChild(levelH1Node)

    //level number
    const levelNumberNode = document.createElement("div")
    levelNumberNode.innerText = user.level.number
    // play button
    const playDiv = document.createElement("div")
    const playBtn = document.createElement("button")
    playBtn.innerText = "PLAY" 
    playBtn.value = "button"
    playDiv.appendChild(playBtn)
   
    playBtn.addEventListener("click", () => getLevels(gameLevel, user) )

    rightMenuDiv.append(levelDiv, levelNumberNode, playDiv)

    centerDiv.append(leftMenuDiv, rightMenuDiv)

   
      //-----------------------BOTTOM------------------------------ 

    const bottomDiv = document.createElement("div"),
        levels = [1,2,3,4]
        
    levels.forEach(level => {
        const levelSelectDiv = document.createElement("div")
        levelSelectDiv.innerText = level
        bottomDiv.append(levelSelectDiv)
        if (level <= user.level.number) {
            // if result is >80
            // make the next level clickable 
            // incremnt level 
        
            levelSelectDiv.style.color = "blue"
            levelSelectDiv.onclick = () => {
                gameLevel = level
                levelNumberNode.innerText = level
            }
        } else {
            levelSelectDiv.style.color = "grey"
        }
       
    })
    bottomMenuDiv.append(bottomDiv)
    menuPage.append(topMenuDiv, centerDiv,bottomMenuDiv  )
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
    
    


