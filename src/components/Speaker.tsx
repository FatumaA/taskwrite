import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import { MicrophoneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import SpeechRecognition from "react-speech-recognition";

interface SpeakerProps {
	handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
	// id: string;
}

function Speaker({ handleClear }: SpeakerProps) {
	const { listening, error } = useSpeechToTextHelper();

	const handleSpeech = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		SpeechRecognition.startListening();
	};

	return (
		<div>
			{error && <div>{error}</div>}
			<div className="flex gap-2 py-1 items-center text-center justify-center">
				<span className="font-medium">{listening ? "Mic on" : "Mic off"}</span>
				<Button
					extraBtnClasses="bg-lightOk"
					title="Start"
					icon={MicrophoneIcon}
					handleClick={handleSpeech}
				/>
				<Button
					extraBtnClasses="bg-light"
					title="reset"
					icon={XCircleIcon}
					handleClick={handleClear}
				/>
			</div>
		</div>
	);
}

export default Speaker;
