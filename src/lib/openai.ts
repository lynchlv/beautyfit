import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateAIProgram = async (userData: any) => {
  const prompt = `Create a detailed fitness program based on the following user data:
    Training Environment: ${userData.environment === 'indoor' ? 'Home/Indoor (minimal equipment)' : 'Gym (full equipment access)'}
    Goal: ${userData.goal}
    Height: ${userData.height}cm
    Weight: ${userData.weight}kg
    Age: ${userData.age}
    Activity Level: ${userData.activityLevel}

    ${userData.environment === 'indoor' ? `
    Create a program that:
    1. Uses minimal equipment (bodyweight exercises, resistance bands, etc.)
    2. Can be done in limited space
    3. Includes alternative exercises when equipment isn't available
    ` : `
    Create a program that:
    1. Utilizes full gym equipment (machines, free weights, etc.)
    2. Incorporates compound exercises
    3. Maximizes equipment availability for optimal results
    `}

    Include:
    1. Weekly workout schedule
    2. Exercise descriptions with sets and reps
    3. Detailed nutrition guidelines including:
       - Daily caloric needs
       - Macronutrient breakdown
       - Meal timing
       - Sample meal plan
    4. Progress tracking metrics
    5. Recovery and rest recommendations
    6. Safety precautions and form tips

    Format the response in clear sections with proper spacing and organization.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert fitness trainer and nutritionist. Provide detailed, actionable fitness programs tailored to individual needs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI program:', error);
    throw error;
  }
};