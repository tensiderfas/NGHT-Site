export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  details: string[];
}

export interface DemoSubmission {
  artistName: string;
  email: string;
  trackTitle: string;
  genre: string;
  audioLink: string;
  message: string;
  agreedToTerms: boolean;
}
