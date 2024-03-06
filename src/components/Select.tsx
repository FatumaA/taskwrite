import { useState } from "react";

interface SelectProps {
	defaultSelectValue: string;
	selectOptions: string[];
	handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
	defaultSelectValue,
	handleSelectChange,
	selectOptions,
}: SelectProps) => {
	const [selectVal, setSelectVal] = useState(defaultSelectValue);
	return (
		<select
			value={selectVal}
			onChange={(e) => {
				setSelectVal(e.target.value);
				handleSelectChange(e);
			}}
			className="bg-inherit border rounded-sm border-input p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
		>
			{selectOptions.map((option) => (
				<option key={option} value={option}>
					{option.charAt(0).toUpperCase() + option.slice(1)}
				</option>
			))}
		</select>
	);
};

export default Select;
