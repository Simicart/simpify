import React, { useEffect } from 'react';
import { useSignin } from 'src/hooks/useSignin';
import { Form } from 'informed';
import TextInput from '../../Form/TextInput';
import { isRequired } from 'src/util/formValidators';
import Loading from 'src/components/Loading';
import { showToastMessage } from 'src/util/showToastMessage';
import { useIntl } from 'react-intl';
import { useHistory } from 'src/drivers';

import './signin.scss';

let clickedSignin = false;

const Signin = (props) => {
    const { userState, setFormApi, handleSubmit, isSigningIn, signInError } =
        useSignin();
    const history = useHistory();
    const { formatMessage } = useIntl();
    useEffect(() => {
        if (userState && userState.currentUser) {
            if (clickedSignin)
                showToastMessage(
                    formatMessage({
                        id: 'Welcome %@ %@ Start shopping now',
                    }).replace('%@ %@', userState.currentUser.displayName),
                );
            history.push('/');
        }
    }, [userState]);

    const onSubmit = (e) => {
        clickedSignin = true;
        handleSubmit(e);
    };

    return (
        <div className='sign-in-form-wrapper'>
            <Form
                className='sign-in-form'
                getApi={setFormApi}
                onSubmit={onSubmit}
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
                {isSigningIn ? <Loading /> : signInError ? 'Signin Error!' : ''}
            </Form>
        </div>
    );
};

export default Signin;
