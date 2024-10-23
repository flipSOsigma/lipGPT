import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/ai', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    // Generate the response using the model
    const result = await model.generateContent(prompt);

    // If the result is valid and has the response text
    if (result && result.response && result.response.text) {
      const gptResponse = result.response.text();  // Access the generated response text
      return res.json({ response: gptResponse });  // Send the response and exit the function
    } else {
      // Handle the case where there is no valid response from the model
      return res.status(500).json({ error: "Failed to generate response" });
    }

  } catch (error) {
    // Log the error for debugging
    console.error('Error in generating content:', error);
    
    // Return a 500 response with an error message
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
