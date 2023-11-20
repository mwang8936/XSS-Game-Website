import { useNavigate } from 'react-router-dom';
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

export default function Level2() {
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
