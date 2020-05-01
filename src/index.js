document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("login-container").hidden = true
    testLevelQuestions()
})




function testLevelQuestions(){
    fetch("http://localhost:3000/levels")
    .then(resp => resp.json())
    .then(levelsArray => renderLevel(levelsArray[0]))
//     .then(levelsArray => levelsArray.forEach(level => {
//         renderLevel(level)
    
//     }))

}
function renderLevel(level){

    const levelDiv = document.getElementById("level-name")
    document.getElementById("game-container").hidden = true
    document.getElementById("level-container").hidden = false
    // debugger
    let game = {
        userHP: 100,
        bossHP: 100,
        status: false,
        counter: 0,
        level: level,
        correct: 0,
        solutions: []
        
      }
    renderQuestion(game)
    // renderQuestion(level,counter)
    // renderQuestion(level.questions[0])
    // if we pass level instead of the q
    // const correct_answer = level.correct_answer
    
}

function renderQuestion(game){
// function renderQuestion(level, counter){
    
    let q = game.level.questions[game.counter]
    // let qCounter = counter,
    //  q = level.questions[qCounter]

    const questionBox = document.getElementById("question-box")
    questionBox.innerHTML = ""
        const form = document.getElementById("answer-form")
        //qustion displayed
        const qDiv = document.createElement("div")
        const aDiv = document.createElement("div")
        
        aDiv.id = "answers"
        qDiv.id = "question"
        qDiv.innerText = q.question
        questionBox.append(qDiv, aDiv)

      //shuffle the answers
        const answers = [...q.incorrect_answers, q.correct_answer ]
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5)
        
        // create a from form Answer that has sbumit button 
        const formAnswer = document.createElement("form")
        formAnswer.id = "form-answers"
        aDiv.appendChild(formAnswer)

    // create input for each answer
        const ul = document.createElement("ul")
        shuffledAnswers.forEach( answer => {
            const answerInput = document.createElement("input")
            const label = document.createElement("label")
            const br = document.createElement("br")
    
            answerInput.type = "radio"
            answerInput.class= "answers"
            answerInput.value= answer
            answerInput.name = "answer"

            label.innerText = answer
            label.prepend(answerInput)
            formAnswer.append(label, br)
        
        })

        //Create a submit button that is a child of form
        const formBtn = document.createElement("button")
        formBtn.value = "submit"
        formBtn.innerText = "Submit"
        formAnswer.appendChild(formBtn)
        
        // formAnswer.onsubmit = () => submitAnswer(event, q, level, qCounter)
        formAnswer.onsubmit = () => submitAnswer(event, q, game)
        //Add event listner
        // game[soultions] = []  
        game.solutions.push({question: q, answers: shuffledAnswers})
        
}

function submitAnswer(e, q, game) {
// function submitAnswer(e, q, level, counter){
    e.preventDefault()
    console.log(game)
    
    // solutions : [ round1 : {{question1: q}, {answers: [a1,a2,a3,a4]}, { answer: user_selection } }, round2: {q2: {answers: ans}} ... ] 

    let answerCounter = 0
    e.target.querySelectorAll("input").forEach( answer => {

        if (answer.checked === true) { 
            game.solutions[game.counter].user_answer = answer.value
            if (answer.value === q.correct_answer){ //RIGHT ANSWER
                game.bossHP -= 25
                game.correct += 1
                // if(game.bossHP === 25){
                //     game.bossHP = 0
                // }
                // answer.parentNode.style.color = "green"
                
                // console.log("bossHp: "  + game.bossHP)
                
                game.counter++
                if( game.counter < game.level.questions.length){
                    renderQuestion(game)
                    
                } else {
                    
                    showResults(game)
                }
                
            } else { // WRONG ANSWER
                console.log("wrong")
                game.userHP -= 25
                
                if(game.userHP <= 0){
                    game.userHP = 0
                }
                
                // userHP -= 50
                // if(userHP === 0){
                //     console.log("Game Over")
                // }
                answer.parentNode.style.color = "red"
                // console.log("user_hp: " + game.userHP)
                //move to next question
                game.counter++
                if( game.counter < game.level.questions.length){
                    renderQuestion(game)

                }else {  
                    showResults(game)
                }// go to next screen function
            }
        }
        //
    })
    
}


function showResults(game){
    document.getElementById("level-container").hidden = true
    const gameNode = document.getElementById("game-container").hidden=false

    // your score
    const resultNode = document.getElementById("result")
    const resultH1Node = document.createElement("h1")
    const nextGameNode = document.createElement("div")
    const solutionDivNode = document.createElement("div")
    const solutionH1Node = document.createElement("h1")
    const menuDivNode = document.createElement("div")
    const menuH1Node = document.createElement("h1")
    resultNode.append(resultH1Node, nextGameNode, solutionDivNode, menuDivNode)

    let percentage = (game.correct / game.level.questions.length) * 100
    if(percentage >= 80 ){
         //if lose, show percentage, message "You Lose", create CONTINUE button
        resultH1Node.innerText = `${percentage} %  You Win! 😄`
        
        const continueBtn = document.createElement("button")
        continueBtn.innerText = "CONTINUE"
        nextGameNode.appendChild(continueBtn)
         
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
    solutionBtnNode.addEventListener("click", () => showSolutions(game))
    solutionH1Node.appendChild(solutionBtnNode)
    solutionDivNode.appendChild(solutionH1Node)
    
     //create a button for going back to menu
    const menuBtnNode = document.createElement("button")
    menuBtnNode.innerText = "MENU"
    menuH1Node.appendChild(menuBtnNode)
    menuDivNode.appendChild(menuH1Node)
  

}
//next screen fucntion hides quesitonbox shows result page
    


function showSolutions(game){
   game.solutions.forEach(solution => {
       console.log(solution.question)
       console.log(solution.user_answer)
       console.log(solution.answers)
   })
}
