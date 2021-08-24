import React from 'react';
import { useIntl } from 'react-intl';
import { node, number, oneOfType, shape, string } from 'prop-types';

const Message = (props) => {
    const { children, fieldState } = props;
    const { formatMessage } = useIntl();
    const { error } = fieldState;

    let translatedErrorMessage;

    if (error) {
        translatedErrorMessage = formatMessage(
            {
                id: error.id,
                defaultMessage: error.defaultMessage,
            },
            { value: error.value },
        );
    }

    return (
        <p className='formfield-message'>
            {translatedErrorMessage || children}
        </p>
    );
};

export default Message;

Message.defaultProps = {
    fieldState: {},
};

Message.propTypes = {
    children: node,
    fieldState: shape({
        error: shape({
            id: string,
            defaultMessage: string,
            value: oneOfType([number, string]),
        }),
    }),
};
