import { Form, Link, useSearchParams } from "react-router-dom";
import Input from "./Input";

const SignInForm = () => {
    const [params, setParams] = useSearchParams();

    const isSignin = params.get('mode') === 'signin';
    return <>
        <div className="row">
            <div className="col-md-4 offset-4">
                { isSignin && <h3>Login</h3> }
                { !isSignin && <h3>Register</h3> }
                <Form>
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
                    <button type="submit"
                        className="btn btn-primary"
                    >
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