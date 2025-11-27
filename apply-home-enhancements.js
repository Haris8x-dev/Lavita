const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'pages', 'Home.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add testimonial state
content = content.replace(
    /const \[showAllServices, setShowAllServices\] = useState\(false\);/,
    `const [showAllServices, setShowAllServices] = useState(false);\n  const [activeTestimonial, setActiveTestimonial] = useState(0);`
);

// 2. Add testimonial auto-rotation effect
content = content.replace(
    /(useEffect\(\(\) => \{\s+setIsMounted\(true\)\s+\}, \[\]\))/,
    `$1\n\n  // Auto-rotate testimonials every 6 seconds\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setActiveTestimonial((prev) => (prev + 1) % 4); // 4 testimonials\n    }, 6000);\n\n    return () => clearInterval(interval);\n  }, []);`
);

// 3. Add swipe entry/exit variants to cardVariants
content = content.replace(
    /(right: \{[^}]+\},)/s,
    `$1\n    // Entry animations for swipe effect\n    enter: (direction: number) => ({\n      x: direction > 0 ? 300 : -300,\n      opacity: 0,\n      scale: 0.8,\n      filter: "blur(6px)",\n      rotateY: direction > 0 ? 15 : -15,\n    }),\n    exit: (direction: number) => ({\n      x: direction > 0 ? -300 : 300,\n      opacity: 0,\n      scale: 0.8,\n      filter: "blur(6px)",\n      rotateY: direction > 0 ? -15 : 15,\n      transition: { ...carouselTransition, duration: 0.5 }\n    })`
);

// 4. Add hover border container to ServiceCard content section
content = content.replace(
    /(\{\/\* Content Section \*\/\}\s+<motion\.div[^>]+className="lg:w-1\/2 space-y-6"[^>]*>)/,
    `$1\n            {/* Hover Border Container */}\n            <div className="relative p-8 rounded-2xl border border-transparent group-hover:border-emerald-400/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-500">`
);

// Close the hover border container before closing motion.div in ServiceCard
content = content.replace(
    /(\s+<\/div>\s+<\/motion\.div>\s+<\/div>\s+{\/\* Connecting Line)/,
    `            </div>\n$1`
);

// 5. Add testimonials data array
content = content.replace(
    /(]\;\s+const stats = \[)/,
    `];\n\n  // Testimonials data\n  const testimonials = [\n    {\n      id: 1,\n      name: "Sarah Ahmed",\n      role: "Family Vacation Guest",\n      rating: 5,\n      comment: "An absolutely magical experience! The views are breathtaking, the staff is incredibly attentive, and the facilities are world-class. Our family had the best vacation we've ever had.",\n      initials: "SA"\n    },\n    {\n      id: 2,\n      name: "Michael Chen",\n      role: "Corporate Event Organizer",\n      rating: 5,\n      comment: "Hosted our annual company retreat at Lavita and it exceeded all expectations. The conference facilities are top-notch, and the team-building activities in the mountains were unforgettable.",\n      initials: "MC"\n    },\n    {\n      id: 3,\n      name: "Fatima Khan",\n      role: "Honeymoon Couple",\n      rating: 5,\n      comment: "The perfect honeymoon destination! Lavita Malam Jabba provided us with privacy, luxury, and romance. The sunset views from our room were spectacular. Highly recommended!",\n      initials: "FK"\n    },\n    {\n      id: 4,\n      name: "David Thompson",\n      role: "Adventure Enthusiast",\n      rating: 5,\n      comment: "As someone who's visited mountain resorts worldwide, Lavita stands out. The adventure activities are thrilling, the safety standards impeccable, and the hospitality genuinely warm.",\n      initials: "DT"\n    }\n  ];\n\n  const stats = [`
);

// 6. Add testimonial section JSX before closing </motion.section>
const testimonialSection = `
          {/* TESTIMONIALS SECTION */}
          <div className="min-h-screen pt-32 flex items-center">
            <div className="w-full">
              {/* Section Header */}
              <div className="text-center mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400" />
                  <span className="text-emerald-400 font-light tracking-widest text-sm uppercase">Guest Experiences</span>
                  <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                >
                  <span className="bg-linear-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                    What Our Guests Say
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                >
                  Real experiences from real guests who have discovered the magic of Lavita Malam Jabba
                </motion.p>
              </div>

              {/* Testimonial Carousel */}
              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Testimonial Card */}
                    <div className="bg-linear-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-emerald-400/20 shadow-2xl shadow-emerald-500/10">
                      {/* Quote Icon */}
                      <div className="absolute top-8 right-8 opacity-10">
                        <svg className="w-20 h-20 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.svg
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="w-6 h-6 text-emerald-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 relative z-10"
                      >
                        "{testimonials[activeTestimonial].comment}"
                      </motion.p>

                      {/* Author Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-center gap-4"
                      >
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-2 border-emerald-400/40">
                          <span className="text-white font-bold text-lg">
                            {testimonials[activeTestimonial].initials}
                          </span>
                        </div>

                        {/* Name and Role */}
                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <p className="text-emerald-300 text-sm">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center gap-6 mt-12">
                  <motion.button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-12 h-12 bg-slate-800/60 backdrop-blur-xl border border-emerald-400/30 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/20 hover:border-emerald-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>

                  {/* Pagination Dots */}
                  <div className="flex gap-3">
                    {testimonials.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={\`rounded-full transition-all duration-300 \${
                          index === activeTestimonial
                            ? 'bg-emerald-400 w-10 h-3'
                            : 'bg-slate-600 w-3 h-3 hover:bg-slate-500'
                        }\`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="w-12 h-12 bg-slate-800/60 backdrop-blur-xl border border-emerald-400/30 rounded-full flex items-center justify-center text-emerald-300 hover:bg-emerald-400/20 hover:border-emerald-400/60 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>`;

// Insert testimonial section before the closing motion.section tag
content = content.replace(
    /(\s+<\/div>\s+<\/div>\s+<\/motion\.div>\s+<\/div>\s+<\/motion\.section>)/,
    `${testimonialSection}\n        </div>\n      </motion.section>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Home.tsx updated successfully with all enhancements!');
