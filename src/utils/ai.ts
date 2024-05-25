import { HfInference } from "@huggingface/inference";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export const callAI = async (prompt: string) => {
	const response = await Hf.textGeneration({
		model: "mistralai/Mistral-7B-Instruct-v0.3", // Replace with a text-generation model
		inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
		parameters: {
			max_new_tokens: 200,
			repetition_penalty: 1.0,
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
