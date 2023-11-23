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
import sql_img from '../../images/code/sql_injection.png';
import initSqlJs from 'sql.js';
import { Database } from 'sql.js';
import Input from '../components/Input';

export default function Level2() {
	const [db, setDb] = useState<Database>();
	const [inputValue, setInputValue] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
  
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
		console.log(sql);
		try {
		  const results = db?.exec(sql);
		  console.log(results);
		  return results;
		} catch (err) {
			console.log(err);
		}
	  };

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		const results = exec(`SELECT * FROM users WHERE User = "${username}" AND Password = "${password}"`);
		if(results?.length === 1) {
			set_level2_solved(true);
		}
	}

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
			{/* <Input
				value={inputValue}
				setValue={setInputValue}
				disabled={false}
				onEnter={() => exec(inputValue)}
				buttonTitle='Execute'
				label='Execute Query'
			/> */}

			<form onSubmit={handleLogin} className="max-w-xs mx-auto mt-8 m-4">
				<div className="mb-4">
					<label htmlFor="username" className="block text-gray-700">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 p-2 border rounded w-full"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-700">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 p-2 border rounded w-full"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Login
				</button>
			</form>

			{/* ADD CODE HERE */}

			{level2_solved && (
				<>
					<CenteredMessage message="Solved: Congratulations! This attack works, because the frontend (website) 
					allowed you to input your own data and you were able to inject your SQL Query into the web application.
					Stealing data from our users registered in our Database" />
					
					<CenteredMessage message="Defenses: To defend against SQL injection in this example, 
					you could use parameterized queries instead of directly interpolating user inputs into the SQL statement. 
					SQL injection attacks occur when untrusted user input is concatenated directly into a query, 
					allowing malicious actors to manipulate or inject SQL code." />
					<CenteredMessage
						message={'Key to solve level 2: ' + secret_keys.level2}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={sql_img} />
			<Accordion title="Hint1" content="Try to think of a way to make the SQL query condition always true." /* Write Hint here */ />
			<Accordion title="Hint2" content='You can use closing quotes " to end the quotes for username. Then you can put any SQL query after this. Finally you can add
			a "--" to comment out the rest of the SQL query (AND Password = "${password}"). Putting it together: " {YOUR SQL ATTACK HERE} --' /* Write Hint here */ />
		</div>
	);
}
