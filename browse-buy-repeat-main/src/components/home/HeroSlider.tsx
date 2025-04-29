
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends and styles",
    link: "/products?category=Fashion"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Smart Tech Gadgets",
    subtitle: "Upgrade your tech with the latest innovations",
    link: "/products?category=Electronics"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    title: "Home & Living",
    subtitle: "Transform your space with our exclusive collection",
    link: "/products?category=Home"
  }
];

const HeroSlider: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[500px] md:h-[600px] w-full">
                <div className="absolute inset-0 bg-black/25 z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-lg">
                      <motion.h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        className="text-lg md:text-xl text-white/90 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Button 
                          asChild
                          className="bg-shop-purple hover:bg-shop-dark-purple text-lg px-8 py-6"
                        >
                          <Link to={slide.link}>Shop Now</Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-8" />
          <CarouselNext className="right-8" />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSlider;
