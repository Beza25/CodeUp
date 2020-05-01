document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("login-container").hidden = true
    let userLvl = 1 //this will change to the actual users level
    getLevels(userLvl)
})




function getLevels(userLvl){
   
    
    fetch("http://localhost:3000/levels")
    .then(resp => resp.json())
    .then(levelsArray => {
        
        let userLevel = levelsArray[userLvl - 1 ]
        let game = {
            userHP: 100,
            bossHP: 100,
            status: false,
            counter: 0,
            level: levelsArray,
            correct: 0,
            solutions: [],
            // userLVL: userLvl
            currentLevel: userLevel
          }
        // levelsArray.forEach(level => {
            // currentLevel = game.userLVL - 1
            console.log("game level array form index (fetch)")
            console.log(game.level)
            renderLevel(game)
    
        // })
        
    })
    //user logs in... num would be user level.
    //or num can = replay
    //or num can = next level
    //at some point need to add a levelNumber function

}

    
//function setLevel(userLvl1, levelArray){
    // let game = {
    //     userHP: 100,
    //     bossHP: 100,
    //     status: false,
    //     counter: 0,
    //     level: levelsArray[0],
    //     correct: 0,
    //     solutions: []
        
    //   }
    // renderLevel(game.level, game)
// num is a passed in value from menu or next level
// renderLevel(levelArray[num])
//}

