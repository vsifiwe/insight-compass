import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const prefillQuestions = [
  "How is my location doing in terms of complaints?",
  "How many staff have logged in the past month?",
  "Which district has the most unresolved complaints?",
  "What is the average complaint resolution time?",
  "Are there any emerging complaint trends this week?",
];

const mockResponses: Record<string, string> = {
  "How is my location doing in terms of complaints?":
    "Your location has received a total of **329 complaints** in the past week.\n\n**89%** of them were acknowledged within a day of being submitted, which is standard for the **1-day SLA**.\n\nHowever, more than **67%** have been unresolved and without any action or communication to the citizen, suggesting that the **5-day resolution SLA** is not being followed.\n\n**Recommendation:** District supervisors should review pending complaints older than 5 days and ensure citizens receive status updates within the required timeframe.",
  "How many staff have logged in the past month?":
    "**66% (33 out of 50)** staff in your location have logged in in the past month.\n\nThis trend has **significantly dropped from 98+%** in the previous month, suggesting that complaints are not being attended to urgently enough and affecting citizen engagement.\n\n**Recommendation:** Consider scheduling a review meeting with district supervisors to address the drop in platform activity and ensure complaint queues are being monitored.",
  "Which district has the most unresolved complaints?":
    "**Gasabo District** currently leads with **127 unresolved complaints**, representing 24% of all open cases nationwide.\n\nThe majority are related to **water supply disruptions (43%)** and **road infrastructure (31%)**. Kicukiro follows with 89 unresolved complaints.\n\n**Trend:** Gasabo's unresolved count has increased by 18% compared to last month, while other districts have remained stable or improved.",
  "What is the average complaint resolution time?":
    "The current average resolution time is **12.4 days**, up from **8.7 days** last month — a **43% increase**.\n\n**Breakdown by category:**\n- Water & Sanitation: 15.2 days\n- Roads & Infrastructure: 14.1 days\n- Electricity: 9.3 days\n- Public Safety: 6.8 days\n\nThe increase is primarily driven by a backlog in water-related complaints in Nyarugenge and Gasabo districts.",
  "Are there any emerging complaint trends this week?":
    "Yes, **3 notable trends** have been detected this week:\n\n1. **Electricity outage complaints** surged **340%** in Musanze District, correlated with recent transformer failures reported by REG.\n\n2. **Road flooding complaints** in Kigali are up **85%**, driven by early rainy season onset — 12 days ahead of the historical average.\n\n3. **Water quality complaints** in Huye have doubled, with 78% mentioning discoloration. WASAC has been notified and is investigating the Kadahokwa treatment plant.",
};

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        mockResponses[text] ||
        `Based on the available data, I'm analyzing your question: "${text}"\n\nThis query requires cross-referencing multiple data sources including the Municipal CRM, district reports, and historical complaint patterns. A comprehensive analysis is being prepared.\n\n**Note:** For more specific results, try asking about a particular district, time period, or complaint category.`;
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 text-sm text-card-foreground/90" dangerouslySetInnerHTML={{ __html: processed.slice(2) }} />
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 text-sm text-card-foreground/90 list-decimal" dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, '') }} />
        );
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="text-sm text-card-foreground/90" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Mbaza Assistant</h3>
          <p className="text-[10px] text-muted-foreground">Ask questions about your data</p>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="text-center py-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Ask me anything about citizen complaints, staff activity, or district performance.</p>
            </div>
            <div className="space-y-2">
              {prefillQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors text-xs text-foreground leading-snug"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-3 w-3 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 border border-border/40"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-xs">{msg.content}</p>
              ) : (
                <div className="space-y-1">{renderMarkdown(msg.content)}</div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="h-3 w-3 text-primary" />
            </div>
            <div className="bg-muted/50 border border-border/40 rounded-xl px-3 py-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable suggestion chips — shown after conversation starts */}
      {messages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto px-3 py-2 border-t border-border/60 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {prefillQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors whitespace-nowrap text-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-border/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about complaints, trends..."
            className="flex-1 text-xs bg-muted/30 border border-border/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary/40 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5 text-primary-foreground" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
