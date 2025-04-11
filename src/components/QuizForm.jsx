import { useState, useEffect } from "react";
import Question from "./Question";


function QuizForm(){
    const [difficulty, setDifficulty] = useState("");
    const [amount, setAmount] = useState(0);
    const [quizUrl, setQuizUrl] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        if (difficulty && amount > 0 && !quizStarted) { 
            const newQuizUrl = `https://opentdb.com/api.php?amount=${amount}&category=22&difficulty=${difficulty}&type=multiple`;
            setQuizUrl(newQuizUrl);
        }
    }, [difficulty, amount, quizStarted]);

    const startQuiz = () => {
        if (difficulty && amount > 0) {
            setQuizStarted(true);
        }
    };

    return(
    <div className="initial-form">
        <h1>Test Your Geography Knowledge</h1>
        {!quizStarted ? (
            <form>
            <label> Select Difficulty: <br></br>
                <select id="difficulty" value={difficulty} onChange={(e) => {setDifficulty(e.target.value)}}>
                    <option value="">Choose difficulty</option>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </label>
            <label> Select number of questions:<br></br>
                <input type="number" id="amount" value={amount} onChange={(e) => {setAmount(Number(e.target.value))}}></input>
            </label>
            <button type="button" onClick={startQuiz}>
                        Start Quiz
            </button>
        </form>
        ) : (
                <Question quizUrl={quizUrl} amount={amount}/>
            )}

    </div>)

}


export default QuizForm;