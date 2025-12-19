import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import { Link, useSearch } from 'wouter';
import { motion } from 'framer-motion';

export default function Journal() {
  const { posts, branding } = useProducts();
  const searchParams = useSearch();
  const categoryParam = new URLSearchParams(searchParams).get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category).filter(c => c && c.toLowerCase() !== 'noivas')));
  const categories = ['Todos', 'Noivas', ...uniqueCategories];
  
  const filteredPosts = selectedCategory && selectedCategory !== 'Todos'
    ? posts.filter(p => 
        p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory.toLowerCase() === 'noivas' && (
          p.category?.toLowerCase().includes('noiva') ||
          p.title?.toLowerCase().includes('noiva') ||
          p.category?.toLowerCase().includes('casamento')
        ))
      )
    : posts;

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 border-b border-border pb-8 flex flex-col md:flex-row justify-between items-end">
           <div>
             <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-4">Journal</h1>
             <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest max-w-md">
               Histórias, inspirações e o mundo {branding.companyName}.
             </p>
           </div>
           <div className="font-mono text-xs mt-4 md:mt-0">
             EDITORIAL 2026
           </div>
        </div>

        {selectedCategory?.toLowerCase() === 'noivas' && (
          <motion.div 
            className="mb-16 p-8 md:p-12 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-none border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Heart className="w-12 h-12 text-muted-foreground flex-shrink-0" />
              <div className="text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                  Especial Noivas
                </h2>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mb-4">
                  Inspirações exclusivas para o seu grande dia
                </p>
                <Link href="/noivas">
                  <Button variant="outline" className="rounded-none" data-testid="link-noivas-page">
                    Conheça nossa Coleção Noivas <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'Todos' ? null : category)}
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                (category === 'Todos' && !selectedCategory) || selectedCategory === category
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-muted-foreground border-border hover:border-black hover:text-black'
              }`}
              data-testid={`filter-category-${category.toLowerCase()}`}
            >
              {category}
              {category === 'Noivas' && <Heart className="inline-block ml-1 h-3 w-3" />}
            </button>
          ))}
        </div>

        {!selectedCategory && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="lg:col-span-2 group cursor-pointer relative h-[70vh] overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors" />
              <img 
                src={branding.journalHeroImage} 
                alt={branding.journalHeroTitle} 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 text-white max-w-4xl">
                <div className="font-mono text-xs uppercase tracking-widest mb-4 flex gap-4">
                  <span>{branding.journalHeroSubtitle}</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl mb-6 leading-none">{branding.journalHeroTitle}</h2>
              </div>
            </div>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-4">
              Nenhum post encontrado nesta categoria
            </p>
            <Button 
              variant="outline" 
              className="rounded-none"
              onClick={() => setSelectedCategory(null)}
            >
              Ver todos os posts
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/journal/${post.id}`} className="group block cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  data-testid={`card-post-${post.id}`}
                >
                  <div className="aspect-[4/5] overflow-hidden mb-6 bg-secondary relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 flex justify-between">
                    <span className="flex items-center gap-1">
                      {post.category}
                      {(post.category?.toLowerCase().includes('noiva') || post.category?.toLowerCase().includes('casamento')) && (
                        <Heart className="h-3 w-3" />
                      )}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight mb-3 group-hover:underline underline-offset-4 decoration-1">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground font-light line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest group-hover:gap-4 transition-all">
                    Ler Mais <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
