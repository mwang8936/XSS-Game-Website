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
import code_snippet from '../../images/code/test.png'; //update this

export default function Level3() {
	const navigate = useNavigate();

	const { level1_solved } = useLevel1SolvedContext();
	const { level2_solved } = useLevel2SolvedContext();
	const { level3_solved, set_level3_solved } = useLevel3SolvedContext();

	return (
		<div className="items-center justify-center">
			<Navbar
				title="Level 3: ???"
				disableBackBtn={!level1_solved && !level2_solved}
				disableNextBtn={true}
				onBackBtnClick={() => {
					navigate('/level2');
				}}
				onNextBtnClick={() => {}}
				onBackHoverMessage="Complete Level 1 to unlock level 2"
				onNextHoverMessage="No more levels"
			/>

			<CenteredMessage message="Task: " /* Write Task Here */ />

			{/* ADD CODE HERE */}

			{level3_solved && (
				<>
					<CenteredMessage message="Solved: " /* Write Explanation Here */ />
					<CenteredMessage
						message={'Key to solve level 3: ' + secret_keys.level3}
					/>
				</>
			)}

			<Accordion title="Show Code" content="" imageUrl={code_snippet} />
			<Accordion title="Hint" content="Hint" /* Write Hint here */ />
		</div>
	);
}
