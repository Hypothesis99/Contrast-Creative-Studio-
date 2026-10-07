import { workingProcess, studioFaq } from "@/lib/studio-content";

export function Process({
  steps = workingProcess,
}: {
  steps?: { title: string; description: string }[];
}) {
  return (
    <div className="process-grid">
      {steps.map((step, index) => (
        <div key={index}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq({
  entries = studioFaq,
  title = "Aklınızdaki sorular.",
}: {
  entries?: { question: string; answer: string }[];
  title?: string;
}) {
  if (!entries.length) return null;
  return (
    <section className="container section faq-section">
      <div>
        <span className="eyebrow">SIK SORULAN SORULAR</span>
        <h2>{title}</h2>
        <p>İyi bir başlangıç için beklentileri açıkça konuşalım.</p>
      </div>
      <div className="faq-list">
        {entries.map((entry, index) => (
          <details key={index}>
            <summary>
              {entry.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{entry.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\n+/)
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </>
  );
}
