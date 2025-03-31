const ProcessStep = ({ number, title, description, content }: {
  number: number;
  title: string;
  description: string;
  content: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start">
      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mb-4 md:mb-0 md:mr-4">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-dark mb-2">{title}</h3>
        <p className="text-neutral-medium mb-4">
          {description}
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-light">
          {content}
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Input Your Query",
      description: "Choose your preferred method: text search for places, people, or events; coordinate input; image upload; or use your current location.",
      content: (
        <>
          <div className="flex space-x-4 mb-4 overflow-x-auto">
            <button className="px-3 py-2 rounded-md bg-primary text-white text-sm font-medium">Text</button>
            <button className="px-3 py-2 rounded-md bg-white text-neutral-medium text-sm font-medium border border-neutral-light">Coordinates</button>
            <button className="px-3 py-2 rounded-md bg-white text-neutral-medium text-sm font-medium border border-neutral-light">Image</button>
            <button className="px-3 py-2 rounded-md bg-white text-neutral-medium text-sm font-medium border border-neutral-light">Location</button>
          </div>
          <div className="relative">
            <input type="text" placeholder="Search historical places, people, events..." className="w-full px-4 py-2 border border-neutral-light rounded-md" />
            <button className="absolute right-2 top-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </>
      )
    },
    {
      number: 2,
      title: "Smart Data Retrieval",
      description: "Our system searches through multiple reliable sources in a priority sequence, from academic databases to verified online resources.",
      content: (
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <div className="text-sm">NCERT Database <span className="text-xs text-neutral-medium">(Priority 1)</span></div>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-secondary mr-2"></div>
            <div className="text-sm">History Database <span className="text-xs text-neutral-medium">(Priority 2)</span></div>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-accent mr-2"></div>
            <div className="text-sm">Authentic Websites <span className="text-xs text-neutral-medium">(Priority 3)</span></div>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-neutral-medium mr-2"></div>
            <div className="text-sm">Wikipedia <span className="text-xs text-neutral-medium">(Fallback)</span></div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Timeline Processing",
      description: "Chronological data is processed to create visual timelines and transition videos showing how places and objects evolved over time.",
      content: (
        <>
          <div className="h-20 relative bg-gradient-to-r from-blue-50 via-yellow-50 to-orange-50 rounded-md">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-neutral-medium w-full">
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary"></div>
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-secondary"></div>
              <div className="absolute left-3/4 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-accent"></div>
            </div>
            <div className="absolute left-1/4 bottom-0 -translate-x-1/2 text-xs font-medium">1850</div>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-xs font-medium">1920</div>
            <div className="absolute left-3/4 bottom-0 -translate-x-1/2 text-xs font-medium">1990</div>
            <div className="absolute left-0 top-2 text-xs font-medium">Beginning</div>
            <div className="absolute right-0 top-2 text-xs font-medium text-right">Present</div>
          </div>
          <div className="flex justify-center mt-2">
            <button className="flex items-center text-sm font-medium text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Generate Timeline Video
            </button>
          </div>
        </>
      )
    },
    {
      number: 4,
      title: "Immersive Presentation",
      description: "Experience history through interactive visualizations, Q&A with historical figures, and contextual information about events.",
      content: (
        <>
          <div className="flex space-x-2 mb-2 overflow-x-auto">
            <button className="px-3 py-1 text-xs rounded-full bg-primary text-white">Timeline</button>
            <button className="px-3 py-1 text-xs rounded-full bg-white border border-neutral-light text-neutral-medium">Q&A</button>
            <button className="px-3 py-1 text-xs rounded-full bg-white border border-neutral-light text-neutral-medium">Gallery</button>
            <button className="px-3 py-1 text-xs rounded-full bg-white border border-neutral-light text-neutral-medium">Context</button>
          </div>
          <div className="rounded-md overflow-hidden border border-neutral-light">
            <img 
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&h=320&q=80" 
              alt="Historical visualization" 
              className="w-full h-32 object-cover"
            />
          </div>
          <div className="mt-2 flex justify-between">
            <button className="text-xs flex items-center text-neutral-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <button className="text-xs flex items-center text-primary">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-neutral-light bg-opacity-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-neutral-dark tracking-tight sm:text-4xl">
            How Chronos Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-medium">
            Using advanced technology to bring history to life through multiple channels.
          </p>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <ProcessStep 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                content={step.content}
              />
            ))}
          </div>

          {/* Connecting Line (visible on medium screens and up) */}
          <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-neutral-light"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
