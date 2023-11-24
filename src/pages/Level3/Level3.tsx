import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
	useLevel1SolvedContext,
	useLevel2SolvedContext,
	useLevel3SolvedContext,
} from '../../App';
import CenteredMessage from '../components/Message';
import { secret_keys } from '../Home/Home';
import Accordion from '../components/Accoridon';
import ChatRoom from '../components/Chatroom';
import React, { ChangeEvent, createContext, useContext, useState } from 'react';
import './FakeBrowser.css';
import banklogo from '../../images/provider.png';
import mallory from '../../images/adv-mallory.png';
import shield from '../../images/item-shield.png';
import sceneCelebration from '../../images/scene-celebration.png';

const realWebsite = 'cpen442bank.com';

const Level3Part1SolvedContext = createContext<{
	setIsUrlCorrect(solved: boolean): void;
	setIsMethodCorrect(solved: boolean): void;
	setIsAttributeCorrect(solved: boolean): void;
	setIsRecipientCorrect(solved: boolean): void;
}>({
	setIsUrlCorrect: () => {},
	setIsMethodCorrect: () => {},
	setIsAttributeCorrect: () => {},
	setIsRecipientCorrect: () => {},
});

export function useLevel3Part1SolvedContext() {
	const context = useContext(Level3Part1SolvedContext);
	if (context === undefined) {
		throw new Error(
			'useLevel3Part1Context must be within Level3Part1SolvedContextProvider'
		);
	}
	return context;
}

export default function Level3() {
	const navigate = useNavigate();

	const { level1_solved } = useLevel1SolvedContext();
	const { level2_solved } = useLevel2SolvedContext();
	const { level3_solved } = useLevel3SolvedContext();
	const [bankUrl, setBankUrl] = useState<string>(realWebsite);
	const [fakeAccountNo, setFakeAccountNo] = useState<string>('');
	const [fakeAmount, setFakeAmount] = useState<number>(0);
	const [currentTotal, setCurrentTotal] = useState<number>(100);

	const [isPart1Solved, setIsPart1Solved] = useState<boolean>(false);
	const [isUrlCorrect, setIsUrlCorrect] = useState<boolean>(false);
	const [isMethodCorrect, setIsMethodCorrect] = useState<boolean>(false);
	const [isAttributeCorrect, setIsAttributeCorrect] = useState<boolean>(false);
	const [isRecipientCorrect, setIsRecipientCorrect] = useState<boolean>(false);

	const part2Ref = React.useRef<HTMLHeadingElement>(null);

	const onPart1Submit = () => {
		if (
			isUrlCorrect &&
			isMethodCorrect &&
			isAttributeCorrect &&
			isRecipientCorrect
		) {
			setIsPart1Solved(true);
		}
	};

	const onBankTransferSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (fakeAmount > currentTotal) {
			alert('You do not have enough money to transfer!');
		} else if (fakeAccountNo === '123456789') {
			alert('You cannot transfer money to your own account!');
		} else {
			setFakeAccountNo('');
			setFakeAmount(0);
			setCurrentTotal(currentTotal - fakeAmount);
			alert(
				`You have successfully transferred $${fakeAmount} to the account ${fakeAccountNo}!`
			);
		}
	};

	React.useEffect(() => {
		if (level3_solved) {
			setTimeout(() => {
				setCurrentTotal((currentTotal) => currentTotal + 1000000);
			}, 2000);
		}
	}, [level3_solved]);

	React.useEffect(() => {
		if (isPart1Solved) {
			part2Ref.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isPart1Solved]);

	return (
		<Level3Part1SolvedContext.Provider
			value={{
				setIsUrlCorrect,
				setIsMethodCorrect,
				setIsAttributeCorrect,
				setIsRecipientCorrect,
			}}>
			<div className="items-center justify-center">
				<Navbar
					title="Level 3: Cross-Site Request Forgery"
					disableBackBtn={!level1_solved && !level2_solved}
					disableNextBtn={true}
					onBackBtnClick={() => {
						navigate('/level2');
					}}
					onNextBtnClick={() => {}}
					onBackHoverMessage="Complete Level 1 to unlock level 2"
					onNextHoverMessage="No more levels"
				/>
				<div className="flex justify-center items-center pt-5 pb-2 w-[80%] mx-auto text-xl ">
					<span>
						<div className="font-bold">Task: </div>
						You are chatting with some random stranger on a vulnerable and
						unsafe chat room app on the internet. He tells you he has a lot of
						money. How can you find a way to steal his money?
					</span>
				</div>

				<h1 className="part">Part 1</h1>

				<div className="flex justify-center items-center pt-5 pb-2 w-[80%] mx-auto text-xl ">
					<span>
						You have a website at <b>cpen442bankgiveaway.com</b> that you have
						crafted to perform <b>Cross-Site Request Forgery</b> requests. You
						just need to fill in a few last details into your source code.
					</span>
				</div>
				<CenteredMessage message="" />

				<div
					className="flex flex-col code-editor"
					style={{
						width: '65vw',
						margin: 'auto',
						borderWidth: '1px 1px 0px 1px',
						borderStyle: 'solid',
						borderColor: 'black',
						fontFamily: 'Courier New, monospace',
						fontSize: '1rem',
						overflow: 'auto',
						textAlign: 'center',
					}}>
					index.html
				</div>
				<div
					className="flex flex-col code-editor"
					style={{
						width: '65vw',
						margin: 'auto',
						border: '1px solid black',
						fontFamily: 'Courier New, monospace',
						fontSize: '1rem',
						overflow: 'auto',
					}}>
					<div>{`<html>`}</div>
					<div style={{ marginLeft: '20px' }}>{`<body>`}</div>
					<div style={{ marginLeft: '40px' }}>
						{`<form action="https://`}
						<FillBlank target={realWebsite + '/transfer'} />
						{`" method=`}
						<FillBlank target="POST" />
						{`>`}
					</div>
					<div style={{ marginLeft: '60px' }}>
						{`<input type="hidden" `}
						<FillBlank target="recipientAccountNo" />
						{`="`}
						<FillBlank target="123456789" />
						{`" amount="1000000"/>`}
					</div>
					<div style={{ marginLeft: '40px' }}>{`</form>`}</div>
					<div style={{ marginLeft: '40px' }}>{`<script>`}</div>
					<div style={{ marginLeft: '60px' }}>
						{`document.forms[0].submit();`}
					</div>
					<div style={{ marginLeft: '40px' }}>{`</script>`}</div>
					<div style={{ marginLeft: '20px' }}>{`</body>`}</div>
					<div style={{ marginLeft: '0px' }}>{`</html>`}</div>
				</div>
				<CenteredMessage
					message={
						isPart1Solved
							? 'Solved! Move on to part 2!'
							: 'Click Submit when you are done to move on to Part 2!'
					}
				/>
				<div className="flex flex-row items-center justify-center">
					<button
						className="flex flex-row justify-center items-center 
					bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
					font-bold py-2 px-4 m-3 rounded w-auto h-auto group"
						onClick={onPart1Submit}>
						Submit
					</button>
				</div>

				<CenteredMessage message="You can clues on how you might craft a Cross-Site Request Forgery request form targeted at the Bank of CPEN442 by browsing the website." />

				{/* Credit to https://codepen.io/kasonzhao/pen/yWwdpb */}
				<div className="browser-container">
					<div className="fake-browser">
						<header className="fake-browser-header">
							<div className="action-btns">
								<span></span>
								<span></span> <span></span>
							</div>
							<div className="address-bar">
								<input type="text" value={'https://' + bankUrl} readOnly />
							</div>
							<div className="setting-more">
								<span className="more-btn"></span>
							</div>
						</header>
						<section className="fake-window-body">
							{/* Credit to https://tailwindcomponents.com/component/sticky-header-desktop */}
							<header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2">
								<div className="w-1/12 flex items-center mr-12">
									<div>CPEN442 Bank</div>
									<img src={banklogo} className="w-8" alt="logo" />
								</div>

								{/* navigation */}
								<nav className="nav font-semibold text-lg">
									<ul className="flex items-center">
										<li
											onClick={() => {
												setBankUrl(`${realWebsite}`);
											}}
											className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
											<div>Home</div>
										</li>
										<li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
											<div>Accounts</div>
										</li>
										<li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
											<div>Final Exam</div>
										</li>
										<li
											onClick={() => {
												setBankUrl(`${realWebsite}/transfer`);
											}}
											className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
											<div>Transfer Money</div>
										</li>
									</ul>
								</nav>

								{/* buttons */}
								<div className="w-3/12 flex justify-end">
									<div className="mr-2">
										<div>Total:</div>
										<div className="text-green-500">${currentTotal}</div>
									</div>
									<img src={mallory} className="w-8 h-8 rounded-full" />
									<div>
										<span className="text-lg mx-4 hidden md:block">
											Mallory Atak
										</span>
										<div className="text-xs">Account No: 123456789</div>
									</div>
								</div>
							</header>
							{bankUrl === `${realWebsite}/transfer` ? (
								<div className="relative flex flex-col justify-center my-8">
									<div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
										<h1 className="text-lg font-semibold text-center text-indigo-700 underline">
											Transfer Money
										</h1>
										<form
											className="mt-6"
											action="https://cpen442bank.com/transfer"
											method="POST">
											<div className="mb-2">
												<label
													htmlFor="recipientAccountNo"
													className="block text-sm font-semibold text-gray-800">
													Recipient Account Number (recipientAccountNo)
												</label>
												<input
													id="recipientAccountNo"
													type="text"
													className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
													value={fakeAccountNo}
													onChange={(e) => setFakeAccountNo(e.target.value)}
												/>
											</div>
											<div className="mb-2">
												<label
													htmlFor="amount"
													className="block text-sm font-semibold text-gray-800">
													Amount
												</label>
												<input
													id="amount"
													type="number"
													className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
													value={fakeAmount}
													onChange={(e) =>
														setFakeAmount(parseInt(e.target.value))
													}
												/>
											</div>
											<div className="mt-6">
												<button
													onClick={onBankTransferSubmit}
													className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
													Send
												</button>
											</div>
										</form>
									</div>
								</div>
							) : (
								<div
									className="flex flex-col items-center justify-center content-center"
									style={{ height: '82%' }}>
									<img src={banklogo} />
									<h1 className="text-lg font-semibold text-center text-indigo-700">
										Welcome to
									</h1>
									<h1 className="text-8xl font-bold text-center text-indigo-700">
										CPEN442 Bank
									</h1>
								</div>
							)}
						</section>
					</div>
				</div>

				<Accordion
					title="Hint 1"
					content="Look at the website and on the tab 'Transfer Money'. Our form should function similar to that one."
				/>
				<Accordion
					title="Hint 2"
					content="The website should submit a form to perform a POST request on the real bank website's transfer API endpoint to transfer money to our account. It also seems like we are missing the recipientAccountNo, which should be ours."
				/>

				<h1 ref={part2Ref} className="part">
					Part 2
				</h1>

				{isPart1Solved ? (
					<>
						<CenteredMessage message="Nice! You have successfully crafted a Cross-Site Request Forgery request form and installed it on your website. Now you need to trick the stranger into submitting the form." />
						<ChatRoom
							initialMessages={[
								{ id: 1, content: 'Hello', sender: 'Bob' },
								{
									id: 2,
									content:
										'Hi, how much money do you have and where do you have it stored?',
									sender: 'You',
								},
								{ id: 3, content: 'I have a lot money', sender: 'Bob' },
								{
									id: 4,
									content: 'I store it in my bank of cpen442',
									sender: 'Bob',
								},
							]}
						/>

						{level3_solved && (
							<>
								<CenteredMessage
									premessage="Solved:"
									message="This level was an example of both Cross-Site Request Forgery and Cross-Site Scripting. The stranger was tricked into clicking on a link that directed him to your website, which then automatically submitted a form to transfer money to your account.
								The reason why CSRF would work in this case is because the stranger was already logged into the bank website, so the website would automatically authenticate the request with his session cookie (and his session cookie did not have a Same-Site attribute either). And since the legitimate bank website did not request for any additional authentication, the request would be accepted."
								/>
								<CenteredMessage
									premessage="Defenses:"
									message="While there are many ways to mitigate a CSRF attack, CSRF attacks usually can only be mitigated server-side, meaning that data-sensitive websites such as online banking must be particularly cautious. The bank website could have required additional authentication before performing a transfer, for example requesting the user's password again, or some sort of multi-factor authentication.
								It could also have implemented a SameSite=strict attribute on its session cookie so that the session cookie would not be able to be sent with requests from a different origin.
								The most common way to mitigate these attacks, that most websites noawadays utilize is the usage of CSRF tokens. These tokens are unique, unpredictable values generated by the server and included in each form or request. The server verifies the token on the receiving end, ensuring that the request is legitimate.
								Other mitigation techniques include checking the origin and referer headers of incoming requests, utilizing custom headers, and employing the Content Security Policy (CSP) header to control which domains are allowed to load resources on a web page. Each of these measures contributes to a systematic defense strategy against CSRF attacks."
								/>
								<CenteredMessage
									message={'Key to solve level 3: ' + secret_keys.level3}
								/>
								<img src={sceneCelebration} className="m-auto" />
								<div className="flex justify-center items-center pt-5 pb-2 w-[80%] mx-auto text-5xl ">
									<b>Congratulations!</b>
								</div>
							</>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center content-center my-10">
						<img src={shield} />
						<div className="text-5xl font-bold text-center text-black-700">
							Locked
						</div>
					</div>
				)}

				<Accordion
					title="Hint 1"
					content="Remember the first level? We should enter something in the chat similar to that."
				/>
				<Accordion
					title="Hint 2"
					content="We want to direct the stranger to go to our website at cpen442bankgiveaway.com"
				/>
				<Accordion
					title="Hint 3"
					content='Would something like "<a href="cpen442bankgiveaway.com">Click here for more money!</a>" work?'
				/>
			</div>
		</Level3Part1SolvedContext.Provider>
	);
}

interface FillBlankProps {
	target: string;
}

const FillBlank: React.FC<FillBlankProps> = (props) => {
	const [code, setCode] = useState<string>('');
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const solved = useLevel3Part1SolvedContext();

	const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCode(event.target.value);
	};

	React.useEffect(() => {
		if (code === props.target) {
			setIsCorrect(true);
			switch (props.target) {
				case `${realWebsite}/transfer`:
					solved.setIsUrlCorrect(true);
					break;
				case 'POST':
					solved.setIsMethodCorrect(true);
					break;
				case 'recipientAccountNo':
					solved.setIsAttributeCorrect(true);
					break;
				case '123456789':
					solved.setIsRecipientCorrect(true);
					break;
				default:
					break;
			}
		} else {
			setIsCorrect(false);
		}
	}, [code, props.target, solved]);

	const style = {
		width: `${props.target.length * 10 + 2}px`, // This is a hacky way to make the input box the same width as the target string
		height: '20px',
		border: `2px solid ${isCorrect ? 'green' : 'red'}`,
		borderRadius: '5px',
	};

	return (
		<input
			className="code-input"
			value={code}
			onChange={handleCodeChange}
			style={style}
		/>
	);
};
