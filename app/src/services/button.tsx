import { Link } from "react-router-dom"
import { Buttons, Typography, Column } from "../style/Style"

type StringProps = {
    labelButton: string
    to: string
}

const Button = ({labelButton, to}: StringProps) =>{

    const handleClick = () =>{
       console.log("Iniciar") 
    }

    return(
        <>
        <Link to={to}>
            
            <Buttons onClick={()=>handleClick()}>
                <Typography>
                {labelButton}
                </Typography> 
            </Buttons>
        </Link>
        </>
    )
}

export default Button