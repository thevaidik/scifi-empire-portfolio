
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import EarthBackground from "@/components/EarthBackground";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape over the next decade.",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Technology",
  },
  {
    id: 2,
    title: "Designing for the Next Generation",
    excerpt: "How to create interfaces that resonate with future users and anticipate evolving digital expectations.",
    date: "2024-03-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "Design",
  },
  {
    id: 3,
    title: "Understanding Consciousness Through Code",
    excerpt: "Exploring the parallels between programming paradigms and theories of human consciousness.",
    date: "2024-03-05",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974",
    category: "Philosophy",
  },
  {
    id: 4,
    title: "The Evolution of Swift",
    excerpt: "Tracking the growth and development of Apple's programming language from its inception to today.",
    date: "2024-02-28",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb",
    category: "iOS Development",
  },
];

const BlogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white overflow-hidden relative min-h-screen"
    >
      <EarthBackground />
      <Navigation />
      
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blog</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Thoughts and insights on technology, consciousness, and the digital frontier
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + post.id * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-6 aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#505052]/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/90">
                    {post.category}
                  </div>
                </div>
                
                <div className="bg-[#333335]/50 backdrop-blur-lg rounded-xl p-6 border border-[#777779]/30">
                  <div className="flex items-center space-x-4 text-sm text-scifi-primary mb-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white group-hover:text-scifi-primary transition-colors mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/70 mb-4">{post.excerpt}</p>
                  
                  <div className="inline-flex items-center text-scifi-primary group-hover:text-scifi-accent transition-colors">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
