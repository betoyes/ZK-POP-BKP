import { Link } from 'wouter';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <span className="font-serif text-3xl font-bold tracking-widest text-primary">AURUM</span>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
              Criando peças atemporais que celebram a beleza da elegância moderna. Cada joia conta uma história única.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm flex flex-col">
              <Link href="/shop?category=aneis" className="text-muted-foreground hover:text-primary transition-colors">Anéis</Link>
              <Link href="/shop?category=colares" className="text-muted-foreground hover:text-primary transition-colors">Colares</Link>
              <Link href="/shop?category=brincos" className="text-muted-foreground hover:text-primary transition-colors">Brincos</Link>
              <Link href="/shop?category=pulseiras" className="text-muted-foreground hover:text-primary transition-colors">Pulseiras</Link>
              <Link href="/collections" className="text-muted-foreground hover:text-primary transition-colors">Coleções</Link>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Sobre</h4>
            <ul className="space-y-4 text-sm flex flex-col">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Nossa História</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contato</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Sustentabilidade</Link>
              <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Painel Admin</Link>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Inscreva-se para receber novidades exclusivas e ofertas especiais.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-background border border-input px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-3 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors uppercase"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2024 AURUM Joalheria. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
