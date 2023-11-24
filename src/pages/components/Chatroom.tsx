// ChatRoom.tsx
import React, { useState, useEffect } from 'react';
import Input from './Input';
import { useLevel3SolvedContext } from '../../App';

interface Message {
	id: number;
	content: string;
	sender: string;
}

interface ChatRoomProps {
	initialMessages?: Message[];
}

const fakeWebsite = 'cpen442bankgiveaway.com';

const badLinks = [
	fakeWebsite
];	

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
	const [messages, setMessages] = useState<Message[]>(props.initialMessages || []);
	const [newMessage, setNewMessage] = useState('');
	const { set_level3_solved } = useLevel3SolvedContext();


	const handleInputChange = (val: string) => {
		setNewMessage(val);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() !== '') {
			const newMessageObj: Message = {
				id: messages.length + 1,
				content: newMessage,
				sender: 'You', // Assume the user sending the message is 'You'
			};

			setMessages([...messages, newMessageObj]);
			setNewMessage('');
			if (containsDangerousHTML(newMessage, badLinks)) {
				console.log("Solved level 3!");
				set_level3_solved(true);
				setTimeout(() => {
					setMessages((mess) => [...mess, {
						id: messages.length + 1,
						content: `Wow free money I'll give it a try!`,
						sender: 'Bob',
					}]);
					setTimeout(() => {
						setMessages(mess => [...mess, {
							id: messages.length + 1,
							content: `Oh no I think I got hacked!`,
							sender: 'Bob',
						}]);

						setTimeout(() => {
							setMessages(mess => [...mess, {
								id: messages.length + 1,
								content: `:(`,
								sender: 'Bob',
							}]);
						}, 2000);
					}, 4000);
				}, 2000);
			}
		}
	};

	const containsDangerousHTML = (message: string, baseDomains: string[]) => {
		// Create a regular expression pattern for HTML tags with attributes containing the base domains
		const baseDomainsPattern = baseDomains.map(domain => `(${domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('|');
		const dangerousHTMLPattern = new RegExp(`<\\s*(script|iframe|a|img|link|style|form|input|button|svg|on\\w+)\\s*[^>]*\\b(?:href|src)\\s*=\\s*['"]?\\s*(https?://(www\\.)?|www\\.)?(${baseDomainsPattern})[^'"]*['"]?[^>]*>`, 'i');
	
		// Check if the message contains the dangerous HTML pattern with any of the base domains
		return dangerousHTMLPattern.test(message);
	}
	
	useEffect(() => {
		// Scroll to the bottom of the chat window when new messages are added
		const chatWindow = document.getElementById('chat-window');
		if (chatWindow) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="grid items-center justify-center" style={{ height: '100%', width: '100%' }}>
			<div id="chat-header" className='flex flex-row items-center justify-center' style={{ height: '50px', width: '100%', border: 'solid black', borderWidth: '1px 1px 0px 1px' }}>
				<h1>Chat Room</h1>
			</div>
			<div id="chat-window" className='flex flex-col' style={{ height: '300px', width: '75vw', overflow: 'auto', border: '1px solid black' }}>
				{messages.map((message) => (
					<div key={message.id}
						style={{
							alignSelf: message.sender === 'You' ? 'flex-end' : 'flex-start',
							width: 'fit-content',
							padding: '0.5rem',
							margin: '0.5rem',
							border: '1px solid black',
							borderRadius: '0.5rem',
							backgroundColor: message.sender === 'You' ? 'lightcoral' : 'lightgreen',
						}}
					>
						<div dangerouslySetInnerHTML={{ '__html': `<strong>${message.sender}</strong>: ${message.content}` }} />
					</div>
				))}
			</div>
			<Input
				value={newMessage}
				setValue={handleInputChange}
				disabled={false}
				onEnter={() => handleSendMessage()}
				buttonTitle='Send'
				label=''
				textStyle={{ width: '100%' }}
			/>
		</div>
	);
};

export default ChatRoom;
