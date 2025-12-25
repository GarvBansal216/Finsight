import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What does FinSight do?",
    answer:
      "FinSight automates financial data extraction from documents such as bank statements, invoices, GST files, payroll reports, and audit papers—converting them into structured, analysis-ready outputs.",
  },
  {
    question: "Which document formats are supported?",
    answer:
      "FinSight supports PDF, Excel, CSV, and scanned images. You can upload individual files or bulk batches for processing.",
  },
  {
    question: "How accurate is the data extraction?",
    answer:
      "Our Cortex AI achieves 95–99% accuracy on most document types, highlighting low-confidence areas for quick human review.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. All documents are encrypted end-to-end and processed securely. We adhere to enterprise-grade data privacy standards.",
  },
  {
    question: "Can FinSight export data into Tally or Excel?",
    answer:
      "Absolutely. You can export results to Excel, CSV, JSON, or integrate directly with ERP tools like Tally, Zoho, and SAP.",
  },
];

// Particle system component
const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default function FAQExact() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleQuestion = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-start bg-black">
      {/* Particles background */}
      <Particles />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 w-full">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.01em] leading-[1.2] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-5 w-24 h-1.5 bg-[#22D3EE] rounded-full"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((item, i) => (
            <div key={i} className="rounded-[14px] overflow-hidden">
              <button
                onClick={() => toggleQuestion(i)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-[14px] bg-[#1a1a1a]/95 backdrop-blur-md border transition-all duration-300 text-left ${
                  openIndex === i 
                    ? "border-[#1E40AF]/30 shadow-[0_4px_16px_rgba(30,64,175,0.12)]" 
                    : "border-[#333333]/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:border-[#333333] hover:-translate-y-0.5"
                }`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={`font-semibold text-base pr-4 leading-[1.4] ${
                  openIndex === i ? "text-[#1E40AF]" : "text-white"
                }`}>
                  {item.question}
                </span>
                <div className={`flex-shrink-0 transition-transform duration-300 ${
                  openIndex === i ? "text-[#1E40AF] rotate-180" : "text-[#64748B]"
                }`}>
                  <ChevronDown size={24} />
                </div>
              </button>

              <div
                id={`faq-answer-${i}`}
                className={`transition-all duration-300 ${
                  openIndex === i
                    ? "opacity-100 mt-2"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
                style={openIndex === i ? { maxHeight: 'none' } : {}}
              >
                <div className="px-6 pb-4">
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-[10px] p-5 border border-[#333333]/40">
                    <p className="text-[#E5E7EB] leading-[1.7] text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
