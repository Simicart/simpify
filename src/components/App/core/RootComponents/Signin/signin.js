import React from 'react';
import { useSignin } from 'src/hooks/useSignin';
import { Form, Text, useFieldState } from 'informed';
import TextInput from '../../Form/TextInput';
import { isRequired } from 'src/util/formValidators';
import './signin.scss';

const Signin = (props) => {
    const { setFormApi, handleSubmit, isSignin } = useSignin();

    return (
        <div className='sign-in-form-wrapper'>
            <Form
                className='sign-in-form'
                getApi={setFormApi}
                onSubmit={(e) => handleSubmit(e)}
            >
                <label>
                    Email:
                    <TextInput
                        field='email'
                        type='email'
                        validate={isRequired}
                        validateOnBlur
                    />
                </label>
                <label>
                    Password:
                    <TextInput
                        field='password'
                        type='password'
                        validate={isRequired}
                        validateOnBlur
                    />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
};

export default Signin;
