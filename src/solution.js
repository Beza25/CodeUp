function showSolutions(game){
    const eachQuestionDiv = document.createElement("div"),
        correctAnswersDiv = document.getElementById("correct_answers"),
        hideBtn = document.createElement("button")

    correctAnswersDiv.innerHTML = ""
    correctAnswersDiv.hidden = false 

    game.solutions.forEach(solution => {
        const h4 = document.createElement("h4"),
            ul = document.createElement("ul")
        ul.style.listStyle = "none"
        correctAnswersDiv.append(eachQuestionDiv)
        eachQuestionDiv.append(h4, ul)
         // solutions : [ {question1: {q}}, {answers: [a1,a2,a3,a4]}, { answer: user_selection } }, round2: {q2: {answers: ans}} ... ] 


        h4.innerText = solution.question

        solution.answers.forEach( answer =>{
        const li = document.createElement("li")
       
        li.innerText = answer
        ul.append(li)
        if (li.innerText === solution.user_answer) {
            li.style.color = "red"
            li.innerText = "• " + solution.user_answer 
        }

        if (li.innerText === solution.correct_answer ||  li.innerText === "• " + solution.correct_answer){
            li.style.color = "green" 
        }
        })  
    })
   correctAnswersDiv.append(hideBtn)
   hideBtn.innerText = "Back to Results"
   hideBtn.onclick = () => {
       correctAnswersDiv.hidden = true
       showResults(game)
   }
}