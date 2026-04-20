/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DriverContent {
  id: string;
  title: string;
  description: string;
  takeaways: string[];
  quotes: string[];
  deepDive: string;
  extraInfo?: string[];
  metrics?: string[];
  enablers?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const ROADMAP_DATA: DriverContent[] = [
  {
    id: "business-strategy",
    title: "Driver 1: Business strategy",
    description: "Ensure your AI projects are tied to real business objectives. Successful firms have investments and a clear vision aligned with the overall goals of your organisation.",
    deepDive: "Business strategy is the 'North Star' for AI adoption. Without a clear link to organisational goals, AI initiatives often become 'pilot purgatory'—isolated experiments that fail to deliver enterprise-wide value. Successful leaders begin by identifying specific business bottlenecks (e.g., customer churn, supply chain lag) rather than asking 'Where can we use AI?'. This driver involves aligning executive leadership, securing sustainable investment, and defining what success looks like through both qualitative (strategic fit) and quantitative (KPIs) lenses.",
    takeaways: [
      "Get support from business and executives",
      "Clearly define the problem and the solution",
      "Align everyone to one vision for success"
    ],
    quotes: [
      "You have to have something real to solve before you can use AI. Otherwise you risk building something that no one uses.",
      "Think about the problem first before thinking about the solution."
    ]
  },
  {
    id: "technology-data",
    title: "Driver 2: Technology and data strategy",
    description: "Establish the foundation needed to deploy AI at scale. Having AI initiatives requires technical business solutions that drive technology and high-quality data.",
    deepDive: "The quality of your AI is a direct reflection of your data's health. This driver focuses on building 'Data-Ready' infrastructure. It's not just about storage; it's about the entire pipeline—ingestion, governance, and transformation. Organisations must move from siloed data to integrated platforms that can feed AI models in real-time. Crucially, this requires 'Data Literacy'—ensuring that the humans managing the systems understand the provenance and limitations of the data they use to train and fine-tune models.",
    takeaways: [
      "Effective solutions need high-quality data",
      "Preparing data for AI is an ongoing process",
      "Know what you have and then build"
    ],
    enablers: [
      "Ingesting and managing data",
      "Preparing and analysing data",
      "Transforming data for AI"
    ],
    quotes: [
      "We need to make sure that we have the right data, the right infrastructure and processes before implementing AI.",
      "Data literacy is extremely important, and we lack that today."
    ]
  },
  {
    id: "ai-strategy-experience",
    title: "Driver 3: AI strategy and experience",
    description: "Gain the experience needed to support AI at scale. Without clear use cases and strong understanding, organisations struggle to gain value from AI investments.",
    deepDive: "Experience is built through iteration, not grand planning. This driver advocates for picking a specific, high-impact use case, proving its value, and then standardising the process for the next one. It requires a mindset shift from 'one-off projects' to 'AI as a product.' Measurement is key here: tracking not just model accuracy, but user engagement and tangible ROI. By iterating fast, teams learn how to manage the unique lifecycle of AI—from prompt engineering to monitoring for model drift.",
    takeaways: [
      "Start small and scale up",
      "Prioritise AI use cases that drive business value",
      "Use metrics to guide iteration and scaling"
    ],
    metrics: [
      "Quality",
      "Return on investment",
      "User satisfaction",
      "User engagement",
      "Time to completion",
      "Number of cases"
    ],
    quotes: [
      "To be honest, starting doing the initial work — most organisations do not have the patience to invest early.",
      "You measure return on investment based on what you are spending before and with the AI in place."
    ]
  },
  {
    id: "organisation-culture",
    title: "Driver 4: Organisation and culture",
    description: "Encourage teams to drive value creation with AI. The process of AI adoption relies heavily on people and culture.",
    deepDive: "AI is as much a people-transformation as it is a technology one. Culture acts as a multiplier: a rigid culture stifles AI, while an experimental one accelerates it. This driver emphasizes cross-functional collaboration—breaking down the walls between 'The IT Team' and 'The Business Unit.' It requires upskilling current employees so they view AI as an assistant rather than a threat. Leadership must foster an environment where 'failing fast' is accepted as long as it leads to learning.",
    takeaways: [
      "Invest in skills development",
      "Promote collaboration across teams",
      "Foster a culture of experimentation",
      "Promote iterative adoption"
    ],
    quotes: [
      "Every business unit selected people with a good knowledge of the business processes and then trained them in AI.",
      "There is a business sponsor, and they’re fully involved — if not, it’s going to fail."
    ]
  },
  {
    id: "ai-governance",
    title: "Driver 5: AI governance",
    description: "Deploy AI while maintaining security, privacy and regulatory compliance. Gaining trust through testing and validation.",
    deepDive: "Governance is the backbone of responsible AI. As AI scales, so do the risks of bias, hallucination, and data leakage. This driver is about moving governance from a 'checkbox exercise' at the end of a project to an integrated part of the development lifecycle. It involves setting up ethical guardrails, ensuring compliance with global regulations (like GDPR or the AI Act), and establishing clear accountability for AI outputs. Trust is won when users know the system is transparent, secure, and has human oversight.",
    takeaways: [
      "Gaining trust in AI through testing and validation",
      "Collaborate with your security and legal teams",
      "Create guardrails and policies"
    ],
    quotes: [
      "Gaining trust that your AI is working effectively is an ongoing process.",
      "The compliance with the data that you’re inheriting and using is extremely important."
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the very first step mentioned in Driver 1: Business Strategy?",
    options: [
      "Hire data scientists",
      "Get support from business and executives",
      "Choose an AI model",
      "Build a data lake"
    ],
    correctAnswer: 1,
    explanation: "According to the roadmap, getting executive support and aligning to business objectives is the foundation of Driver 1."
  },
  {
    id: 2,
    question: "Which driver emphasizes that 'Data literacy is extremely important'?",
    options: [
      "AI Strategy and Experience",
      "Organisation and Culture",
      "Technology and Data Strategy",
      "AI Governance"
    ],
    correctAnswer: 2,
    explanation: "Driver 2 (Technology and Data Strategy) highlights the need for high-quality data and data literacy."
  },
  {
    id: 3,
    question: "What is a key takeaway for Driver 3: AI Strategy and Experience?",
    options: [
      "Automate everything immediately",
      "Start small and scale up",
      "Focus only on ROI",
      "Wait for perfect data"
    ],
    correctAnswer: 1,
    explanation: "Driver 3 suggests starting small, prioritizing high-value use cases, and scaling up based on metrics."
  },
  {
    id: 4,
    question: "In Driver 4, who is essential for the success of AI in a business unit?",
    options: [
      "Exterior consultants only",
      "A software developer from another company",
      "A business sponsor who is fully involved",
      "AI models that don't need human input"
    ],
    correctAnswer: 2,
    explanation: "The text states: 'There is a business sponsor, and they’re fully involved — if not, it’s going to fail.'"
  },
  {
    id: 5,
    question: "What is the primary focus of Driver 5: AI Governance?",
    options: [
      "Choosing the cheapest AI solution",
      "Security, privacy, and regulatory compliance",
      "Marketing AI as a buzzword",
      "Replacing legal teams with AI"
    ],
    correctAnswer: 1,
    explanation: "Driver 5 focuses on maintaining trust through security, privacy, and proper policy guardrails."
  }
];
