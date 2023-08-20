import {useState} from 'react';
import {resultInitialState} from '../../constants'
import Answertimer from '../AnswerTimer/answertimer';
import "./Quiz.scss";
const Quiz=({questions})=>{
const [currentQue, setcurrentQue]=useState(0);
const [answerIdx,setanswerIdx]=useState(null);
const [answer,setAnswer]=useState(null);
const {question,choices,correctAnswer,type}=questions[currentQue];
const [result,setResult]=useState(resultInitialState);
const [showResult,setShowResult]=useState(false);
const [showAnswerTimer,setshowAnswerTimer]=useState(true);
const [inputAnswer,setInputAnswer]=useState('');


const onAnswerClick=(answer,Index)=>{
    setanswerIdx(Index);
    if(answer===correctAnswer){
        setAnswer(true);
    }
    else{
        setAnswer(false);
    }
}
const onClickNext=(finalAnswer)=>{
   
    setanswerIdx(null);
    setshowAnswerTimer(false);
    setResult((prev)=>
    finalAnswer ?
{
    ...prev,
    score:prev.score+5,
    correctAnswer:prev.correctAnswer+1,
}:
{
    ...prev,
    wrongAnswers:prev.wrongAnswers+1,
}
    );

    if(currentQue!== questions.length-1){
        setcurrentQue((prev)=>prev+1);
    }
    else{
        setcurrentQue(0);
        setShowResult(true);
    }
    setTimeout(()=>{
        setshowAnswerTimer(true);
    })
}

const onTryAgain=()=>{
setResult(resultInitialState);
setShowResult(false);
}
const onHandleup=()=>{
   setAnswer(false);
   onClickNext(false); 
}

const handleInputChange=(evt)=>{
setInputAnswer(evt.target.value);
if(evt.target.value===correctAnswer){
    setAnswer(true);
}
else{
    setAnswer(false);
}
}
const typeofque=()=>{

if(type==="FIB"){
    return(
        <input value={inputAnswer} onChange={handleInputChange}/>
    )
}

return( <ul>
    {choices.map((answer,index)=>(
      <li
          onClick={()=> onAnswerClick(answer,index)}
          key={answer}
          className={answerIdx===index ? "selectedAnswer":null}
          >
              {answer}
      </li>
    ))}  
  </ul>);
}

    return(
    <div className=" quiz-container">
        {!showResult ? ( <>
       {showAnswerTimer && (<Answertimer duration={12} onTimeup={onHandleup}/>)}
        <span class="active-question-no"> {currentQue+1}</span>
        <span class="total-que">/{questions.length}</span>
        <h2>{question}</h2>
       {typeofque()};
        <div className='footer'>
            <button onClick={()=>onClickNext(answer)} disabled={answerIdx===null && !inputAnswer}>
                {currentQue===questions.length-1 ? "Finish" : "Next"}
            </button>
        </div>
        </>)
        :<div className="result">
            <h3>Result</h3>
         <p>
          Total Questions: <span>{questions.length}</span>  
         </p>
         <p>
          Total Score: <span>{result.score}</span>  
         </p>
         <p>
         Correct Answer : <span>{result.correctAnswer}</span>  
         </p>
         <p>
        Wrong Answer : <span>{result.wrongAnswers}</span>  
         </p>
         <button onClick={onTryAgain}>Try Again </button>

            </div>}
       

    </div>
    );
}
export default Quiz;