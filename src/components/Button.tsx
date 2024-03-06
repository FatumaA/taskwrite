interface ButtonProps {
	extraBtnClasses?: string;
	textColor?: string;
	text?: string;
	icon?: React.ElementType;
	iconClasses?: string;
	textClasses?: string;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	title?: string;
}

function Button({
	extraBtnClasses,
	textColor,
	text,
	icon,
	iconClasses,
	textClasses,
	handleClick,
	title,
}: ButtonProps) {
	const Icon = icon;
	return (
		<button
			onClick={handleClick}
			title={title ?? ""}
			className={`flex items-center text-iconColor ${extraBtnClasses} ${
				textColor ?? ""
			} rounded-md px-2 py-1 hover:scale-105 transition duration-300 ease-in-out`}
		>
			<span className={`${textClasses} mr-1`}>{text}</span>
			{Icon && <Icon height={25} className={iconClasses} />}
		</button>
	);
}

export default Button;
