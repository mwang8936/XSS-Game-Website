import { useState, createContext, useContext } from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Level1 from './pages/Level1/Level1';
import Tutorial from './pages/Tutorial/Tutorial';
import Level2 from './pages/Level2/Level2';
import Level3 from './pages/Level3/Level3';

const TutorialSolvedContext = createContext<
	| {
			tutorial_solved: boolean;
			set_tutorial_solved(solved: boolean): void;
	  }
	| undefined
>(undefined);

export function useTutorialSolvedContext() {
	const context = useContext(TutorialSolvedContext);
	if (context === undefined) {
		throw new Error(
			'useTutorialSolvedContext must be within TutorialSolvedContextProvider'
		);
	}

	return context;
}

const Level1SolvedContext = createContext<
	| {
			level1_solved: boolean;
			set_level1_solved(solved: boolean): void;
	  }
	| undefined
>(undefined);

export function useLevel1SolvedContext() {
	const context = useContext(Level1SolvedContext);
	if (context === undefined) {
		throw new Error(
			'useLevel1SolvedContext must be within Level1SolvedContextProvider'
		);
	}

	return context;
}

const Level2SolvedContext = createContext<
	| {
			level2_solved: boolean;
			set_level2_solved(solved: boolean): void;
	  }
	| undefined
>(undefined);

export function useLevel2SolvedContext() {
	const context = useContext(Level2SolvedContext);
	if (context === undefined) {
		throw new Error(
			'useLevel2Context must be within Level2SolvedContextProvider'
		);
	}

	return context;
}

const Level3SolvedContext = createContext<
	| {
			level3_solved: boolean;
			set_level3_solved(solved: boolean): void;
	  }
	| undefined
>(undefined);

export function useLevel3SolvedContext() {
	const context = useContext(Level3SolvedContext);
	if (context === undefined) {
		throw new Error(
			'useLevel3Context must be within Level3SolvedContextProvider'
		);
	}

	return context;
}

export default function App() {
	const [tutorial_solved, set_tutorial_solved] = useState(false);
	const [level1_solved, set_level1_solved] = useState(false);
	const [level2_solved, set_level2_solved] = useState(false);
	const [level3_solved, set_level3_solved] = useState(false);

	return (
		<BrowserRouter>
			<TutorialSolvedContext.Provider
				value={{ tutorial_solved, set_tutorial_solved }}>
				<Level1SolvedContext.Provider
					value={{ level1_solved, set_level1_solved }}>
					<Level2SolvedContext.Provider
						value={{ level2_solved, set_level2_solved }}>
						<Level3SolvedContext.Provider
							value={{ level3_solved, set_level3_solved }}>
							<Routes>
								<Route index element={<Home />} />
								<Route path="tutorial" element={<Tutorial />} />
								<Route
									path="level1"
									element={
										tutorial_solved || level1_solved ? (
											<Level1 />
										) : (
											<Navigate replace to="/" />
										)
									}
								/>
								<Route
									path="level2"
									element={
										level1_solved || level2_solved ? (
											<Level2 />
										) : (
											<Navigate replace to="/" />
										)
									}
								/>
								<Route
									path="level3"
									element={
										level2_solved || level3_solved ? (
											<Level3 />
										) : (
											<Navigate replace to="/" />
										)
									}
								/>
							</Routes>
						</Level3SolvedContext.Provider>
					</Level2SolvedContext.Provider>
				</Level1SolvedContext.Provider>
			</TutorialSolvedContext.Provider>
		</BrowserRouter>
	);
}
