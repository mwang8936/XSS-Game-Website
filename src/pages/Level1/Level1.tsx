import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLevel1SolvedContext, useLevel2SolvedContext } from '../../App';
import CenteredMessage from '../components/Message';
import Accordion from '../components/Accoridon';
import { secret_keys } from '../Home/Home';
import code_snippet from '../../images/code/test.png'; //update this

export default function Level1() {
	const navigate = useNavigate();

	const { level1_solved, set_level1_solved } = useLevel1SolvedContext();
	const { level2_solved } = useLevel2SolvedContext();

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

			<CenteredMessage message="Task: " /* Write Task Here */ />

			{/* ADD CODE HERE */}

			{level1_solved && (
				<>
					<CenteredMessage message="Solved: " /* Write Explanation Here */ />
					<CenteredMessage
						message={'Key to solve level 1: ' + secret_keys.level1}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={code_snippet} />
			<Accordion title="Hint" content="Hint" /* Write Hint here */ />
		</div>
	);
}
