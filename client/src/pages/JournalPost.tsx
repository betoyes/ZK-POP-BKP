import { useRoute, Link } from "wouter";
import { useProducts } from "@/context/ProductContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function JournalPost() {
  const [, params] = useRoute("/journal/:id");
  const { posts } = useProducts();
  
  const postId = params?.id ? parseInt(params.id) : null;
  const post = posts.find(p => p.id === postId);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="mb-12">
          <Link href="/journal">
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-muted-foreground gap-2 font-mono text-xs uppercase tracking-widest">
              <ArrowLeft className="h-4 w-4" /> Voltar para Journal
            </Button>
          </Link>
        </div>

        <header className="mb-12 text-center">
          <div className="flex justify-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>
          <p className="font-light text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="aspect-video w-full bg-secondary mb-16 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>

        <div className="prose prose-lg prose-neutral mx-auto font-serif">
          {/* Simulating content paragraphs if simple string, or rendering HTML if needed (but risky without sanitization) */}
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-6 leading-relaxed text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-24 pt-12 border-t border-border flex justify-between items-center">
            <div className="font-mono text-xs uppercase tracking-widest">Compartilhar</div>
            <div className="flex gap-4">
                {/* Social placeholders */}
                <button className="font-mono text-xs uppercase hover:underline">Instagram</button>
                <button className="font-mono text-xs uppercase hover:underline">Twitter</button>
                <button className="font-mono text-xs uppercase hover:underline">Facebook</button>
            </div>
        </div>
      </article>
    </div>
  );
}
