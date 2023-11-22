import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import {
	useTutorialSolvedContext,
	useLevel2SolvedContext,
	useLevel1SolvedContext,
	useLevel3SolvedContext,
} from '../../App';
import CenteredMessage from '../components/Message';
import { secret_keys } from '../Home/Home';
import Accordion from '../components/Accoridon';
import code_snippet from '../../images/code/test.png'; //update this
import initSqlJs from 'sql.js';
import { Database } from 'sql.js';
import Input from '../components/Input';

export default function Level2() {
	const [db, setDb] = useState<Database>();
	const [inputValue, setInputValue] = useState('');
  
	useEffect(() => {
	  initSqlJs({
		// Fetch sql.js wasm file from CDN
		// This way, we don't need to deal with webpack
		locateFile: (file) => `https://sql.js.org/dist/${file}`,
	  })
		.then((SQL) => {
			const db = new SQL.Database();
			db.exec(`
			CREATE TABLE users (
			  User VARCHAR(50),
			  Password VARCHAR(50)
			);
			INSERT INTO users (User, Password) VALUES
			  ('Alice', 'AlicePass'),
			  ('Bob', 'BobPass'),
			  ('Carol', 'CarolPass');`)
			  setDb(db)
		})
		.catch((err) => console.log(err));
	}, []);

	const exec = (sql: string) => {
		try {
		  const results = db?.exec(sql);
		  console.log(results);
		} catch (err) {
			console.log(err)
		}
	  };

	const navigate = useNavigate();

	const { tutorial_solved } = useTutorialSolvedContext();
	const { level1_solved } = useLevel1SolvedContext();
	const { level2_solved, set_level2_solved } = useLevel2SolvedContext();
	const { level3_solved } = useLevel3SolvedContext();

	return (
		<div className="items-center justify-center">
			<Navbar
				title="Level 2: SQL Injection"
				disableBackBtn={!tutorial_solved && !level1_solved}
				disableNextBtn={!level2_solved && !level3_solved}
				onBackBtnClick={() => {
					navigate('/level1');
				}}
				onNextBtnClick={() => {
					navigate('/level3');
				}}
				onBackHoverMessage="Complete Tutorial to unlock level 1"
				onNextHoverMessage="Complete Level 2 to unlock Level 3"
			/>

			<CenteredMessage message="Task: " /* Write Task Here */ />
			<Input
				value={inputValue}
				setValue={setInputValue}
				disabled={false}
				onEnter={() => exec(inputValue)}
				buttonTitle='Execute'
				label='Execute Query'
			/>

			{/* ADD CODE HERE */}

			{level2_solved && (
				<>
					<CenteredMessage message="Solved: " /* Write Explanation Here */ />
					<CenteredMessage
						message={'Key to solve level 2: ' + secret_keys.level2}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={code_snippet} />
			<Accordion title="Hint" content="Hint" /* Write Hint here */ />
		</div>
	);
}
