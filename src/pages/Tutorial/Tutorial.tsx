import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLevel1SolvedContext, useTutorialSolvedContext } from '../../App';
import CenteredMessage from '../components/Message';
import Accordion from '../components/Accoridon';
import { secret_keys } from '../Home/Home';
import Input from '../components/Input';
import zoom0 from '../../images/code/zoom0.png';
import zoom1 from '../../images/code/zoom1.png';
import zoom2 from '../../images/code/zoom2.png';
import enhance from '../../images/code/enhance.png';

export default function Tutorial() {
	const navigate = useNavigate();

	const { tutorial_solved, set_tutorial_solved } = useTutorialSolvedContext();
	const { level1_solved } = useLevel1SolvedContext();

	const actual_password = 'password123'; //Set password here
	const [password, setPassword] = useState(
		tutorial_solved ? actual_password : ''
	);
	const [zoom, setZoom] = useState(0);

	return (
		<div className="items-center justify-center">
			<Navbar
				title="Tutorial"
				disableBackBtn={true}
				disableNextBtn={!tutorial_solved && !level1_solved}
				onBackBtnClick={() => {}}
				onNextBtnClick={() => {
					navigate('/level1');
				}}
				onBackHoverMessage="No previous levels"
				onNextHoverMessage="Complete Tutorial to unlock Level 1"
			/>
			<CenteredMessage
				premessage="Task:"
				message={
					'You are in a coffee shop working on the latest CPEN 442 assignment. Suddenly you see Joe Biden working on his laptop.' +
					'You take out your telescope from your backpack that you use for impromptu star gazing and aim it at his laptop.'
				}
			/>
			<div className="flex items-center">
				<img src="src\images\code\better_telescope.png" className="mx-auto" />
				<img
					src={
						zoom === 0
							? zoom0
							: zoom === 1
							? zoom1
							: zoom === 2
							? zoom2
							: enhance
					}
					className="mx-auto border-4 border-solid border-black"
				/>
			</div>

			<button
				className="flex flex-row justify-center items-center 
                bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
                font-bold py-2 px-4 m-3 rounded w-auto h-auto group mx-auto"
				onClick={() => setZoom(Math.min(zoom + 1, 3))}>
				Zoom {zoom}x
			</button>

			<Input
				value={password}
				setValue={setPassword}
				onEnter={() => {
					if (password === actual_password) {
						set_tutorial_solved(true);
					} else {
						setPassword('');
					}
				}}
				buttonTitle="Submit"
				label="Enter Password:"
				disabled={tutorial_solved}
			/>

			{tutorial_solved && (
				<>
					<CenteredMessage
						premessage="Solved:"
						message={
							'This was an example of shoulder-surfing, which is a common example of an ' +
							'optical side-channel: where information is leaked visually. Remember that an adversary will always take the ' +
							"easiest attack approach for THEM, sometimes they don't need fancy coding skills to hack you."
						}
					/>
					<CenteredMessage
						premessage="Defenses:"
						message={
							"Don't be the president and don't type your password in public where anyone " +
							"can see it. Having the password field replaced with astericks '*' will also make it more difficult for someone " +
							'to peek at your screen and steal your passwords.'
						}
					/>
					<CenteredMessage
						message={'Key to solve tutorial: ' + secret_keys.tutorial}
					/>
				</>
			)}

			<Accordion
				title="Hint"
				content="Click the zoom button to zoom into the image further"
			/>
		</div>
	);
}
