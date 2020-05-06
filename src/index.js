document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("login-container").hidden = false
    document.getElementById("profile-container").style.display = "none"
    document.getElementById("level-container").style.display = "none"
    document.getElementById("game-container").style.display = "none"
    document.getElementById("correct-answers-container").style.display = "none"
    login()
    // handleMenu()
    // let userLvl = 1 //this will change to the actual users level
    // getLevels(userLvl)
})




function getLevels(gameLevel, user){
   // if we passs in hte user object, refactor userLvl to user.level.number 
    
    
    fetch("http://localhost:3000/levels")
    .then(resp => resp.json())
    .then(levelsArray => {
        // add user object to game object
        let userLevel = levelsArray[gameLevel - 1 ]
        let game = {
            userHP: 100,
            bossHP: 100,
            status: false,
            counter: 0,
            level: levelsArray,
            correct: 0,
            solutions: [],
            // userLVL: userLvl
            currentLevel: userLevel,
            user: user
          }
        // levelsArray.forEach(level => {
            // currentLevel = game.userLVL - 1
            // console.log("game level array form index (fetch)")
            // console.log(game.level)
            renderLevel(game)
    
        // })
        
    })
    //user logs in... num would be user level.
    //or num can = replay
    //or num can = next level
    //at some point need to add a levelNumber function

}

    


