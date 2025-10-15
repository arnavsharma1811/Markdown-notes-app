'use client'
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const cantAuth = !email.includes('@') || password.length < 6;
    const { login, signUp } = useAuth()
    const router = useRouter();

    async function handleAuthUser() {
        if (cantAuth) {
            return
        }
        setIsAuthenticating(true);
        try {
            if (isRegister) {
                await signUp(email, password)
            }
            else {
                await login(email, password)
            }
        router.push('/notes')
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <>
            <div className="login-container">
                <h1 className="text-gradient">Scribo</h1>

                <h6>{isRegister? 'Create An Account' :'Sign in'}</h6>
                <div>
                    <p>Email</p>
                    <input value = {email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="text" placeholder="Enter Your Email" />
                </div>
                <div>
                    <p>Password</p>
                    <input value = {password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder="*******" />
                </div>

                <button onClick={handleAuthUser} disabled={cantAuth || isAuthenticating} className="Submit-btn">
                    <h6>{isAuthenticating? 'Submitting... ' : 'Submit' }</h6></button>
                <div className="secondary-btns-container">
                    <button onClick={() => {
                        setIsRegister(!isRegister)
                    }} className="card-button-secondary"><small>{isRegister ?'Log in' : 'Sign Up'}</small></button>


                    <button className="card-button-secondary"><small>Forgot password?</small></button>
                </div>
                <div className="full-line"></div>
                <footer>
                    <a href="https://github.com/arnavsharma1811" target="_blank">
                        <img alt="pfp" src="ghpfp.jpg"></img>
                        <h6>@arnavsharma1811</h6>
                        <i className="fa-brands fa-github" />
                    </a>
                </footer>
            </div>
        </>
    )
}