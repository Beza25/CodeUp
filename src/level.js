function renderLevel(game){

    const levelDiv = document.getElementById("level-name")
    document.getElementById("game-container").hidden = true
    const levelContainer = document.getElementById("level-container")

    levelContainer.hidden = false
   
    
     // create user avator
     const leftLevelDiv = document.createElement("div"),
            centerDiv = document.createElement("div"),
            rightLevelDiv = document.createElement("div")

    
    leftLevelDiv.id =  "left-level"
    centerDiv.id = "center-level"
    rightLevelDiv.id =  "right-level"

    

     const userAvatorDiv = document.createElement("div"),
            userHpDiv = document.createElement("div"),
            userAvatorImg = document.createElement("img")
    
    userHpDiv.id = "userHp"
    userAvatorDiv.id = "user-avatar"
    userAvatorImg.src = game.user.avatar

    const bossAvatorDiv = document.createElement("div"),
            bossHpDiv = document.createElement("div"),
            bossAvatorImg = document.createElement("img")

    bossHpDiv.id = "bossHp"
    bossAvatorDiv.id = "boss-avatar"
    bossAvatorImg.src = "https://cdn5.f-cdn.com/contestentries/1475693/24026982/5c7389da5006e_thumb900.jpg"
     

     userAvatorDiv.appendChild(userAvatorImg) 
     leftLevelDiv.append(userHpDiv, userAvatorDiv)

     bossAvatorDiv.appendChild(bossAvatorImg) 
     rightLevelDiv.append(bossHpDiv, bossAvatorDiv)

     //  left    center     right
      //       | question |
      //       |   box    |
      //       |
      //hpbar  |             boss hp
      // avatar|             boss ava
      //       |
 
     levelContainer.append(leftLevelDiv,centerDiv,rightLevelDiv)//left center right)
     renderQuestion(game)
}

function renderQuestion(game){
   
    let q = game.currentLevel.questions[game.counter]
    //console.log( `after: ${game.currentLevel.questions}`)
   const centerDiv = document.querySelector("#center-level")
   
    
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
        
        formAnswer.onsubmit = () => submitAnswer(event, q, game)

        game.solutions.push({question: q.question, answers: shuffledAnswers})
        game.solutions[game.counter].correct_answer = q.correct_answer
      
        centerDiv.append(questionBox)
       

}

function submitAnswer(e, q, game) {
    e.preventDefault()
    // console.log(game)

    
    // solutions : [ {question1: q}, {answers: [a1,a2,a3,a4]}, { answer: user_selection } }, round2: {q2: {answers: ans}} ... ] 

    let answerCounter = 0
    e.target.querySelectorAll("input").forEach( answer => {

        if (answer.checked === true) { 
            game.solutions[game.counter].user_answer = answer.value
            if (answer.value === q.correct_answer){ //RIGHT ANSWER
                game.bossHP -= 25
                game.correct += 1        
                game.counter++

                if( game.counter < game.currentLevel.questions.length){
                    renderQuestion(game)
                    
                } else {
                    
                    showResults(game)
                }
                
            } else { // WRONG ANSWER
                // console.log("wrong")
                game.userHP -= 25
                
                if(game.userHP <= 0){
                    game.userHP = 0
                }
        
                answer.parentNode.style.color = "red"
                game.counter++
                if( game.counter < game.currentLevel.questions.length){
                    renderQuestion(game)

                }else {  
                    showResults(game)
                }
            }
        }
        //
    })

    // console.log(`userHP: ${game.userHP}, bossHP: ${game.bossHP}`)
    
}