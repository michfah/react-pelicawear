import { useState } from "react";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-in.scss';

const defaultformFields = {
    email: '',
    password: '',
}


const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect email or password');
                    break
                case 'auth/user-not-found':
                    alert('No user found with this email');
                    break;
                default:
                    console.log('error: ', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with email & password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;