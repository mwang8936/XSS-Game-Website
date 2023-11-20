import React, { useState } from 'react';

interface AccordionProps {
	title: string;
	content: string;
	imageUrl?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, imageUrl }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="border rounded-md overflow-hidden mb-4">
			<div
				className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
				onClick={toggleAccordion}>
				<div className="flex items-center">
					<div className="font-semibold">{title}</div>
				</div>
				<svg
					className={`w-6 h-6 transition-transform transform ${
						isOpen ? 'rotate-180' : ''
					}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>

			{isOpen && (
				<div className="p-4 bg-white">
					{imageUrl && (
						<img
							src={imageUrl}
							alt="Accordion Content Image"
							className="mb-4 rounded-lg"
						/>
					)}
					<p className="text-gray-700">{content}</p>
				</div>
			)}
		</div>
	);
};

export default Accordion;
