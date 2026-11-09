import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

interface Message {
  id: number;
  sender: "user" | "portfolio";
  text: string;
  time: string;
}

interface FAQ {
  question: string;
  keywords: string[];
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What are your main skills?",
    keywords: ["skill", "skills", "technology", "technologies", "programming"],
    answer:
      "My experience includes Java, Spring Boot, React, Vue.js, " +
      "TypeScript and REST APIs. You can find examples on the Projects page.",
  },
  {
    question: "What projects have you worked on?",
    keywords: ["project", "projects", "portfolio", "work"],
    answer:
      "My projects include an e-commerce system, an online mall, " +
      "a team face recognition attendance system and 3D web visualisation. " +
      "The Projects page includes descriptions and technology filters.",
  },
  {
    question: "What are you studying?",
    keywords: ["study", "studying", "education", "degree", "university"],
    answer:
      "I am studying for a Master's degree in Software Engineering " +
      "at the University of Limerick, Ireland. " +
      "You can read more on the Education page.",
  },
  {
    question: "How can I contact you?",
    keywords: ["contact", "email", "message", "hire", "collaboration"],
    answer:
      "Please use the Contact page to send me an email. " +
      "Questions entered here stay in this page and are not sent to me.",
  },
  {
    question: "Where is your GitHub?",
    keywords: ["github", "repository", "repositories", "code"],
    answer:
      "My GitHub profile is github.com/Jialin-Tu. " +
      "The GitHub page in this portfolio also displays data from the GitHub API.",
  },
];

/** Create a timestamp for the current conversation. */
function getTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Match whole keywords rather than parts of words.
 * Return a helpful fallback when no topic matches.
 */
function getAnswer(question: string): string {
  const words: string[] =
    question.toLowerCase().match(/[a-z0-9]+/g) ?? [];

  const match = faqs.find((faq) =>
    faq.keywords.some((keyword) => words.includes(keyword))
  );

  return (
    match?.answer ??
    "I have preset answers about skills, projects, education, GitHub " +
      "and contact details. Please choose a question below, " +
      "or visit Contact if you would like to send me a message."
  );
}

/**
 * A local FAQ interface using preset answers.
 * It does not send messages or connect to a live chat service.
 */
export function Messaging() {
  const nextId = useRef(2);
  const conversationRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 1,
      sender: "portfolio",
      text:
        "Hello! Choose a question or ask about my skills, projects, " +
        "education, GitHub or contact details.",
      time: getTime(),
    },
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const conversation = conversationRef.current;

    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [messages]);

  const askQuestion = (question: string) => {
    const text = question.trim();
    if (!text) return;

    const time = getTime();

    const userMessage: Message = {
      id: nextId.current++,
      sender: "user",
      text,
      time,
    };

    const reply: Message = {
      id: nextId.current++,
      sender: "portfolio",
      text: getAnswer(text),
      time,
    };

    setMessages((current) => [...current, userMessage, reply]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <section
      id="messaging"
      className="py-20 px-4 bg-background min-h-screen"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Portfolio FAQ</h1>

          <p className="text-muted-foreground">
            Quick answers about my background and work.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle>Ask about my portfolio</CardTitle>

            <p className="text-sm text-muted-foreground">
              This page uses preset answers, not AI or live chat.
              Your questions are not sent to me or saved after a refresh.
            </p>

            <a
              href="#contact"
              className="text-sm underline"
            >
              Contact me directly
            </a>
          </CardHeader>

          <CardContent className="p-0">
            <div
              ref={conversationRef}
              role="log"
              aria-label="Portfolio questions and answers"
              aria-live="polite"
              aria-relevant="additions"
              tabIndex={0}
              className="overflow-y-auto p-6 space-y-4"
              style={{ height: "400px" }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    style={{
                      maxWidth: "85%",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <p className="text-xs mb-1">
                      {message.sender === "user" ? "You" : "Portfolio FAQ"}
                    </p>

                    <p className="text-sm leading-relaxed">
                      {message.text}
                    </p>

                    <p className="text-xs mt-1">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <p className="text-sm mb-3">Choose a question:</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {faqs.map((faq) => (
                  <Button
                    key={faq.question}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => askQuestion(faq.question)}
                    style={{
                      height: "auto",
                      whiteSpace: "normal",
                      textAlign: "left",
                      padding: "0.5rem 0.75rem",
                    }}
                  >
                    {faq.question}
                  </Button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about skills or projects..."
                  aria-label="Your portfolio question"
                  maxLength={500}
                  className="min-w-0"
                />

                <Button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Ask question"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}