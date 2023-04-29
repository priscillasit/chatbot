import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        message = message.toLowerCase()
        if ((message.includes('refund') && (message.includes('membership') || message.includes('donation') || message.includes('donating'))) || message.includes('refund')){
            actions.handleRefund();
        } else if ((message.includes('change') || message.includes('update')) && (message.includes('mail') || message.includes('address') || (message.includes('name')))){
            actions.handleChangePersonalInfo();
        } else if ((message.includes('donation') || (message.includes('adopt')))) {
            actions.handleDonationQuestion();
        } else if ((message.includes('update') || message.includes('remove') || (message.includes('take') && (message.includes('off')))) &&
            (message.includes('mail'))) {
            actions.handleChangeSolicitation();
        } else if ((message.includes('cancel')) &&
            (message.includes('subscription') || message.includes('membership') || message.includes('donation'))) {
            actions.handleSustainerRequest();
        } else {
            actions.handleContact();
        }
        // }  else if (message.includes('monthly') || message.includes('donation')) {
        //     actions.handleDonations();
        // } else if ((message.includes('mail') || message.includes('mailing')) && message.includes('remove')) {
        //     actions.handleMailing();
        // }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;