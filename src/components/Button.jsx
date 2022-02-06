import React, {Fragment} from "react";

const Button = (props)=>{
     return(
         <Fragment>
             <button className="bg-indigo-600 font-bold text-white py-2 px-6 rounded
             md:ml-8 hover:bg-indigo-400 duration-500">
                 {props.children}
             </button>
         </Fragment>
     )
}
export default Button;