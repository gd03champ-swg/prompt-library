
import { Prompt } from "@/types";

export const promptsData: Prompt[] = [
  {
    id: 1,
    teamName: "Generic",
    useCase: "Learn something new today in 2 mins",
    prompt: "For the below keyword, teach me 80% of it by identifying the most important 20%. Ensure the read time is around 2 mins.",
    examplePrompt: "Keyword: \"Quantum Computing\"",
    howToUse: "Attach a related article or use voice input to speak the keyword aloud."
  },
  {
    id: 2,
    teamName: "Generic",
    useCase: "Brainstorm with me",
    prompt: "Engage in a brainstorming session with me by generating creative ideas based on the context provided below. Feel free to iterate and ask clarifying questions.",
    examplePrompt: "I'm working on improving our customer engagement strategy; can you suggest innovative ideas that involve digital channels and in-person events?",
    howToUse: "Use voice input for a dynamic, interactive session; attach documents or concept boards to enrich the brainstorming process."
  },
  {
    id: 3,
    teamName: "Generic",
    useCase: "Summarise text concisely for an email",
    prompt: "Summarise the below text to be concise without losing the key theme of it.",
    examplePrompt: "Text: \"The recent meeting covered quarterly sales numbers and new market strategies for 2025. Please summarise key takeaways.\"",
    howToUse: "Attach the email or document file; alternatively, upload a screenshot of the text."
  },
  {
    id: 4,
    teamName: "Generic",
    useCase: "How to use AI at Swiggy",
    prompt: "I am a Swiggy employee and tell me what is a good way to use AI to increase my productivity.",
    examplePrompt: "I work in operations and I'm interested in learning how AI can automate routine tasks.",
    howToUse: "Use voice input to describe your workflow challenges for a tailored answer."
  },
  {
    id: 5,
    teamName: "Generic",
    useCase: "Generate a meeting agenda",
    prompt: "Given the following meeting topic and objectives, create a detailed meeting agenda with clear points and time allocations.",
    examplePrompt: "Topic: \"Q1 Sales Strategy Meeting\"; Objectives: \"Review previous quarter, set targets, assign responsibilities.\"",
    howToUse: "Attach meeting notes or a previous agenda; use interactive mode to refine agenda points."
  },
  {
    id: 6,
    teamName: "Generic",
    useCase: "Draft a professional email",
    prompt: "Write a professional email based on the context provided below. Ensure the tone is polite, clear, and action-oriented.",
    examplePrompt: "Context: \"Requesting a meeting to discuss project delays and propose a revised timeline.\"",
    howToUse: "Attach a draft or use voice dictation to record the email content."
  },
  {
    id: 7,
    teamName: "Generic",
    useCase: "Create a project plan",
    prompt: "Based on the following project details, outline a project plan with milestones, deliverables, and timelines.",
    examplePrompt: "Project: \"New Feature Development\" with scope including UI redesign, backend integration, and testing.",
    howToUse: "Attach project documents or integrate with a project management tool; use voice input to add details."
  },
  {
    id: 8,
    teamName: "Generic",
    useCase: "Brainstorm creative marketing campaigns",
    prompt: "Given the product description and brand guidelines below, suggest five creative marketing campaign ideas.",
    examplePrompt: "Product: \"Swiggy's new healthy meal option\"; Brand Guidelines: \"Fun, energetic, and innovative.\"",
    howToUse: "Use voice input to describe the product and attach brand guideline files or images."
  },
  {
    id: 9,
    teamName: "Software Engineer",
    useCase: "Code review summary for software engineers",
    prompt: "Review the code diff provided below and summarise the changes, highlight potential issues, and suggest improvements.",
    examplePrompt: "Code Diff: \"Added error handling to the payment module and refactored the login flow.\"",
    howToUse: "Attach a file with the code diff or paste code snippets; use inline code highlighting."
  },
  {
    id: 10,
    teamName: "Software Engineer",
    useCase: "Generate a concise bug report",
    prompt: "Summarise the bug description and log details below to create a clear and actionable bug report.",
    examplePrompt: "Bug Description: \"App crashes when the user clicks on 'Order Now'\"; Log: \"NullPointerException in OrderService.java.\"",
    howToUse: "Attach logs or screenshots; use voice notes for quick reporting if needed."
  },
  {
    id: 11,
    teamName: "HR",
    useCase: "Create a performance review template",
    prompt: "Draft a performance review template that includes key areas such as achievements, areas for improvement, and future goals.",
    examplePrompt: "Employee: \"John Doe, Customer Support Specialist. Focus on recent project contributions.\"",
    howToUse: "Attach previous review templates or use voice input to highlight key points."
  },
  {
    id: 12,
    teamName: "Analyst",
    useCase: "Summarise data analysis insights",
    prompt: "Summarise the following data analysis findings into a concise report highlighting key trends and actionable insights.",
    examplePrompt: "Data: \"Sales increased by 15% in Q4, with peak performance in urban areas.\"",
    howToUse: "Attach charts or spreadsheets; use interactive visualization tools along with voice input for commentary."
  },
  {
    id: 13,
    teamName: "Product Manager",
    useCase: "Write a user story",
    prompt: "Based on the following feature description, write a clear and concise user story including acceptance criteria.",
    examplePrompt: "Feature: \"In-app order tracking\" – User Story: \"As a customer, I want to track my order status in real time so that I can know when to expect delivery.\"",
    howToUse: "Attach wireframes or sketches; use voice input to quickly outline the user story."
  },
  {
    id: 14,
    teamName: "Generic",
    useCase: "Prepare a SWOT analysis",
    prompt: "Create a SWOT analysis based on the company data provided, listing strengths, weaknesses, opportunities, and threats.",
    examplePrompt: "Data: \"Swiggy's strong market presence vs rising competition from regional players.\"",
    howToUse: "Attach spreadsheets or past SWOT documents; use a collaborative whiteboard tool for real-time input."
  },
  {
    id: 15,
    teamName: "Generic",
    useCase: "Translate internal documentation",
    prompt: "Translate the following text to [Target Language] while maintaining a professional tone and accurate context.",
    examplePrompt: "Text: \"Please refer to the updated HR policies for more details.\" Target Language: \"Spanish.\"",
    howToUse: "Attach the document to be translated; use speech-to-text to capture spoken instructions."
  },
  {
    id: 16,
    teamName: "Generic",
    useCase: "Generate a training session outline",
    prompt: "Create an outline for a training session on the provided topic. Include objectives, session activities, and key takeaways.",
    examplePrompt: "Topic: \"Effective Communication Skills\"; Objectives: \"Enhance verbal and written communication.\"",
    howToUse: "Attach training materials or slides; use video input to record session ideas."
  },
  {
    id: 17,
    teamName: "Generic",
    useCase: "Create a cheat sheet for common queries",
    prompt: "Based on the following frequently asked questions, generate a cheat sheet with quick answers and tips.",
    examplePrompt: "FAQs: \"How to reset my password? Where can I find the HR policies?\"",
    howToUse: "Attach a list of FAQs; use voice input to add or modify questions quickly."
  },
  {
    id: 18,
    teamName: "Generic",
    useCase: "Draft an internal blog post for knowledge sharing",
    prompt: "Write a blog post draft on the topic provided that is engaging, informative, and suitable for internal employees.",
    examplePrompt: "Topic: \"Leveraging AI for everyday tasks at Swiggy.\"",
    howToUse: "Attach images or reference documents; record a voice note for a more conversational tone."
  },
  {
    id: 19,
    teamName: "Data Scientist",
    useCase: "Summarise research findings",
    prompt: "Summarise the key points of the research findings provided, highlighting data trends and statistical significance.",
    examplePrompt: "Research: \"Impact of AI on customer retention\" with key finding: \"30% improvement in engagement rates.\"",
    howToUse: "Attach research papers or datasets; use charts to visually support the summary, along with voice input."
  },
  {
    id: 20,
    teamName: "Generic",
    useCase: "Create meeting minutes",
    prompt: "Summarise the meeting notes below into clear, concise minutes including action items and responsible parties.",
    examplePrompt: "Notes: \"Discussed Q1 strategy, allocated tasks, set deadlines.\"",
    howToUse: "Attach audio recordings or meeting notes; use speech-to-text for live transcription."
  },
  {
    id: 21,
    teamName: "Generic",
    useCase: "Generate social media content ideas",
    prompt: "Based on the current social media trends, suggest ten content ideas for social media posts that drive engagement.",
    examplePrompt: "Content focus: \"Food delivery - behind the scenes, customer stories, new dish highlights, etc.\"",
    howToUse: "Attach brand assets or trend reports; use voice commands to brainstorm ideas in real time."
  },
  {
    id: 22,
    teamName: "Generic",
    useCase: "Draft an internal memo for company updates",
    prompt: "Write an internal memo for Swiggy employees regarding the new [policy/initiative]. Ensure the tone is professional and informative.",
    examplePrompt: "Policy: \"Remote work guidelines update.\"",
    howToUse: "Attach any related policy documents; use voice-to-text to quickly capture announcement details."
  },
  {
    id: 23,
    teamName: "Generic",
    useCase: "Quick troubleshooting guide for technical issues",
    prompt: "Provide a step-by-step troubleshooting guide for the following technical issue, including potential solutions and resources.",
    examplePrompt: "Issue: \"Unable to connect to the internal VPN.\"",
    howToUse: "Attach screenshots of error messages; record voice notes to explain the steps in detail."
  },
  {
    id: 24,
    teamName: "Generic",
    useCase: "Explain data visualization insights",
    prompt: "Explain the significance of the data visualization provided in simple terms, highlighting the key insights.",
    examplePrompt: "Visualization: \"A bar chart showing monthly sales trends.\"",
    howToUse: "Attach the visualization file; use voice input to describe the insights aloud."
  },
  {
    id: 25,
    teamName: "Generic",
    useCase: "Draft a press release for a new product launch",
    prompt: "Create a press release draft for the upcoming launch of our new product. Ensure the tone is professional and engaging.",
    examplePrompt: "Product: \"Swiggy Instant\" – a new fast-delivery service.",
    howToUse: "Attach product brochures or images; use voice dictation to generate initial ideas and tone."
  },
  {
    id: 26,
    teamName: "Generic",
    useCase: "Create an onboarding guide for new hires",
    prompt: "Develop an onboarding guide for new employees that covers key policies, company culture, and role-specific information.",
    examplePrompt: "New Hire: \"Customer Support Agent\"; Include: \"Company overview, key policies, and role expectations.\"",
    howToUse: "Attach onboarding videos or documents; use interactive voice commands for a personalized guide."
  },
  {
    id: 27,
    teamName: "HR",
    useCase: "Generate HR FAQs",
    prompt: "Based on the following HR policies, generate a list of frequently asked questions along with concise answers for employees.",
    examplePrompt: "Policy: \"Leave and attendance policies.\"",
    howToUse: "Attach HR documents; use voice input to quickly add common questions or update FAQs."
  },
  {
    id: 28,
    teamName: "Legal",
    useCase: "Draft a legal disclaimer for internal documents",
    prompt: "Write a clear and professional legal disclaimer for the following context, ensuring all necessary points are covered.",
    examplePrompt: "Context: \"Use of confidential company data in internal presentations.\"",
    howToUse: "Attach any relevant legal files; use voice recordings to clarify complex legal language."
  },
  {
    id: 29,
    teamName: "Operations",
    useCase: "Outline an operational workflow",
    prompt: "Create a detailed operational workflow for [specific process], including steps, roles, and timelines.",
    examplePrompt: "Process: \"Order processing from placement to delivery.\"",
    howToUse: "Attach flowcharts or diagrams; use interactive whiteboards or voice input to update steps dynamically."
  },
  {
    id: 30,
    teamName: "Generic",
    useCase: "Develop a risk assessment for projects",
    prompt: "Based on the project details provided, create a risk assessment that identifies potential risks and suggests mitigation strategies.",
    examplePrompt: "Project: \"Implementing a new customer feedback system.\"",
    howToUse: "Attach project documents; use voice input to record risk factors and possible solutions."
  },
  {
    id: 31,
    teamName: "Generic",
    useCase: "Summarise competitor analysis findings",
    prompt: "Summarise the competitor analysis data below, highlighting key strengths, weaknesses, and market opportunities.",
    examplePrompt: "Data: \"Competitor X has a strong delivery network, while Competitor Y offers lower pricing.\"",
    howToUse: "Attach competitor reports; use voice notes to quickly summarize findings."
  },
  {
    id: 32,
    teamName: "Product Manager",
    useCase: "Generate product feature documentation",
    prompt: "Based on the following product details, create detailed documentation outlining features, benefits, and FAQs.",
    examplePrompt: "Product: \"New in-app payment system.\"",
    howToUse: "Attach product specs or designs; use voice dictation to emphasize key points."
  },
  {
    id: 33,
    teamName: "Generic",
    useCase: "Draft a customer service response template",
    prompt: "Write a template for responding to common customer inquiries. Ensure the tone is helpful, friendly, and professional.",
    examplePrompt: "Inquiry: \"When will my order arrive?\"",
    howToUse: "Attach examples of past responses; use voice-to-text to draft or edit the template quickly."
  },
  {
    id: 34,
    teamName: "Product Manager",
    useCase: "Create a strategic roadmap for product development",
    prompt: "Outline a strategic roadmap for the upcoming quarter for product development, detailing key milestones and deliverables.",
    examplePrompt: "Quarter: \"Q2 2025 roadmap for feature enhancements.\"",
    howToUse: "Attach previous roadmaps or plans; use voice input to add milestone ideas in real time."
  },
  {
    id: 35,
    teamName: "Generic",
    useCase: "Develop a project retrospective report",
    prompt: "Summarise the project review data below into a retrospective report that outlines successes, challenges, and lessons learned.",
    examplePrompt: "Project: \"Launch of the new mobile app.\"",
    howToUse: "Attach retrospective notes or surveys; use voice recording during team debrief sessions to capture insights."
  },
  {
    id: 36,
    teamName: "Generic",
    useCase: "Provide a summary of recent AI trends",
    prompt: "Write a brief summary of recent AI trends relevant to our industry, including key advancements and potential impacts.",
    examplePrompt: "Trend: \"Rise of transformer-based models in natural language processing.\"",
    howToUse: "Attach news articles or trend reports; use voice input to quickly list emerging trends."
  },
  {
    id: 37,
    teamName: "Generic",
    useCase: "Draft a meeting follow-up email",
    prompt: "Based on the meeting notes provided, draft a follow-up email that reiterates key decisions and outlines next steps.",
    examplePrompt: "Meeting: \"Budget planning session. Decisions: Increased marketing spend.\"",
    howToUse: "Attach meeting recordings or notes; use voice-to-text to capture follow-up details."
  },
  {
    id: 38,
    teamName: "Generic",
    useCase: "Create a cost-benefit analysis",
    prompt: "Generate a cost-benefit analysis for the proposed project using the data provided, listing key benefits alongside associated costs.",
    examplePrompt: "Project: \"Implementation of a new CRM system.\"",
    howToUse: "Attach financial spreadsheets; use voice notes to outline key cost and benefit factors."
  },
  {
    id: 39,
    teamName: "Generic",
    useCase: "Conduct a SWOT analysis for a new project",
    prompt: "Generate a SWOT analysis for the new project described below, clearly outlining strengths, weaknesses, opportunities, and threats.",
    examplePrompt: "Project: \"Expanding into a new regional market.\"",
    howToUse: "Attach previous SWOT analyses or diagrams; use voice input for brainstorming strengths and weaknesses."
  },
  {
    id: 40,
    teamName: "Generic",
    useCase: "Develop an internal survey for employee feedback",
    prompt: "Create a survey for Swiggy employees on the topic of [subject]. Include both quantitative and qualitative questions.",
    examplePrompt: "Subject: \"Workplace satisfaction and remote work policies.\"",
    howToUse: "Attach survey templates or forms; use voice commands to add or modify questions."
  },
  {
    id: 41,
    teamName: "Generic",
    useCase: "Summarise training session feedback",
    prompt: "Summarise the feedback from the training session provided, highlighting common themes and actionable suggestions.",
    examplePrompt: "Feedback: \"Participants appreciated interactive sessions but requested more real-life examples.\"",
    howToUse: "Attach feedback forms or recordings; use voice input to quickly summarize verbal feedback."
  },
  {
    id: 42,
    teamName: "Software Engineer",
    useCase: "Write a technical documentation summary",
    prompt: "Summarise the technical documentation below into a concise summary that highlights key components and usage instructions.",
    examplePrompt: "Documentation: \"API endpoints for payment processing, including error codes and usage examples.\"",
    howToUse: "Attach technical documents; use voice dictation to capture critical elements."
  },
  {
    id: 43,
    teamName: "Generic",
    useCase: "Develop a proposal for process improvement",
    prompt: "Based on the following process details, draft a proposal for improvements including benefits, risks, and implementation steps.",
    examplePrompt: "Process: \"Manual invoice processing system at the operations department.\"",
    howToUse: "Attach process diagrams or past proposals; use voice input to note suggestions."
  },
  {
    id: 44,
    teamName: "Analyst",
    useCase: "Summarise market research",
    prompt: "Summarise the market research data below into a concise report that highlights key trends and potential opportunities.",
    examplePrompt: "Research: \"Consumer behavior trends in the food delivery market.\"",
    howToUse: "Attach research documents; use voice input to distill complex data into key insights."
  },
  {
    id: 45,
    teamName: "Generic",
    useCase: "Generate a content calendar for internal communications",
    prompt: "Create a content calendar for the next quarter, including topics, dates, and the teams responsible for each entry.",
    examplePrompt: "Calendar: \"Plan topics for monthly newsletters and internal blog posts.\"",
    howToUse: "Attach previous calendars; use interactive calendar tools with voice commands to schedule entries."
  },
  {
    id: 46,
    teamName: "HR",
    useCase: "Draft a recruitment advertisement",
    prompt: "Based on the provided job description, draft a recruitment advertisement that is engaging, clear, and informative.",
    examplePrompt: "Job Description: \"Customer Support Specialist with 2 years of experience.\"",
    howToUse: "Attach job description files; use voice input to highlight key requirements."
  },
  {
    id: 47,
    teamName: "Admin",
    useCase: "Summarise changes in internal policies",
    prompt: "Summarise the changes in the following internal policy into a concise update for all employees.",
    examplePrompt: "Policy: \"Revised work-from-home guidelines and updated leave policies.\"",
    howToUse: "Attach the updated policy document; use voice-to-text for quick summarisation."
  },
  {
    id: 48,
    teamName: "Generic",
    useCase: "Create a resource allocation plan for a project",
    prompt: "Generate a resource allocation plan for the project described below, detailing team roles, budget, and timelines.",
    examplePrompt: "Project: \"Development of a new in-house logistics tool.\"",
    howToUse: "Attach resource sheets or briefs; use voice input to record role assignments and budget details."
  },
  {
    id: 49,
    teamName: "Product Manager",
    useCase: "Develop a competitive analysis summary",
    prompt: "Summarise the competitive landscape based on the data provided, highlighting key competitors and our differentiators.",
    examplePrompt: "Data: \"Competitor X excels in speed, while Competitor Y focuses on customer service.\"",
    howToUse: "Attach competitor reports; use voice input to highlight key differentiators."
  },
  {
    id: 50,
    teamName: "Operations",
    useCase: "Generate ideas for operational improvements",
    prompt: "Given the operational challenges described below, list out five actionable ideas for process improvements to increase efficiency.",
    examplePrompt: "Challenge: \"Inefficient package sorting and delivery process during peak hours.\"",
    howToUse: "Attach workflow diagrams or process data; use voice input to brainstorm ideas."
  }
];
