const DemoSection = () => {
  return (
    <section id="demo" className="py-16 bg-neutral-light bg-opacity-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-neutral-dark tracking-tight sm:text-4xl">
            See Chronos in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-medium">
            Watch how our time machine brings history to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-neutral-light bg-black">
            {/* Video Thumbnail with Play Button */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&h=675&q=80" 
                alt="Chronos Demo Video Thumbnail" 
                className="w-full aspect-video object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-20 w-20 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition transform hover:scale-105 duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </button>
              </div>
              {/* Demo Video Details Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-8 px-6">
                <h3 className="text-white text-xl font-bold">Chronos Demo: Journey Through the Ages</h3>
                <p className="text-white text-opacity-80 mt-2">See how Chronos transforms historical exploration with interactive timelines and AI-powered experiences.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="#waitlist" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-primary hover:bg-primary-light md:text-lg transition transform hover:scale-105 duration-300"
            >
              Join the Waitlist for Early Access
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
