import "./answertimer.scss";
import { useEffect ,useState,useRef} from "react";


function Answertimer({duration,onTimeup}){
    const [counter,setCounter]=useState(0);
    const [progressloaded,setProgressloaded]=useState(0);
    const intervalRef=useRef();

useEffect(()=>{
  intervalRef.current= setInterval(()=>{
    setCounter((cur)=>cur+1)
   },1000) 
   return ()=>clearInterval(intervalRef.current);
},[])

useEffect(()=>{
    setProgressloaded((counter/duration)*100);
    if(counter===duration)
    {
        clearInterval(intervalRef.current);  
        setTimeout(()=>{
          onTimeup();
        },1000) 
    }

}, [counter])


return(
    <div className="answer-timer">
        <div 
        style={{
            width:`${progressloaded}%`,
            backgroundColor:`${
                progressloaded<50 ?
               " lightgreen"  :
               progressloaded<70 ?
               "orange":
               "red"
            }`,
        }}
        
        className="progress"></div>
    </div>
);
}
export default Answertimer;