interface LevelProp {
	name: string;
	disabled: boolean;
	solved: boolean;
	navigate(): void;
	hoverMessage?: string;
}

export default function Level(prop: LevelProp) {
	return (
		<>
			<button
				className="flex flex-row justify-center items-center 
			bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
			font-bold py-2 px-4 m-3 rounded w-3/4 h-32 group"
				disabled={prop.disabled}
				onClick={prop.navigate}>
				{prop.hoverMessage && prop.disabled && (
					<span
						className="absolute w-auto p-2 m-2 min-w-max mb-20 rounded-md shadow-md text-white 
    				bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
						{prop.hoverMessage}
					</span>
				)}

				{prop.disabled ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="h-1/2 me-3">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="h-1/2 me-3">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
						/>
					</svg>
				)}

				<span className="text-4xl">{prop.name}</span>

				{prop.solved && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="h-1/2 ms-3">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.5 12.75l6 6 9-13.5"
						/>
					</svg>
				)}
			</button>
		</>
	);
}
