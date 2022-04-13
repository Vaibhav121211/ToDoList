import React from "react";

const Buttons=({taskCompleted,deletetask,t})=>{
    return <div>
        <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
    </div>
}

export default Buttons;