"use client";
import Link from 'next/link';
import Image from 'next/image';

const ServicesHighlights = () => {
  // Static data replaces the API fetch
  const STATIC_SERVICES = [
    {
      _id: '1',
      title: 'Lash Extensions',
      slug: 'lashes',
      description: 'Elevate your gaze with our premium silk and mink extensions. From natural classic sets to dramatic Russian volumes.',
      image: "/images/lash extension.jpg"
    },
    {
      _id: '2',
      title: 'Hair Styling',
      slug: 'hair',
      description: 'Expert cutting, coloring, and styling services. Whether you need a refresh or a total transformation.',
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: '3',
      title: 'Beauty Treatments',
      slug: 'beauty',
      description: 'Professional facial treatments, brow lamination, and waxing services designed to make you glow from within.',
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-pink-500 text-sm font-bold uppercase tracking-[0.3em] block mb-3">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Premium Salon Services</h2>
          <p className="text-gray-500 leading-relaxed italic">Experience the perfect blend of relaxation and professional care tailored just for you.</p>
          <div className="w-12 h-1 bg-pink-500 mx-auto mt-8"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STATIC_SERVICES.map((service) => (
            <div key={service._id} className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(236,72,153,0.2)] transition-all duration-500 ease-in-out border border-gray-50">
              
              {/* Image Container */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Content Area */}
              <div className="p-10 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-10 text-sm leading-7 px-2">
                  {service.description}
                </p>
                
                {/* Clickable Link for the specific service */}
                <Link 
                  href={`/services`} 
                  className="relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden font-bold text-pink-500 transition duration-300 ease-out border-2 border-pink-500 rounded-full group/btn hover:text-white"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-500 group-hover/btn:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-pink-500 transition-all duration-300 transform group-hover/btn:translate-x-full ease">Explore Menu</span>
                  <span className="relative invisible">Explore Menu</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlights;