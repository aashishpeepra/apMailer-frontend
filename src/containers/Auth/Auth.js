import styles from "./Auth.module.css";
import {useState} from "react";
import apmailer from "../../Assets/icons/apmailer.jpg";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/loader/loader";

export default function Auth(props){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [verifying,setVerifying] = useState(false);
    const onDataChange = (e)=>{
        if(e.target.name==="email")
            setEmail(e.target.value);
        else
        setPassword(e.target.value);
    }
    const formSubmit = (event)=>{
        event.preventDefault();
        setVerifying(true);
        // submit details to backend
        fetch("http://localhost:5000/api/user/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
              },
              body:JSON.stringify({email,password})
        }).then(response=>{
            response.json().then(data=>{
                console.log(data)
                setVerifying(false);
                props.setAuth(data);
                
            })
        }).catch(err=>{
            console.log(props,err)
            props.setAuth(undefined);
        })

    }
    return (
        <main className={styles.Auth}>
            <aside>
               <h1>Welcome to AP Mailer</h1> 
               <div className={styles.Auth_aside_img_holder}>
                   <img src={apmailer} alt="login to send mails with mailgun" id="apmailerimg"/>
               </div>
            </aside>
            <section id="user-login-form">
                <h3> Login </h3>
                <form id="login-form" method="POST">
                    <fieldset>
                        <label htmlFor="email">Email</label>
                        <input placeholder="@urlefy.com" type="email" id="email" name="email" required autoComplete={"true"} value={email} onChange={e=>onDataChange(e)} autoFocus={true} autoSave={"true"} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input min={8} type="password"  id="password" name="password" required value={password} onChange={e=>onDataChange(e)}/>
                    </fieldset>
                    <fieldset>
                        {
                            verifying ? <Loader/> : <Button disable={verifying} submit func={formSubmit}>Login</Button>
                        }
                        
                    </fieldset>
                    
                </form>
            </section>
        </main>
    )
}