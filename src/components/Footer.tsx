import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">SP</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                SPOT<span className="text-primary">PRO</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The future of sports performance tracking technology.
            </p>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Demo", "API"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-foreground text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-foreground mb-1">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Get the latest on SPOT PRO technology.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium"
            >
              Subscribe
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 SPOT PRO. All rights reserved.</span>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" className="hover:text-primary transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
