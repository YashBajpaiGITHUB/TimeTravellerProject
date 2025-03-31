const HeroSection = () => {
  return (
    <section className="relative pt-20 md:pt-0 min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-white opacity-90"></div>
        <div className="absolute w-full h-full blur-sm opacity-30">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-primary opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary opacity-20"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent opacity-20"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 md:pt-0">
        <div className="flex flex-col-reverse md:flex-row items-center md:space-x-12">
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <h1 className="text-4xl tracking-tight font-bold text-neutral-dark sm:text-5xl md:text-6xl font-display">
              <span className="block">Explore History Like</span>
              <span className="block text-primary">Never Before</span>
            </h1>
            <p className="mt-3 text-base text-neutral-medium sm:mt-5 sm:text-lg md:mt-5 md:text-xl max-w-prose">
              Chronos is your personal time machine. Discover historical places, people, and events with immersive timelines and interactive experiences. Journey through time with AI-powered historical exploration.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#waitlist" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-primary hover:bg-primary-light md:text-lg transition transform hover:scale-105 duration-300"
              >
                Join the Waitlist
              </a>
              <a 
                href="#demo" 
                className="inline-flex items-center justify-center px-8 py-3 border border-neutral-light text-base font-medium rounded-md text-primary hover:text-primary-dark hover:border-primary-light md:text-lg transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md animate-float">
              {/* Timeline Interface Mockup */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-neutral-light">
                {/* Timeline Header */}
                <div className="bg-primary p-4 text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-alt font-bold">Time Explorer</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-neutral-light opacity-60"></div>
                    <div className="h-2 w-2 rounded-full bg-neutral-light opacity-60"></div>
                    <div className="h-2 w-2 rounded-full bg-neutral-light opacity-60"></div>
                  </div>
                </div>

                {/* Search Input */}
                <div className="p-4 border-b border-neutral-light bg-neutral-white">
                  <div className="relative shadow-lg rounded-lg overflow-hidden">
                    <input type="text" defaultValue="Taj Mahal" className="w-full px-4 py-3 pr-10 border border-neutral-light rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition" placeholder="Search places, people, events..." />
                    <div className="absolute right-3 top-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Timeline Visualization */}
                <div className="p-4">
                  <div className="mb-2 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-neutral-dark">Taj Mahal Timeline</h3>
                    <div className="flex items-center text-xs text-neutral-medium">
                      <span>1631</span>
                      <div className="mx-2 h-px w-10 bg-neutral-light"></div>
                      <span>Present</span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden h-16 rounded-lg bg-gradient-to-r from-blue-50 via-yellow-50 to-orange-50">
                    <div className="timeline-years h-full flex items-center" style={{
                      animation: "timeline-scroll 60s linear infinite",
                      width: "200%"
                    }}>
                      {/* Timeline Events */}
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-primary h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1631</div>
                        <div className="text-xs text-neutral-medium">Construction Begins</div>
                      </div>
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-secondary h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1643</div>
                        <div className="text-xs text-neutral-medium">Main Structure Complete</div>
                      </div>
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-accent h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1648</div>
                        <div className="text-xs text-neutral-medium">Construction Finished</div>
                      </div>
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-neutral-medium h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1908</div>
                        <div className="text-xs text-neutral-medium">British Restoration</div>
                      </div>
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-primary h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1983</div>
                        <div className="text-xs text-neutral-medium">UNESCO Site</div>
                      </div>
                      {/* Duplicate for infinite scroll */}
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-primary h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1631</div>
                        <div className="text-xs text-neutral-medium">Construction Begins</div>
                      </div>
                      <div className="timeline-event flex flex-col items-center mx-16">
                        <div className="timeline-dot bg-secondary h-3 w-3 rounded-full"></div>
                        <div className="text-xs font-medium mt-1">1643</div>
                        <div className="text-xs text-neutral-medium">Main Structure Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Historical Image Preview */}
                <div className="p-4 pt-0">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&h=400&q=80" 
                      alt="Taj Mahal historical view" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <div className="rounded-md overflow-hidden border-2 border-secondary">
                      <img 
                        src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=150&h=100&q=80" 
                        alt="Taj Mahal view" 
                        className="w-full h-14 object-cover"
                      />
                    </div>
                    <div className="rounded-md overflow-hidden border border-neutral-light">
                      <img 
                        src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=150&h=100&q=80" 
                        alt="Taj Mahal historical drawing" 
                        className="w-full h-14 object-cover"
                      />
                    </div>
                    <div className="rounded-md overflow-hidden border border-neutral-light">
                      <img 
                        src="https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=150&h=100&q=80" 
                        alt="Taj Mahal close-up" 
                        className="w-full h-14 object-cover"
                      />
                    </div>
                    <div className="rounded-md overflow-hidden border border-neutral-light bg-neutral-light flex items-center justify-center">
                      <span className="text-xs font-medium text-neutral-medium">+12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary opacity-20 rounded-full blur-md"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary opacity-20 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#f8f9fa" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
