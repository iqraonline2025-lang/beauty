"use client";
import { Award, ShieldCheck, Sparkles, Star } from 'lucide-react'; // Using Lucide-react for clean icons

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" strokeWidth={1.5} />,
      title: "Certified Experts",
      description: "Our technicians are globally trained and certified to ensure the highest standards of precision."
    },
    {
      icon: <Sparkles className="w-8 h-8" strokeWidth={1.5} />,
      title: "Premium Products",
      description: "We use only medical-grade adhesives and top-tier lash and hair products for your safety."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
      title: "Hygienic Environment",
      description: "Your health is our priority. We follow strict hospital-grade sterilization protocols."
    },
    {
      icon: <Star className="w-8 h-8" strokeWidth={1.5} />,
      title: "5-Star Reviews",
      description: "Trusted by thousands of happy clients who return to us for our consistent excellence."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="mb-6 p-6 rounded-2xl bg-pink-50 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 ease-in-out transform group-hover:-translate-y-2">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;