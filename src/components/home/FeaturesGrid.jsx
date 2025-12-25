import React from 'react';
import { 
  Upload, 
  Brain, 
  FileText, 
  Shield 
} from 'lucide-react'; // Using lucide-react for icons
import { GridBackground } from '@/components/ui/glowing-card';

const FeaturesGrid = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8 text-[#1E40AF]" />,
      title: "Import Any Document",
      description: "PDF, Excel, CSV, Bank Statements & more.",
      iconBg: "bg-[#1E40AF]/10",
      iconColor: "text-[#1E40AF]",
      hoverLine: "bg-[#1E40AF]"
    },
    {
      icon: <Brain className="w-8 h-8 text-[#8B5CF6]" />,
      title: "AI Extraction",
      description: "Smart detection of tables, transactions & values.",
      iconBg: "bg-[#8B5CF6]/10",
      iconColor: "text-[#8B5CF6]",
      hoverLine: "bg-[#8B5CF6]"
    },
    {
      icon: <FileText className="w-8 h-8 text-[#22D3EE]" />,
      title: "Accurate Finance Output",
      description: "Instantly structured summaries & categorized data.",
      iconBg: "bg-[#22D3EE]/10",
      iconColor: "text-[#22D3EE]",
      hoverLine: "bg-[#22D3EE]"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#1E40AF]" />,
      title: "Secure & Private",
      description: "Fully encrypted processing.",
      iconBg: "bg-[#1E40AF]/10",
      iconColor: "text-[#1E40AF]",
      hoverLine: "bg-[#1E40AF]"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Glowing Card Header */}
        <div className="mb-20">
          <GridBackground
            title="Powerful Features"
            description="Everything you need for intelligent document processing"
            showAvailability={false}
            className="mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-[#1a1a1a] p-7 lg:p-8 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 border border-[#333333] hover:border-[#1E40AF]/30 hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon Container */}
              <div className={`${feature.iconBg} w-16 h-16 lg:w-18 lg:h-18 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)]`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 tracking-[-0.01em] leading-[1.3]">
                {feature.title}
              </h3>
              <p className="text-[#E5E7EB] text-base leading-[1.6]">
                {feature.description}
              </p>
              
              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 ${feature.hoverLine} group-hover:w-full transition-all duration-300 rounded-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
