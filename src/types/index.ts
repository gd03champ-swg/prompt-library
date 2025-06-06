export interface Prompt {
  id: number;
  teamName: string;
  useCase: string;
  prompt: string;
  examplePrompt: string;
  howToUse?: string;
  model?: string; // Add model field
}
