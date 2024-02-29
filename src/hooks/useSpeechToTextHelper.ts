import "regenerator-runtime/runtime";
import { useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

export function useSpeechToTextHelper() {
	const [error, setError] = useState("");

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		setError("Browser doesn't support speech recognition.");
	}

	return {
		error,
		listening,
		transcript,
		resetTranscript,
	};
}
