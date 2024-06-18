import { Form, Link, useActionData, useSearchParams } from "react-router-dom";
import Input from "./Input";

const SignInForm = () => {
    const [params, setParams] = useSearchParams();
    const data = useActionData();
    console.log('action data recieved', data)
    const isSignin = params.get('mode') === 'signin';
    return <>
        <div className="row">
            <div className="col-md-4 offset-4">
                { isSignin && <h3>Login</h3> }
                { !isSignin && <h3>Register</h3> }
                <Form method="post" action="/auth">
                    <Input label='Username'
                        type='text'
                        name='username'
                        required
                    />
                    <Input label='Password'
                        type='password'
                        name='password'
                        required
                    />
                    <button className="btn btn-primary" >
                        Submit
                    </button>
                    { isSignin && <p>New user? <Link to='?mode=signup'>Register</Link></p> }
                    { !isSignin && <p>Already a member? <Link to='?mode=signin'>Login</Link></p> }
                </Form>

            </div>
        </div>

    </>
}

export default SignInForm;