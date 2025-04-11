import { useState, useEffect } from "react";
import axios from "axios";

function Question({quizUrl, amount}){

    const [questions, setQuestions] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({answer: "", isCorrect: false});
    const [correctAnswered, setCorrectAnswered] = useState(0);
    
   
    useEffect(() => {
            axios.get(quizUrl)
            .then(response => setQuestions(response.data.results))
            .catch(err => console.log(err))
      
    }, [])

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
                () => Math.random() - 0.5
            );
            setShuffledAnswers(answers);
        }
    }, [questions, currentQuestionIndex]);
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return <div>Učitavanje...</div>;
    }

    function handleNext(){
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer({answer: "", isCorrect: false});
        }
    }

    function handleAnswer(e){
       const clickedAnswer = e.target.value;
       if(clickedAnswer == currentQuestion.correct_answer){
            setSelectedAnswer({ answer: clickedAnswer, isCorrect: true })
            setCorrectAnswered(correctAnswered + 1);
       }else{
            setSelectedAnswer({ answer: clickedAnswer, isCorrect: false })
       }
    }

    return(
        <div className="quiz-container">
            {currentQuestionIndex < questions.length ? (
                <div className="info">
                    <div>Current question{currentQuestionIndex + 1}/{amount}</div>
                    <div className="current-result">Result:{correctAnswered}</div>
            </div>
            ) : ""}
            
            {currentQuestionIndex == questions.length - 1 && selectedAnswer.answer != "" && (
                <div className="result-screen">
                    <h2>Quiz Finished!</h2>
                    <p>Your score: {correctAnswered} / {amount}</p>
                <button onClick={() => window.location.reload()}>Play Again</button>
            </div>
           )}
            
            <div className="question-card">
                <h3>{currentQuestionIndex + 1}. Question:</h3>
                <span>{currentQuestion.question}</span>
                <ul>
                    {shuffledAnswers.map((answer, index) => {                        
                        const isSelected = selectedAnswer.answer === answer;
                        return(
                            <button className="answer-button" key={index} value={answer} onClick={handleAnswer} disabled={selectedAnswer.answer !== ""}>
                                {index + 1}. {answer} {isSelected && (selectedAnswer.isCorrect ? "✅" : "❌")}
                            </button>
                        )
                    })}
                </ul>
            </div>
            <button id="next-button" onClick={handleNext} disabled={selectedAnswer.answer === ""}>Next</button>
        </div>
    )

}

export default Question;