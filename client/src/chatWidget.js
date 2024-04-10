import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

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
        this.conversation.push(
            {
                role: "assistant",
                content: mes
            });
    }

    handleNewUserMessage = async newMessage => {
        console.log(`New message incoming! ${newMessage}`);
        this.conversation.push(
            {
                role: "user",
                content: newMessage
            });
        try {
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: this.createRequestBody(),
            });
            const json = await response.json();
            console.log('Success:', json);
            const message = json.message;
            this.conversation.push(message);
            addResponseMessage(message.content);
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

    createRequestBody() {
        return JSON.stringify(
            {
                "model": "phi",
                "messages": this.conversation,
                "stream": false
            }
        );
    }
};
