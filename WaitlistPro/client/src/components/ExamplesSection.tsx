import { useState } from "react";

const ExampleTab = ({ id, icon, label, isActive, onClick }: {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button 
      className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
        isActive 
          ? "border-primary text-primary" 
          : "border-transparent text-neutral-medium hover:text-neutral-dark hover:border-neutral-medium"
      }`}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={`h-5 w-5 mr-2 ${isActive ? "text-primary" : "text-neutral-medium group-hover:text-neutral-dark"}`}>
        {icon}
      </span>
      {label}
    </button>
  );
};

const SmallExampleCard = ({ image, title, description }: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md border border-neutral-light">
      <div className="relative h-40">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <h3 className="absolute bottom-3 left-3 text-white font-bold">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-neutral-medium mb-4">{description}</p>
        <a href="#" className="text-primary text-sm font-medium flex items-center">
          Explore
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const ExamplesSection = () => {
  const [activeTab, setActiveTab] = useState("places");

  const tabs = [
    {
      id: "places",
      label: "Places",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
    },
    {
      id: "people",
      label: "People",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
    },
    {
      id: "events",
      label: "Events",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
    },
    {
      id: "inventions",
      label: "Inventions",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
    }
  ];

  const smallExamples = [
    {
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&h=250&q=80",
      title: "Pyramids of Giza",
      description: "From construction techniques to modern preservation efforts spanning 4500+ years."
    },
    {
      image: "https://images.unsplash.com/photo-1555724952-0c8fafd89df3?auto=format&fit=crop&w=400&h=250&q=80",
      title: "Machu Picchu",
      description: "The hidden Incan citadel's discovery and the mysteries of its construction and purpose."
    },
    {
      image: "https://images.unsplash.com/photo-1606210122158-eeb10e0823bf?auto=format&fit=crop&w=400&h=250&q=80",
      title: "Colosseum, Rome",
      description: "The iconic amphitheater's construction, events, and architectural innovations through time."
    }
  ];

  return (
    <section id="examples" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-neutral-dark tracking-tight sm:text-4xl">
            Explore Historical Examples
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-medium">
            See how Chronos brings history to life through various interactive experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="border-b border-neutral-light">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map(tab => (
                <ExampleTab
                  key={tab.id}
                  id={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Example Content (Places) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold text-neutral-dark mb-4">Taj Mahal Through Time</h3>
              <p className="text-neutral-medium mb-6">
                Explore how the iconic Taj Mahal has evolved from its construction in 1632 until today, including restorations and environmental changes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-dark">Timeline Visualization</h4>
                    <p className="text-sm text-neutral-medium">Watch the construction process and see how the surrounding gardens and landscape changed over centuries.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-dark">Conversation with Shah Jahan</h4>
                    <p className="text-sm text-neutral-medium">Ask the Mughal emperor about his inspiration for the monument and learn about the love story behind it.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent bg-opacity-10 flex items-center justify-center mt-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-dark">Architectural Analysis</h4>
                    <p className="text-sm text-neutral-medium">Explore the innovative architectural techniques used and how they influenced future designs.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a href="#demo" className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light transition">
                  Explore Example
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-light bg-white relative">
              <img 
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Taj Mahal historical timeline" 
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center">
                  <div className="h-2 w-full bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-secondary rounded-full"></div>
                  </div>
                  <span className="ml-3 text-white font-medium text-sm">1731</span>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 hover:bg-opacity-30 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="h-12 w-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-light transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center ml-4 hover:bg-opacity-30 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {smallExamples.map((example, index) => (
              <SmallExampleCard 
                key={index}
                image={example.image}
                title={example.title}
                description={example.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
