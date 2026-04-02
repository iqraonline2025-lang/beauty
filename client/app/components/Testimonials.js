"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';

// --- CRITICAL: FIX FOR MODULE NOT FOUND ---
// If 'swiper/css' fails, use 'swiper/css/bundle' instead
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      text: "The lash extensions here are life-changing! I've been to many salons, but the precision and care here are unmatched. They look so natural yet voluminous.",
      rating: 5
    },
    {
      id: 2,
      name: "Michelle Wong",
      text: "Best hairdressing experience ever. They really listened to what I wanted and gave me a cut that perfectly frames my face. The scalp massage was a bonus!",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      text: "A truly hygienic and calming environment. My skin has never looked better after the signature facial. Professional staff and premium products.",
      rating: 5
    },
    {
      id: 4,
      name: "Jessica Taylor",
      text: "Found my forever salon! The 5-star reviews are absolutely true. The atmosphere is so relaxing and the results are consistently perfect.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-pink-500 text-sm font-bold uppercase tracking-[0.3em] block mb-3">
            Client Love
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            What Our Guests Say
          </h2>
          <div className="w-16 h-1 bg-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false 
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-20" 
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_15px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-50 h-full flex flex-col relative group hover:border-pink-200 transition-all duration-500">
                  
                  {/* Decorative Quote Icon */}
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 italic leading-relaxed text-lg mb-10 flex-grow">
                    "{review.text}"
                  </p>

                  {/* Client Info Footer */}
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900 tracking-tight">
                        {review.name}
                      </span>
                      <span className="text-pink-500 text-[10px] font-bold uppercase tracking-widest">
                        Verified Guest
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Global CSS Overrides for Swiper Dots */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #ec4899 !important;
          width: 30px !important;
          border-radius: 10px !important;
          transition: width 0.3s ease !important;
        }
        .swiper-pagination {
          bottom: 10px !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;