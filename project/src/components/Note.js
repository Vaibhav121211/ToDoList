import Buttons from "./Buttons";
import React from "react";
const Note=({tasklist,deletetask,taskCompleted})=>{
    return <div className="note">
        {tasklist.map((t) => (
            <div key={t.id}>
            <li className={t.isCompleted ? "crossText listitem" : "listitem"}>
             <p>{t.value}</p> 
                <Buttons taskCompleted={taskCompleted} deletetask={deletetask} t={t}/>

              
            </li>
            </div>
          ))}
    </div>
}
export default Note;