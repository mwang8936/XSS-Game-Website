interface InputProp {
	value: string;
	setValue(value: string): void;
	onEnter(): void;
	buttonTitle: string;
	label: string;
	disabled: boolean;
}

export default function Input(prop: InputProp) {
	return (
		<div className="flex flex-row items-center justify-center">
			<label className="me-3" htmlFor={prop.label}>
				{prop.label}
			</label>
			<input
				className="block w-1/4 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
				value={prop.value}
				name={prop.label}
				disabled={prop.disabled}
				autoComplete="off"
				onChange={(event) => {
					prop.setValue(event.currentTarget.value);
				}}
				onKeyUp={(event) => {
					if (event.key === 'Enter') {
						prop.onEnter();
					}
				}}
			/>
			<button
				className="flex flex-row justify-center items-center 
                bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-500
                font-bold py-2 px-4 m-3 rounded w-auto h-auto group"
				disabled={prop.disabled}
				onClick={prop.onEnter}>
				{prop.buttonTitle}
			</button>
		</div>
	);
}
