import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLevel1SolvedContext, useLevel2SolvedContext } from '../../App';
import CenteredMessage from '../components/Message';
import Accordion from '../components/Accoridon';
import { secret_keys } from '../Home/Home';
import code_snippet from '../../images/code/level1_code.png'; //update this
import { useEffect, useState } from 'react';
import Input from '../components/Input';

const username = 'simon_oya';
const password = 'very_secure_password';

export default function Level1() {
	useEffect(() => {
		document.cookie = `username=${username}`;
		document.cookie = `password=${password}`;
	});

	const navigate = useNavigate();

	const { level1_solved, set_level1_solved } = useLevel1SolvedContext();
	const { level2_solved } = useLevel2SolvedContext();

	const [input, setInput] = useState(
		`<img src="http://url.to.file.which/not.exist" onerror=alert("hello");>`
	);
	const [html, setHtml] = useState('');

	const [inputUsername, setInputUsername] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	return (
		<div className="items-center justify-center">
			<Navbar
				title="Level 1: XSS Attack"
				disableBackBtn={false}
				disableNextBtn={!level1_solved && !level2_solved}
				onBackBtnClick={() => {
					navigate('/tutorial');
				}}
				onNextBtnClick={() => {
					navigate('/level2');
				}}
				onNextHoverMessage="Complete Level 1 to unlock Level 2"
			/>

			<CenteredMessage
				premessage="Task:"
				message={
					'You are an attacker performing an XSS attack. You have learned that this website stores ' +
					'the username and password of their users in cookies (Very Bad Practice). Use the input field underneath to display an alert ' +
					'and find the username and password for this level.'
				}
			/>

			<Input
				value={input}
				setValue={setInput}
				onEnter={() => {
					setHtml(input);
				}}
				buttonTitle="Submit"
				label="Enter Input:"
				disabled={level1_solved}
			/>

			<div hidden={true} dangerouslySetInnerHTML={{ __html: html }}></div>

			<div className="border-4 border-black border-solid mt-6 py-6 w-3/4 mx-auto">
				<Input
					value={inputUsername}
					setValue={setInputUsername}
					onEnter={() => {
						if (inputUsername === username && inputPassword === password)
							set_level1_solved(true);
						else setInputPassword('');
					}}
					buttonTitle="Submit"
					label="Enter Username:"
					disabled={level1_solved}
					hidden={true}
				/>

				<div className="my-2" />

				<Input
					value={inputPassword}
					setValue={setInputPassword}
					onEnter={() => {
						if (inputUsername === username && inputPassword === password)
							set_level1_solved(true);
						else setInputPassword('');
					}}
					buttonTitle="Submit"
					label="Enter Password:"
					disabled={level1_solved}
					hidden={true}
				/>

				<button
					className="flex flex-row justify-center items-center 
					bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
					font-bold py-2 px-4 my-3 mx-auto rounded w-auto h-auto group"
					disabled={level1_solved}
					onClick={() => {
						if (inputUsername === username && inputPassword === password)
							set_level1_solved(true);
						else setInputPassword('');
					}}>
					Login
				</button>
			</div>

			{level1_solved && (
				<>
					<CenteredMessage
						premessage="Solved:"
						message={
							'This attack works, because the frontend (website) allowed you to input your own data ' +
							"and you were able to inject you're own code (HTML/JavaScript) into the web application. " +
							'In this example, your attack is only affecting yourself, however, typically, XSS attacks work in 2 ways. ' +
							'(1) Stored XSS Attacks: An adversary can inject their script through an input to a website and that input is stored ' +
							"on a server. When a victim visits the website, the server will retrieve the code and run the script on the victim's browser. " +
							'(2) Reflected XSS Attacks: An adversary sends a malicious link to a victim. This link is crafted so that when the victim clicks it, ' +
							'it will send a form containing code that will be injected on a vulnerable website. The code will then be reflected onto the victim where ' +
							"it will run on the victim's browser. Our attack here was much more benign, but think about how much damage can be caused by using a much " +
							'more devious script on a much more popular website.'
						}
					/>
					<CenteredMessage
						premessage="Defenses:"
						message={
							'There are multiple ways to prevent an attack like this. (1) Input mediation: You can ' +
							'always check the inputs being supplied (using code) that they are not malicious. This can be done by filtering out ' +
							"specific characters like ',<,; that are often used in attacks. This mediation can be done on the client-side (website) " +
							'but definitely needs to be implemented on the server-side to avoid an attacker submitting their script straight to the web ' +
							'server, foregoing client-side mediation. (2) Use frameworks/libraries with built in protection: Many web development frameworks/libraries ' +
							'often include escaping, so that any input submitted by users are treated as strings and cannot interact with the source code. ' +
							'(3) Do not click on suspicious links: From a user perspective, always avoid suspicious/unknown links to avoid a Reflected XSS Attack.'
						}
					/>
					<CenteredMessage
						message={'Key to solve level 1: ' + secret_keys.level1}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={code_snippet} />
			<Accordion
				title="Hint"
				content="Cookies can be found using 'document.cookie'"
			/>
		</div>
	);
}
