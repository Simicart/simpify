import React, { Fragment } from 'react';
import { node, string } from 'prop-types';
import { Text as InformedText, useFieldState } from 'informed';
import Message from './Message';

const TextInput = (props) => {
    const { field, message, ...rest } = props;
    const fieldState = useFieldState(field);
    const inputClass = fieldState.error
        ? 'spf-textinput error'
        : 'spf-textinput';

    return (
        <Fragment>
            <InformedText {...rest} className={inputClass} field={field} />
            <Message fieldState={fieldState}>{message}</Message>
        </Fragment>
    );
};

export default TextInput;

TextInput.propTypes = {
    field: string.isRequired,
    message: node,
};
