import { Link } from "react-router-dom";
import { Buttons, Typography, Column } from "../style/Style";

type StringProps = {
    labelButton: string
    to: string
    onclick?(): void
}

const Button = ({labelButton, to, onclick}: StringProps) =>{

    const handleClick = () =>{
       console.log("Iniciar");
    }

    return(
        <>
        <Link to={to}>
            
            <Buttons onClick={onclick? onclick : handleClick}>
                <Typography>
                {labelButton}
                </Typography> 
            </Buttons>
        </Link>
        </>
    )
}

export default Button;