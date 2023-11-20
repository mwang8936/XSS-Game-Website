import Level from './Level';
import {
	useLevel1SolvedContext,
	useLevel2SolvedContext,
	useLevel3SolvedContext,
	useTutorialSolvedContext,
} from '../../App';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
			<div className="flex flex-row items-center justify-center">
				<input
					className="@apply block w-1/4 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
					focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
					disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
					invalid:border-pink-500 invalid:text-pink-600
					focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
					maxLength={10}
					value={key}
					onChange={(event) => {
						setKey(event.currentTarget.value);
					}}
					onKeyUp={(event) => {
						if (event.key === 'Enter') {
							onUnlock();
							setKey('');
						}
					}}
				/>
				<button
					className="flex flex-row justify-center items-center 
					bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
					font-bold py-2 px-4 m-3 rounded w-auto h-auto group"
					onClick={onUnlock}>
					Unlock Level
				</button>
			</div>
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
					name="Level 3: ???"
					disabled={!level2_solved && !level3_solved}
					solved={level3_solved}
					navigate={() => {
						navigate('level3');
					}}
					hoverMessage="Complete level 2 to access level 3"
				/>
			</div>
		</>
	);
}
