export const NAV = [
  { label: "Home", href: "/", group: "explore", blurb: "Where student ideas take flight" },
  { label: "Community", href: "/community", group: "explore", blurb: "The hive of student founders" },
  { label: "Resources", href: "/resources", group: "explore", blurb: "Guides, playbooks and tools" },
  { label: "Events", href: "/events", hot: true, group: "explore", blurb: "Pitch nights, workshops and competitions" },
  { label: "AI Coach", href: "/ai-coach", group: "explore", blurb: "Your personal entrepreneurship advisor" },
  { label: "Submit Idea", href: "/submit-idea", group: "start", blurb: "Share your startup idea" },
] as const;

export const TICKER_ITEMS = [
  "Join as a student — it takes less than 2 minutes",
  "500+ students already in the hive",
  "Submit your idea and get matched with mentors and resources",
  "AI Startup Coach is live — validate ideas in minutes",
  "University Partner Program is free during MVP",
  "Pitch nights, workshops and hackathons for student founders",
];

export const SEARCH_PILLS = [
  "Lean canvas",
  "Pitch deck",
  "Validate an idea",
  "Find a co-founder",
  "Events",
  "AI Coach",
];

export const JOIN_ROLES = [
  "I'm a student",
  "I have an idea",
  "I'm a university",
  "I want to mentor",
];

export const FOOTER_COLS = [
  {
    t: "Explore",
    links: [
      { l: "Community", h: "/community" },
      { l: "Resources", h: "/resources" },
      { l: "Events", h: "/events" },
      { l: "AI Coach", h: "/ai-coach" },
    ],
  },
  {
    t: "Get started",
    links: [
      { l: "Join as Student", h: "/register" },
      { l: "Submit Your Idea", h: "/submit-idea" },
      { l: "Partner with Us", h: "/universities" },
    ],
  },
  {
    t: "Company",
    links: [
      { l: "For Universities", h: "/universities" },
      { l: "Community", h: "/community" },
      { l: "Register", h: "/register" },
    ],
  },
];

export const NOTIFS = [
  { time: "2m ago", text: "<strong>Amara O.</strong> submitted a fintech idea", dot: "#F5A524" },
  { time: "1h ago", text: "New event: <strong>Lean Canvas Workshop</strong>", dot: "#C6F432" },
  { time: "3h ago", text: "Welcome to the hive — <strong>500+ students</strong> registered", dot: "#1E1B4B" },
];
