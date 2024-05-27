import { HfInference } from "@huggingface/inference";
// import { HuggingFaceStream, StreamingTextResponse } from "ai";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export const callAI = async (prompt: string) => {
	const response = Hf.textGeneration({
		model: "mistralai/Mistral-7B-Instruct-v0.3",
		inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
		parameters: {
			max_new_tokens: 200,
			// @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
			typical_p: 0.2,
			repetition_penalty: 1,
			truncate: 1000,
			return_full_text: false,
		},
	});

	// Convert the response into a friendly text-stream
	// const stream = HuggingFaceStream(response);

	// Respond with the stream
	// return new StreamingTextResponse(stream);
	return response;
};
