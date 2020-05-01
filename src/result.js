
function showResults(game){
    document.getElementById("level-container").hidden = true
    const gameNode = document.getElementById("game-container")
    gameNode.hidden = false
   
    // your score
    const resultNode = document.getElementById("result")
    const resultH1Node = document.createElement("h1")
    const nextGameNode = document.createElement("div")
    const solutionDivNode = document.createElement("div")
    const solutionH1Node = document.createElement("h1")
    const menuDivNode = document.createElement("div")
    const menuH1Node = document.createElement("h1")
    resultNode.innerHTML = ""
    resultNode.append(resultH1Node, nextGameNode, solutionDivNode, menuDivNode)

    let percentage = parseInt((game.correct / game.currentLevel.questions.length) * 100)
    if(percentage >= 80 ){
         //if lose, show percentage, message "You Lose", create CONTINUE button
        resultH1Node.innerText = `${percentage} %  You Win! 😄`
        
        const continueBtn = document.createElement("button")
        continueBtn.innerText = "CONTINUE"
        nextGameNode.appendChild(continueBtn)
        continueBtn.addEventListener("click", () => nextLevel(game))
         
    }else{
        resultH1Node.innerText = `${percentage} %  You Lose! 😞`
       
        //if lose create REPLAY button
        const replayBtnNode = document.createElement("button")
        replayBtnNode.innerText = "REPLAY"
        nextGameNode.appendChild(replayBtnNode)
        // replayBtnNode.onclick = () => renderLevel(game.level)
        replayBtnNode.addEventListener( "click", () => {
            console.log(game.level.name)
            renderLevel(game.level)})

    }
    
    // See all the solution
    const solutionBtnNode = document.createElement("button")
    solutionBtnNode.innerText = "SOLUTION"
    solutionBtnNode.addEventListener("click", () => {
        gameNode.hidden = true
        showSolutions(game)})
    solutionH1Node.appendChild(solutionBtnNode)
    solutionDivNode.appendChild(solutionH1Node)
    
     //create a button for going back to menu
    const menuBtnNode = document.createElement("button")
    menuBtnNode.innerText = "MENU"
    menuH1Node.appendChild(menuBtnNode)
    menuDivNode.appendChild(menuH1Node)
  

}
function nextLevel(game){
    
    let userLevel = game.currentLevel.number - 1
    userLevel++
 
    let currentLevelObj = game.level[userLevel]
    let levelsArray = game.level
  
    game = {
        userHP: 100,
        bossHP: 100,
        status: false,
        counter: 0,
        level: levelsArray,
        correct: 0,
        solutions: [],
        currentLevel: currentLevelObj
        
      }
    //   debugger
      //user.level = game.level when we get user login
    renderLevel(game)
    // i have no faith this will work
}
