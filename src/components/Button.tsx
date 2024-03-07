type ButtonContent =
	| {
			text: string;
			icon?: React.ElementType;
	  }
	| {
			text?: string;
			icon: React.ElementType;
	  };

interface ButtonProps {
	extraBtnClasses?: string;
	textColor?: string;
	content: ButtonContent;
	iconClasses?: string;
	textClasses?: string;
	handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	title?: string;
	disable?: boolean;
	type?: "button" | "submit" | "reset";
}

function Button({
	extraBtnClasses,
	textColor,
	content: { text, icon },
	iconClasses,
	textClasses,
	handleClick,
	title,
	disable,
	type = "button",
}: ButtonProps) {
	const Icon = icon;

	const handleClickProp = type === "submit" ? undefined : handleClick;

	return (
		<button
			type={type}
			title={title ?? ""}
			onClick={handleClickProp}
			disabled={disable}
			className={`flex items-center text-iconColor ${extraBtnClasses} ${
				textColor ?? ""
			} rounded-md px-2 py-1 hover:scale-105 transition duration-300 ease-in-out`}
		>
			<span className={`${textClasses} mr-1`}>{text ?? ""}</span>
			{Icon && <Icon height={25} className={iconClasses} />}
		</button>
	);
}

export default Button;
