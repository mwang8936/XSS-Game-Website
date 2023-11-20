interface CenteredMessageProp {
	message: string;
}

export default function CenteredMessage(prop: CenteredMessageProp) {
	return (
		<div className="flex justify-center items-center pt-5 pb-2 w-[80%] mx-auto text-xl">
			{prop.message}
		</div>
	);
}
