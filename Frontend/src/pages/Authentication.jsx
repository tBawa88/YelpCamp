import { json, redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm"
import { setToken } from "../utils/auth";

export const AuthenticationPage = () => {


    return <>
        <SignInForm />
    </>

}

//Auth action
export const action = async ({ request, params }) => {
    console.log("auth action triggerred")
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'signin';
    if (mode !== 'signin' && mode !== 'signup')
        throw json({ title: 'Mode not supported' }, { status: 400 })

    const formData = await request.formData();
    const user = { username: formData.get('username'), password: formData.get('password') };
    try {
        const response = await fetch(`http://localhost:3000/auth/${mode}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 404) {
            console.log("Authentication failed")
            return response;
        }

        if (!response.ok)
            throw json({ title: 'Error while authentication user' }, { status: 500 });

        //if everything goes right, save the token received from backend
        const data = await response.json();
        const token = data.token;
        //also set the expiration date of this token
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);
        setToken(token, expireDate.toISOString());
        return redirect('/campgrounds');


    } catch (error) {
        console.log("Error while sending request to auth")
        throw json({ title: 'Error while authentication user' }, { status: 500 });
    }

} 