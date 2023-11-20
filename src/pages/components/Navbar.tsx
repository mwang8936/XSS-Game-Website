import { useNavigate } from 'react-router-dom';

interface NavbarProp {
	title: string;
	disableBackBtn: boolean;
	disableNextBtn: boolean;
	onBackBtnClick(): void;
	onNextBtnClick(): void;
	onBackHoverMessage?: string;
	onNextHoverMessage?: string;
}

export default function Navbar(prop: NavbarProp) {
	const navigate = useNavigate();

	return (
		<div className="flex justify-between items-center bg-yellow-100 py-2">
			<button
				className="ms-3 pr-12"
				onClick={() => {
					navigate('/');
				}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-12 h-12">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			</button>
			<h1 className="text-7xl">{prop.title}</h1>
			<div className="flex flex-row justify-center items-center me-3">
				<button
					className="disabled:text-slate-200 group/back"
					disabled={prop.disableBackBtn}
					onClick={prop.onBackBtnClick}>
					{prop.onBackHoverMessage && prop.disableBackBtn && (
						<span
							className="absolute w-auto p-2 m-2 min-w-max mb-20 rounded-md shadow-md text-white right-3 top-20
    				        bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover/back:scale-100">
							{prop.onBackHoverMessage}
						</span>
					)}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-12 h-12">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
						/>
					</svg>
				</button>
				<button
					className="disabled:text-slate-200 ms-3 group/next"
					disabled={prop.disableNextBtn}
					onClick={prop.onNextBtnClick}>
					{prop.onNextHoverMessage && prop.disableNextBtn && (
						<span
							className="absolute w-auto p-2 m-2 min-w-max mb-20 rounded-md shadow-md text-white right-3 top-20
    				        bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover/next:scale-100">
							{prop.onNextHoverMessage}
						</span>
					)}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-12 h-12">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
