import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";

function ErrorPage() {
    
    let navigate = useNavigate();

    function returnHome()
    {
        navigate("/");
    }

    return ( 
        <div className={classes.errorPage}>
            <h1>404 NOT FOUND</h1>
            <button onClick={returnHome}>Return home</button>
        </div>
     );
}

export default ErrorPage;