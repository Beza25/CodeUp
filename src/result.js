
function showResults(game){

    const  mainContainer = document.getElementById("center-container")
    mainContainer.style.backgroundImage ="url('https://steamuserimages-a.akamaihd.net/ugc/27351263239328981/D4366B560526B6400E0CFF405CA7B634AAB3FA44/')"

    document.getElementById("level-container").style.display = "none"
    const gameNode = document.getElementById("game-container")
    gameNode.style.display = "flex"

    // your score
    const resultNode = document.getElementById("result"),
        resultH1Node = document.createElement("h1"),
        nextGameNode = document.createElement("div"),
        solutionDivNode = document.createElement("div"),
        solutionH1Node = document.createElement("h1"),
        menuDivNode = document.createElement("div"),
        menuH1Node = document.createElement("h1")
    resultNode.innerHTML = ""
    resultNode.append(resultH1Node, nextGameNode, solutionDivNode, menuDivNode)
    let calculation = parseInt((game.correct / game.currentLevel.questions.length) * 100)

     game.percentage = calculation
    //  debugger
    if(game.percentage >= 80){ //win condition
         //if lose, show percentage, message "You Lose", create CONTINUE button
        resultH1Node.innerText = `${game.percentage} %  You Win! 😄`

        if(game.level[game.level.length-1] !== game.currentLevel){
            const continueBtn = document.createElement("button")
            continueBtn.className ="btn"
             menuBtnNode.className = "btn"
            continueBtn.innerText = "CONTINUE"
            nextGameNode.appendChild(continueBtn)
            continueBtn.addEventListener("click", () => nextLevel(game))

             // if user wins update the user level objec with the next level and 
        //increment the userlevel.number by one 
        let userLevel = game.currentLevel.number - 1
        userLevel++
        let currentLevelObj = game.level[userLevel] 
        game.user.level = currentLevelObj

        //fetch patch .then add event listerners to the buttons so the 
        //new user object is updated
        let updatedUser = {level_id: game.user.level.id}
        fetch(`http://localhost:3000/users/${game.user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedUser)
        })
        
        }
        
        

    }else{
        resultH1Node.innerText = `${game.percentage} %  You Lose! 😞`
       
        //if lose create REPLAY button
        const replayBtnNode = document.createElement("button")
        replayBtnNode.innerText = "REPLAY"
        nextGameNode.appendChild(replayBtnNode)
        // replayBtnNode.onclick = () => renderLevel(game.level)
        replayBtnNode.addEventListener( "click", () => {
            // console.log(game.level.name)
            
            game.userHP = 100
            game.bossHP = 100
            game.counter = 0
            game.solutions = []
            game.correct = 0
            game.percentage = 0
            renderLevel(game)})

    }
    
    // See all the solution
    const solutionBtnNode = document.createElement("button")
    solutionBtnNode.innerText = "SOLUTION"
    solutionBtnNode.addEventListener("click", () => {
        gameNode.style.display = "none"
        showSolutions(game)})
    solutionH1Node.appendChild(solutionBtnNode)
    solutionDivNode.appendChild(solutionH1Node)
    
     //create a button for going back to menu
    const menuBtnNode = document.createElement("button")
    menuBtnNode.className = "btn"
    menuBtnNode.innerText = "MENU"
    menuH1Node.appendChild(menuBtnNode)
    menuDivNode.appendChild(menuH1Node)
    menuBtnNode.addEventListener("click", () => handleMenu(game.user))
    // for this event listener, make it game.user (need to add user to game object)
}

function nextLevel(game){  
    let userLevel = game.currentLevel.number - 1
    userLevel++
    let currentLevelObj = game.level[userLevel]  
    
      game.userHP = 100
      game.bossHP = 100
      game.counter = 0
      game.solutions = []
      game.percentage = 0
      game.correct = 0
      game.currentLevel = currentLevelObj
      

    //   debugger
      //user.level = game.level when we get user login
    renderLevel(game)
    // i have no faith this will work
}
