function showSolutions(game){
    const eachQuestionDiv = document.createElement("div"),
        correctAnswersDiv = document.getElementById("correct_answers"),
        divContainer = document.getElementById("correct-answers-container"),
        menuDiv = document.createElement("div"),
        hideBtn = document.createElement("button")
        
    menuDiv.append(hideBtn)
    menuDiv.id = "back-Menu"
    hideBtn.className = "btn"


 

    divContainer.innerHTML = ""
    divContainer.style.display = "flex"
    correctAnswersDiv.innerHTML = ""
    correctAnswersDiv.style.display = "flex" 
    divContainer.append(correctAnswersDiv)
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
            li.style.color = "#ff0303"
            li.innerText = "• " + solution.user_answer 
        }

        if (li.innerText === solution.correct_answer ||  li.innerText === "• " + solution.correct_answer){
            li.style.color = "#04ff19" 
        }
        })  
    })

   divContainer.append(menuDiv)
   hideBtn.innerText = "Back to Results"
   hideBtn.onclick = () => {
       divContainer.style.display = "none"
       showResults(game)
   }
}