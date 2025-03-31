const FeatureCard = ({ icon, title, description, items }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}) => {
  return (
    <div className="feature-card rounded-xl bg-white p-6 shadow-md border border-neutral-light transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-12 w-12 rounded-lg bg-opacity-10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-dark mb-2">{title}</h3>
      <p className="text-neutral-medium mb-4">
        {description}
      </p>
      <ul className="text-sm text-neutral-medium space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>,
      title: "Multi-Modal Search",
      description: "Search historical information using text, coordinates, images, or your current location to discover what happened around you.",
      items: [
        "Text search for places, people, and events",
        "Coordinate-based historical mapping",
        "Image recognition for landmarks and artifacts"
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v10.764a1 1 0 01-1.447.894L15 18M5 18l-4.553-2.276A1 1 0 010 14.83V4.067a1 1 0 011.447-.894L6 5.075M5 18V5.075m0 0L15 10" />
            </svg>,
      title: "Timeline Visualization",
      description: "Watch history unfold with dynamic timeline videos showing chronological transitions between significant events.",
      items: [
        "Dynamic video generation of historical changes",
        "Visual transitions across different years",
        "Interactive timeline navigation controls"
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>,
      title: "Historical Q&A",
      description: "Engage with historical figures through AI-powered conversations and visual representations of their likeness.",
      items: [
        "Converse with historical figures",
        "Animated visual representations",
        "Historically accurate information"
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>,
      title: "Reliable Data Sources",
      description: "Information from trusted academic resources, including NCERT databases, historical archives, and verified websites.",
      items: [
        "Prioritizes academic and verified sources",
        "Multi-tiered information verification",
        "Citations and references for all data"
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>,
      title: "Visual Evolution",
      description: "Witness how objects, inventions, and locations evolved over time with visual process visualizations.",
      items: [
        "Technological evolution visualizations",
        "Architectural transformation timelines",
        "Step-by-step historical processes"
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>,
      title: "Contextual Understanding",
      description: "Gain deeper insights with contextual information about cultural, political, and social aspects of historical events.",
      items: [
        "Cultural and social context explanations",
        "Related events and connections",
        "Multiple historical perspectives"
      ]
    }
  ];

  return (
    <section id="features" className="py-16 bg-neutral-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-neutral-dark tracking-tight sm:text-4xl">
            Explore History Through Multiple Dimensions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-medium">
            Chronos provides innovative ways to explore historical data with rich visualizations and AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              items={feature.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
