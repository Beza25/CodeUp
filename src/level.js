function renderLevel(game){
    document.getElementById("profile-container").style.display = "none"
    document.getElementById("level-container").style.display  = "flex"
    const  mainContainer = document.getElementById("center-container")
    mainContainer.style.backgroundImage = "url(https://lh3.googleusercontent.com/proxy/-hvc_cdzJtWotpNUIh1dEoaELOWyRh-CsgKe7BWNfuEjXwYxBa2mfq4tv-iY9GBPC6MbaATfrS-HUd-BI05SCUmPE5FNP8_ldnsHQxaXe0-OzhSjFm3jPfNScWpl7uZjlMjwt0cR)"
    
    const levelDiv = document.getElementById("level-name")
    document.getElementById("game-container").style.display = "none" //##################
    const levelContainer = document.getElementById("level-container")
    levelContainer.style.display= "flex"
    
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
    userHpDiv.innerHTML = '<div id="user-HpBar"></div>'
    userAvatorDiv.id = "user-avatar"
    userAvatorImg.src = game.user.avatar
    userAvatorImg.id = "user-avatar-image"
    userAvatorImg.height = "300"

    const bossAvatorDiv = document.createElement("div"),
            bossHpDiv = document.createElement("div"),
            bossAvatorImg = document.createElement("img")

    bossHpDiv.id = "bossHp"
    bossHpDiv.innerHTML = '<div id="boss-HpBar"></div>'
    bossAvatorDiv.id = "boss-avatar"
    bossAvatorImg.src = "https://66.media.tumblr.com/42c6cedbebe2a8a41793adc063a938bd/tumblr_ntip7ywsIw1tgzy56o1_400.gifv"
    bossAvatorImg.height = "300"

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
 
     levelContainer.append(leftLevelDiv,rightLevelDiv,centerDiv)//left center right)
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
        formBtn.id= "submit-question"
        formBtn.innerText = "SUBMIT"
        formAnswer.appendChild(formBtn)
        
        formAnswer.onsubmit = () => submitAnswer(event, q, game)

        game.solutions.push({question: q.question, answers: shuffledAnswers})
        game.solutions[game.counter].correct_answer = q.correct_answer
      
        centerDiv.append(questionBox)
       

}


// [  {av1; { img}, attack: [1..5]}, {av2; { img}, attack: [1..5]}  ]

function submitAnswer(e, q, game) {
    e.preventDefault()

    const userAvatar = document.getElementById("user-avatar-image")
    
    let fightAvatarArr = ["https://media3.giphy.com/media/10i3IdQDBSTsjK/source.gif",
                        "https://i.pinimg.com/originals/c1/35/d8/c135d8bdc8d1a6b0625b31114ee205a0.gif", 
                        "https://media1.giphy.com/media/ZGDsOACVB7YU8/source.gif", 
                        "https://media3.giphy.com/media/10i3IdQDBSTsjK/source.gif",
                        "https://media.giphy.com/media/rVxbfXk7nOs8w/giphy.gif" ]
    

    const bossBar = document.getElementById("boss-HpBar"),
        userBar = document.getElementById("user-HpBar")


    e.target.querySelectorAll("input").forEach( answer => {

        if (answer.checked === true) { 
            game.solutions[game.counter].user_answer = answer.value
            if (answer.value === q.correct_answer){ //RIGHT ANSWER
                game.bossHP -= 25
                game.correct += 1        
                game.counter++
                bossBar.style.width = `${game.bossHP * 2}px`
                let counter = 0
                userAvatar.src = fightAvatarArr[game.counter]
                counter++
                if( game.counter < game.currentLevel.questions.length){
                    renderQuestion(game)
                    
                } else {
            showResults(game)
                    // setTimout(() => showResults(game), 2000)
                }
                
            } else { // WRONG ANSWER
                // console.log("wrong")
                game.userHP -= 25
                userBar.style.width = `${game.userHP * 2}px`
                if(game.userHP <= 0){
                    game.userHP = 0
                }
        
                answer.parentNode.style.color = "red"
                game.counter++
                if( game.counter < game.currentLevel.questions.length){
                    renderQuestion(game)

                }else {  
                    showResults(game)
                    // setTimout(() => showResults(game), 2000)
                }
            }
        }
        //
    })

    // console.log(`userHP: ${game.userHP}, bossHP: ${game.bossHP}`)
    
}