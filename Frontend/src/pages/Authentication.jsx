import { json } from "react-router-dom";
import SignInForm from "../components/SignInForm"

export const AuthenticationPage = () => {


    return <>
        <SignInForm />
    </>

}

export const action = async ({ request, params }) => {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'signup';
    if (mode !== 'signin' && mode !== 'signup')
        throw json({ title: 'Mode not supported' }, { status: 400 })

    const formData = await request.formData();
    const user = { username: formData.get('username'), password: formData.get('password') };
    try {
        const reponse = await fetch(`http://localhost:3000/auth/${mode}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {

    }

} 