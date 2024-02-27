// import "regenerator-runtime/runtime";
import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import {
	LockClosedIcon,
	PlayIcon,
	StopIcon,
	XCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";
import SpeechRecognition from "react-speech-recognition";

function Speaker() {
	const { listening, resetTranscript } = useSpeechToTextHelper();

	return (
		<div>
			<div className="flex gap-2 py-1 items-center text-center justify-center">
				<span>{listening ? "Mic on" : "Mic off"}</span>
				<Button
					bgColor="bg-green-200"
					title="Start"
					icon={PlayIcon}
					handleClick={SpeechRecognition.startListening}
				/>
				<Button
					bgColor="bg-red-200"
					title="Stop"
					icon={StopIcon}
					handleClick={SpeechRecognition.stopListening}
				/>
				<Button
					bgColor="bg-gray-200"
					title="reset"
					icon={XCircleIcon}
					handleClick={resetTranscript}
				/>
			</div>
		</div>
	);
}

export default Speaker;
