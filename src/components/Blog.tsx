
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the web.",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    title: "Designing for the Next Generation",
    excerpt: "How to create interfaces that resonate with future users.",
    date: "2024-03-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="min-h-screen py-20 bg-gradient-to-b from-scifi-dark to-black relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Insights</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Thoughts and experiences from the digital frontier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-scifi-primary">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white group-hover:text-scifi-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-white/70">{post.excerpt}</p>
                
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
  );
};

export default Blog;
