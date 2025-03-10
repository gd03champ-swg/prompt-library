
import { Prompt } from "@/types";

export const promptsData: Prompt[] = [
  {
    id: 1,
    teamName: "Generic",
    useCase: "Learn something new today in 2 mins",
    prompt: "For the below keyword, teach me 80% of it by identifying the most important 20%. Ensure the read time is around 2 mins.",
    examplePrompt: "Keyword: \"Quantum Computing\"",
    howToUse: "Enter any topic or concept you want to learn about quickly. The AI will focus on the most essential parts of the topic."
  },
  {
    id: 2,
    teamName: "Generic",
    useCase: "Brainstorm with me",
    prompt: "Engage in a brainstorming session with me by generating creative ideas based on the context provided below. Feel free to iterate and ask clarifying questions.",
    examplePrompt: "I'm working on improving our customer engagement strategy; can you suggest innovative ideas that involve digital channels and in-person events?",
    howToUse: "Provide a challenge or problem you need creative solutions for. The AI will help generate ideas and ask follow-up questions to refine them."
  },
  {
    id: 3,
    teamName: "Generic",
    useCase: "Summarise text concisely for an email",
    prompt: "Summarise the below text to be concise without losing the key theme of it.",
    examplePrompt: "Text: \"The recent meeting covered quarterly sales numbers and new market strategies for 2025. Please summarise key takeaways.\"",
    howToUse: "Paste any long text you need summarized. The AI will extract the most important points while keeping the essence intact."
  },
  {
    id: 4,
    teamName: "Generic",
    useCase: "How to use AI at Swiggy",
    prompt: "I am a Swiggy employee and tell me what is a good way to use AI to increase my productivity.",
    examplePrompt: "I work in operations and I'm interested in learning how AI can automate routine tasks.",
    howToUse: "Describe your role or the specific area you want to improve. The AI will suggest relevant AI-powered solutions for Swiggy employees."
  },
  {
    id: 5,
    teamName: "Generic",
    useCase: "Generate a meeting agenda",
    prompt: "Given the following meeting topic and objectives, create a detailed meeting agenda with clear points and time allocations.",
    examplePrompt: "Topic: \"Q1 Sales Strategy Meeting\"; Objectives: \"Review previous quarter, set targets, assign responsibilities.\"",
    howToUse: "Provide the meeting topic and main objectives. The AI will structure a comprehensive agenda with appropriate time slots."
  },
  {
    id: 6,
    teamName: "Generic",
    useCase: "Draft a professional email",
    prompt: "Write a professional email based on the context provided below. Ensure the tone is polite, clear, and action-oriented.",
    examplePrompt: "Context: \"Requesting a meeting to discuss project delays and propose a revised timeline.\"",
    howToUse: "Describe the purpose of your email and any specific points you want to include. The AI will draft a professional email with the right tone."
  },
  {
    id: 7,
    teamName: "Generic",
    useCase: "Create a project plan",
    prompt: "Based on the following project details, outline a project plan with milestones, deliverables, and timelines.",
    examplePrompt: "Project: \"New Feature Development\" with scope including UI redesign, backend integration, and testing.",
    howToUse: "Describe your project and its main components. The AI will generate a structured project plan with key milestones and timelines."
  },
  {
    id: 8,
    teamName: "Generic",
    useCase: "Brainstorm creative marketing campaigns",
    prompt: "Given the product description and brand guidelines below, suggest five creative marketing campaign ideas.",
    examplePrompt: "Product: \"Swiggy's new healthy meal option\"; Brand Guidelines: \"Fun, energetic, and innovative.\"",
    howToUse: "Provide details about the product and any brand guidelines. The AI will generate creative marketing campaign concepts aligned with your brand."
  },
  {
    id: 9,
    teamName: "Software Engineer",
    useCase: "Code review summary for software engineers",
    prompt: "Review the code diff provided below and summarise the changes, highlight potential issues, and suggest improvements.",
    examplePrompt: "Code Diff: \"Added error handling to the payment module and refactored the login flow.\"",
    howToUse: "Paste your code diff or describe the changes made. The AI will analyze the code and provide a concise review with actionable feedback."
  },
  {
    id: 10,
    teamName: "Software Engineer",
    useCase: "Generate a concise bug report",
    prompt: "Summarise the bug description and log details below to create a clear and actionable bug report.",
    examplePrompt: "Bug Description: \"App crashes when the user clicks on 'Order Now'\"; Log: \"NullPointerException in OrderService.java.\"",
    howToUse: "Provide the bug description and any relevant logs or error messages. The AI will format them into a structured bug report."
  }
];
