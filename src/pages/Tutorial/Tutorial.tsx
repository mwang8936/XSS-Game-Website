import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLevel1SolvedContext, useTutorialSolvedContext } from '../../App';
import CenteredMessage from '../components/Message';
import Accordion from '../components/Accoridon';
import { secret_keys } from '../Home/Home';
import code_snippet from '../../images/code/test.png'; //update this

export default function Tutorial() {
	const navigate = useNavigate();

	const { tutorial_solved, set_tutorial_solved } = useTutorialSolvedContext();
	const { level1_solved } = useLevel1SolvedContext();

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
			<CenteredMessage message="Task: " /* Write Task Here */ />

			{/* ADD CODE HERE */}

			{tutorial_solved && (
				<>
					<CenteredMessage message="Solved: " /* Write Explanation Here */ />
					<CenteredMessage
						message={'Key to solve tutorial: ' + secret_keys.tutorial}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={code_snippet} />
			<Accordion title="Hint" content="Hint" /* Write Hint here */ />
		</div>
	);
}
