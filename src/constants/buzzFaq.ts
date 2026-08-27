export type BuzzFaq = {
  triggers: string[];
  answer: string;
  quickReplies: string[];
};

export const BUZZ_FAQ: BuzzFaq[] = [
  {
    triggers: ["what is tkbees", "what is this", "tell me about tkbees", "what do you do", "explain tkbees", "tkbees", "about"],
    answer: `**TKBees** is the university entrepreneurship ecosystem that helps students turn brilliant ideas into real startups.\n\nYou can:\n- 🐝 **Join the hive** as a student\n- 💡 **Submit your idea** and get matched with support\n- 🤖 **Talk to the AI Startup Coach**\n- 📚 **Browse the resource library**\n- 📅 **Attend events** — pitch nights, workshops and hackathons\n- 🎓 **Partner as a university** — free during MVP\n\nWhere student ideas take flight.`,
    quickReplies: ["How do I join?", "How do I submit an idea?", "What is the AI Coach?"],
  },
  {
    triggers: ["who is it for", "target audience", "who can join", "students", "university", "founder"],
    answer: `TKBees is built for **university students** who want to start something — and for **universities** that want a practical entrepreneurship ecosystem on campus.\n\nJoining is free. Sign up with your university email on the Register page.`,
    quickReplies: ["How do I join?", "University partnership", "Submit an idea"],
  },
  {
    triggers: ["how do i join", "sign up", "register", "create account", "get started", "join", "joining", "is it free", "free"],
    answer: `Joining takes **less than 2 minutes**:\n\n1. Go to **Join as Student** / Register\n2. Add your name, university email, course and stage\n3. You're in the hive\n\nNext steps after you register: submit your idea, join Discord, or talk to the AI Coach.`,
    quickReplies: ["How do I submit an idea?", "Join Discord", "What is the AI Coach?"],
  },
  {
    triggers: ["submit", "idea", "startup idea", "pitch", "submit idea"],
    answer: `On **Submit Idea** you share:\n- The problem you're solving\n- Your solution\n- Stage, industry and the support you need\n- An optional pitch deck\n\nOur team reviews it and connects you with the right resources.`,
    quickReplies: ["What is the AI Coach?", "Browse resources", "How do I join?"],
  },
  {
    triggers: ["ai coach", "coach", "validate", "lean canvas", "value proposition", "mvp", "customers", "funding"],
    answer: `The **AI Startup Coach** is your personal entrepreneurship advisor.\n\nAsk about validating an idea, writing a value proposition, lean canvas, finding first customers, funding options, or building an MVP.\n\nIt's for guidance only — connect with the community for human mentorship.`,
    quickReplies: ["How do I validate my idea?", "What's a lean canvas?", "How do I join?"],
  },
  {
    triggers: ["validate", "validation", "idea validation"],
    answer: `To **validate a startup idea**: talk to potential users, test a simple offer, and check whether people will actually use (or pay for) it before you build.\n\nThe Lean Canvas and AI Coach page can walk you through this. Bring a real problem, not just a product.`,
    quickReplies: ["What's a lean canvas?", "How do I find customers?", "Submit an idea"],
  },
  {
    triggers: ["lean canvas", "business model", "canvas"],
    answer: `A **Lean Canvas** is a one-page business model: problem, customer segments, unique value, solution, channels, revenue, costs, metrics and unfair advantage.\n\nJoin the Lean Canvas Workshop on the Events page, or ask the AI Coach to walk you through yours.`,
    quickReplies: ["Upcoming events", "How do I submit an idea?", "Browse resources"],
  },
  {
    triggers: ["community", "discord", "hive", "members"],
    answer: `The **Hive Community** is a Discord of student entrepreneurs — 500+ members across 15+ countries.\n\nGuidelines: be supportive, respect privacy, stay active, and give back.\n\nJoin Discord from the Community page, or register first to get access.`,
    quickReplies: ["How do I join?", "Community guidelines", "Upcoming events"],
  },
  {
    triggers: ["resource", "resources", "library", "playbook", "guide", "yc", "template"],
    answer: `The **Resource Library** has curated tools and playbooks: Y Combinator Startup School, Lean Startup, Business Model Canvas, fundraising guides, Stripe Atlas, pitch deck templates and more.\n\nOpen **Resources** in the nav to search by category.`,
    quickReplies: ["How do I submit an idea?", "What is the AI Coach?", "Upcoming events"],
  },
  {
    triggers: ["event", "events", "workshop", "pitch night", "hackathon", "webinar", "opportunities"],
    answer: `Upcoming **events** include Launch Pitch Night, Lean Canvas Workshop, Founder Networking Mixer, a validation webinar, and a university hackathon.\n\nThere's also an Opportunities section: Hult Prize, YC Startup School, and Campus Founder Awards.\n\nSee everything on the Events page.`,
    quickReplies: ["How do I join?", "Submit an idea", "University partnership"],
  },
  {
    triggers: ["university", "universities", "partner", "campus", "partnership"],
    answer: `The **University Partner Program** brings TKBees to campus — student access, community, resources, events and impact metrics.\n\nAll tiers (Basic, Standard, Premium) are **free during MVP**. Express interest on the Universities page.`,
    quickReplies: ["How do I join?", "What is TKBees?", "Upcoming events"],
  },
  {
    triggers: ["contact", "email", "support", "human", "help"],
    answer: `Need a human? Join the Discord community or register and we'll follow up on your idea or partnership enquiry.\n\nAI Coach is for guidance only — the hive is where mentorship happens.`,
    quickReplies: ["Join Discord", "How do I join?", "University partnership"],
  },
  {
    triggers: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings"],
    answer: `Hey! I'm **Buzz** 🐝, the TKBees assistant.\n\nI can help with joining the hive, submitting an idea, the AI Coach, resources, events and university partnerships.\n\nWhat would you like to know?`,
    quickReplies: ["What is TKBees?", "How do I join?", "What is the AI Coach?"],
  },
  {
    triggers: ["thank", "thanks", "cheers", "great", "brilliant", "awesome", "helpful"],
    answer: `You're welcome! Happy to help 🐝\n\nWhen you're ready, **join the hive** — it takes less than 2 minutes.`,
    quickReplies: ["How do I join?", "Submit an idea", "What is the AI Coach?"],
  },
];

export function matchBuzzFaq(text: string): Pick<BuzzFaq, "answer" | "quickReplies"> {
  const normalised = text.toLowerCase().replace(/[^a-z0-9\s']/g, " ").trim();
  const words = normalised.split(/\s+/);
  let bestMatch: BuzzFaq | null = null;
  let bestScore = 0;

  for (const faq of BUZZ_FAQ) {
    let score = 0;
    for (const trigger of faq.triggers) {
      if (normalised.includes(trigger)) score += trigger.split(" ").length * 2;
    }
    for (const word of words) {
      for (const trigger of faq.triggers) {
        if (trigger.split(" ").some((t) => t === word && word.length > 3)) score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore > 0) return bestMatch;
  return {
    answer: `Hmm, I'm not sure about that one — but the hive will know! 🐝\n\nI can help with:\n- 🐝 Joining TKBees\n- 💡 Submitting an idea\n- 🤖 The AI Startup Coach\n- 📚 Resources and events\n- 🎓 University partnerships`,
    quickReplies: ["What is TKBees?", "How do I join?", "What is the AI Coach?"],
  };
}
