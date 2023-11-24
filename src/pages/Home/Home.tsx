import Level from './Level';
import {
	useLevel1SolvedContext,
	useLevel2SolvedContext,
	useLevel3SolvedContext,
	useTutorialSolvedContext,
} from '../../App';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import sceneCelebration from '../../images/scene-celebration.png'

export const secret_keys = {
	tutorial: 'firstkey',
	level1: 'secretkey',
	level2: 'anotherkey',
	level3: 'finalkey',
};

export default function Home() {
	const navigate = useNavigate();

	const { tutorial_solved, set_tutorial_solved } = useTutorialSolvedContext();
	const { level1_solved, set_level1_solved } = useLevel1SolvedContext();
	const { level2_solved, set_level2_solved } = useLevel2SolvedContext();
	const { level3_solved, set_level3_solved } = useLevel3SolvedContext();

	const [key, setKey] = useState('');
	set_level2_solved(true);
	navigate('level3');

	const onUnlock = () => {
		if (key == secret_keys.tutorial && !tutorial_solved)
			set_tutorial_solved(true);
		if (key == secret_keys.level1 && !level1_solved) set_level1_solved(true);
		if (key == secret_keys.level2 && !level2_solved) set_level2_solved(true);
		if (key == secret_keys.level3 && !level3_solved) set_level3_solved(true);
	};

	return (
		<>
			<div className="flex flex-row items-center justify-center bg-blue-100">
				<h1 className="text-7xl">H4CK M3</h1>
			</div>
			<Input
				value={key}
				setValue={setKey}
				onEnter={() => {
					onUnlock();
					setKey('');
				}}
				buttonTitle="Unlock Level"
				label="Enter Key:"
				disabled={
					tutorial_solved && level1_solved && level2_solved && level3_solved
				}
			/>
			<div className="flex flex-col items-center justify-center">
				<Level
					name="Tutorial"
					disabled={false}
					solved={tutorial_solved}
					navigate={() => {
						navigate('tutorial');
					}}
				/>
				<Level
					name="Level 1: XSS Attack"
					disabled={!tutorial_solved && !level1_solved}
					solved={level1_solved}
					navigate={() => {
						navigate('level1');
					}}
					hoverMessage="Complete Tutorial to access level 1"
				/>
				<Level
					name="Level 2: SQL Injection"
					disabled={!level1_solved && !level2_solved}
					solved={level2_solved}
					navigate={() => {
						navigate('level2');
					}}
					hoverMessage="Complete level 1 to access level 2"
				/>
				<Level
					name="Level 3: CSRF Attack"
					disabled={!level2_solved && !level3_solved}
					solved={level3_solved}
					navigate={() => {
						navigate('level3');
					}}
					hoverMessage="Complete level 2 to access level 3"
				/>
				{
					level1_solved && level2_solved && level3_solved && (
						<div className="flex flex-col items-center justify-center">
							<img src={sceneCelebration} className='m-auto'/>
							<b className="text-7xl">Congratulations!</b>
							<h2 className="text-4xl">You have completed all levels!</h2>
						</div>
					)
				}
			</div>
		</>
	);
}
