import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import config from "./config.json";

import 'react-chat-widget/lib/styles.css';
import './styles.css';

import logo from "./logo.svg"

export default class ChatWidget extends Component {
    constructor(props) {
        super(props);
        this.conversation = [];
    }

    componentDidMount() {
        const mes = 'Hello, welcome! How can I help you?'
        addResponseMessage(mes);
    }

    handleNewUserMessage = async newMessage => {
        console.log(`New message incoming! ${newMessage}`);
        try {
            const response = await fetch(config.server_host+'/api/prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "query": newMessage,
                    }
                )
            });
            const json = await response.json();
            console.log('Success:', json);
            addResponseMessage(json.response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                profileAvatar={logo}
                title="Blue Devil Chat"
                subtitle="Chat with the Blue Devil Bot"
            />
        );
    };
};
