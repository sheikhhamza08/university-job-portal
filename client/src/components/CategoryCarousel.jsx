import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Cyber Security", // FIX: removed trailing space
];

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      // FIX: removed empty viewport={{}} prop — not needed
    >
      <Carousel
        className="w-full max-sm:max-w-[234px] sm:max-w-xl mx-auto my-10"
        opts={{ loop: true }} // TIP: enables infinite looping
      >
        <CarouselContent>
          {categories.map((cat) => (
            // FIX: use cat string as key instead of index
            <CarouselItem
              key={cat}
              className="basis-[60%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }} // TIP: use Framer for hover, not Tailwind
                transition={{ duration: 0.15 }}
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full cursor-pointer transition-all duration-300"
                  // FIX: duration-600 → duration-300 (valid Tailwind class)
                  // FIX: removed hover:scale-105 — handled by Framer Motion above
                >
                  {cat}
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* TIP: added aria-labels for screen-reader accessibility */}
        <CarouselPrevious aria-label="Previous category" />
        <CarouselNext aria-label="Next category" />
      </Carousel>
    </motion.div>
  );
}

export default CategoryCarousel;
