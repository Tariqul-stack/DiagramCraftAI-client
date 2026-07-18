type BlogCategory = "Tutorial" | "Guide" | "Tips" | "Update";

interface BlogPost {
  category: BlogCategory;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    category: "Tutorial",
    title: "How to Create Perfect Flowcharts with AI",
    excerpt:
      "Learn the best prompting techniques to generate clean, professional flowcharts using DiagramCraft AI in under a minute.",
    author: "DiagramCraft Team",
    date: "January 10, 2025",
    readTime: "5 min read",
  },
  {
    category: "Guide",
    title: "Database Design Made Easy with ERD Diagrams",
    excerpt:
      "Discover how to use AI to generate entity relationship diagrams for your next database project without any technical expertise.",
    author: "DiagramCraft Team",
    date: "January 15, 2025",
    readTime: "7 min read",
  },
  {
    category: "Tips",
    title: "10 Prompting Tips for Better AI Diagrams",
    excerpt:
      "Get better diagram results by learning these simple prompting strategies that help the AI understand exactly what you need.",
    author: "DiagramCraft Team",
    date: "January 20, 2025",
    readTime: "4 min read",
  },
  {
    category: "Tutorial",
    title: "Planning Your Project with Gantt Charts",
    excerpt:
      "Use AI to generate professional project timelines and Gantt charts in seconds. Perfect for project managers and teams.",
    author: "DiagramCraft Team",
    date: "January 25, 2025",
    readTime: "6 min read",
  },
  {
    category: "Guide",
    title: "Understanding Sequence Diagrams for API Design",
    excerpt:
      "Learn how sequence diagrams can help you design better APIs and communicate system interactions to your team.",
    author: "DiagramCraft Team",
    date: "February 1, 2025",
    readTime: "8 min read",
  },
  {
    category: "Update",
    title: "New Feature: AI Chat Assistant for Diagrams",
    excerpt:
      "Introducing the AI Chat Assistant - now you can have a conversation with AI about your diagrams, ask questions and get improvements.",
    author: "DiagramCraft Team",
    date: "February 5, 2025",
    readTime: "3 min read",
  },
];

const CATEGORY_STYLES: Record<
  BlogCategory,
  { banner: string; badge: string }
> = {
  Tutorial: {
    banner: "bg-indigo-500",
    badge: "text-indigo-600 bg-indigo-50",
  },
  Guide: {
    banner: "bg-purple-500",
    badge: "text-purple-600 bg-purple-50",
  },
  Tips: {
    banner: "bg-cyan-500",
    badge: "text-cyan-600 bg-cyan-50",
  },
  Update: {
    banner: "bg-green-500",
    badge: "text-green-600 bg-green-50",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <section className="bg-gradient-to-br from-[#1E1B4B] to-indigo-800 py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-indigo-300 uppercase tracking-wider text-sm font-semibold mb-4">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Tips, Tutorials &amp; Updates
          </h1>
          <p className="mt-5 text-lg text-indigo-100 max-w-2xl mx-auto">
            Learn how to get the most out of DiagramCraft AI
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => {
            const styles = CATEGORY_STYLES[post.category];

            return (
              <article
                key={post.title}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className={`h-3 ${styles.banner}`} />
                <div className="p-6 flex flex-col flex-1">
                  <span
                    className={`${styles.badge} text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full w-fit`}
                  >
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mt-3 mb-2 hover:text-indigo-600 cursor-pointer transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-500">
                      {post.author}
                    </span>
                    <span className="text-xs text-gray-400 text-right">
                      {post.date} · {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <section className="bg-indigo-600 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white">Stay Updated</h2>
          <p className="text-indigo-200 text-sm mt-3 mb-6">
            Get the latest tips and updates delivered to your inbox.
          </p>
          <form className="flex max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-4 py-3 rounded-l-xl border-0 focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-[#1E1B4B] text-white px-6 py-3 rounded-r-xl font-semibold hover:bg-indigo-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-indigo-300 text-xs mt-3">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
