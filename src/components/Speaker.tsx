import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import { MicrophoneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import SpeechRecognition from "react-speech-recognition";

interface SpeakerProps {
	handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Speaker({ handleClear }: SpeakerProps) {
	const { listening, error } = useSpeechToTextHelper();

	const handleSpeech = () => {
		SpeechRecognition.startListening();
	};

	return (
		<div>
			{error && <div>{error}</div>}
			<div className="flex gap-2 py-1 items-center text-center justify-center">
				<span className="font-medium">{listening ? "Mic on" : "Mic off"}</span>
				<Button
					handleClick={handleSpeech}
					extraBtnClasses="bg-lightOk"
					title="Start"
				>
					<MicrophoneIcon height={25} />
				</Button>
				<Button
					handleClick={handleClear}
					extraBtnClasses="bg-light"
					type="reset"
					title="Reset"
				>
					<XCircleIcon height={25} />
				</Button>
			</div>
		</div>
	);
}

export default Speaker;
