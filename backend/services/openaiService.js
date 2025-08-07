const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const parseFiltersWithOpenAI = async (userPrompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are a helpful assistant that interprets playlist requests. Extract and return relevant tags like artists, energy, mood, tempo, genres, and year ranges from the prompt as a structured JSON object.
            Do not include apologies or suggestions. If a tag is not present, omit it from the response.
            Example input: "I need rock songs from the 2010s"
            Example output: { "artists": [], "year_range": "2010-2020", "genres": ["rock"] }
          `,
        },
        { role: "user", content: userPrompt },
      ],
    });

    const messageContent = response.choices[0].message.content;
    console.log("OpenAI Response:", messageContent);

    let filters;
    try {
      filters = JSON.parse(messageContent);
    } catch (jsonError) {
      console.error("Error parsing OpenAI response:", jsonError.message);
      return { error: "Failed to parse filters from OpenAI response." };
    }

    return filters;
  } catch (err) {
    console.error("Error processing prompt with OpenAI:", err.message);
    throw new Error("Failed to interpret the prompt with OpenAI");
  }
};

module.exports = { parseFiltersWithOpenAI };
