import React from 'react';
import './homepage.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTopMessage, useApp } from 'src/drivers/Context';
import { showToastMessage } from 'src/util/showToastMessage';
import { Link } from 'src/drivers';

const Homepage = (props) => {
    const [, { toggleMessage }] = useTopMessage();
    const { formatMessage } = useIntl();
    const [appState, { setLoading, toggleDrawer }] = useApp();
    console.log(appState);
    return (
        <>
            <FormattedMessage id='Favourites' defaultMessage='Favourites' />
            <br />
            <FormattedMessage id='ARTICLES' defaultMessage='ARTICLES' />
            <br />
            {formatMessage({ id: 'ARTICLES' })}
            <br />
            <br />
            <button
                onClick={() => {
                    toggleMessage(
                        {
                            type: 'error',
                            message: formatMessage({
                                id: 'TestNotFoundTranslation',
                            }),
                            auto_dismiss: false,
                        },
                        'test',
                    );
                }}
            >
                Toggle message test
            </button>
            <br />
            <button
                onClick={() => {
                    toggleMessage(
                        {
                            type: 'success',
                            message: 'This would dismiss.',
                            auto_dismiss: true,
                        },
                        'test2',
                    );
                }}
            >
                {' '}
                Toggle message auto disimiss
            </button>
            <br />
            <button
                onClick={() => {
                    showToastMessage('abc Test toast');
                }}
            >
                Test Toast message
            </button>
            <br />
            <button
                onClick={() => {
                    setLoading(true);
                }}
            >
                Test Global loading
            </button>
            <br />
            <button
                onClick={() => {
                    toggleDrawer('nav');
                }}
            >
                Toggle Drawer
            </button>
            <br />
            <Link to='/products/leather-anchor'>Product Details Page</Link>
            <br />
            <Link to='/collections/test-collection'>Collection Page</Link>
            <br />
            <Link to='/account/login'>Signin Page</Link>
        </>
    );
};

export default Homepage;
