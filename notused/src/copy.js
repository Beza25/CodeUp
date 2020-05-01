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
    console.log(level)

    const levelDiv = document.getElementById("level-name")
    
    renderQuestion(level.questions[0])
    debugger

    

    // const correct_answer = level.correct_answer
    
}

function renderQuestion(q){
    const questionBox = document.getElementById("question-box")
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
        
        formAnswer.onsubmit = () => submitAnswer(event, q)
        //Add event listner     
}


function submitAnswer(e, q){
    
}



    



