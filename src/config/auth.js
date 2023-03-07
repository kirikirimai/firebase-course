import React, { useState } from 'react'
import { auth,googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword ,signInWithPopup} from "firebase/auth"
const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const singIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log(error)
        }
    }

    const signInWidthGoogle = async () => {
        try {
            await signInWithPopup(auth,googleProvider)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='email..' />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password..' />
            <button onClick={singIn}>sign in</button>

            <button onClick={signInWidthGoogle}>Sign In Width Google</button>

        </div>
    )
}

export default Auth