import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, collections } from '@/lib/mockData';
import heroImage from '@assets/generated_images/luxury_jewelry_hero_image_with_model.png';

export default function Home() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury Jewelry Model" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white space-y-6"
          >
            <span className="uppercase tracking-[0.3em] text-sm font-medium">Nova Coleção 2025</span>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight">
              Elegância em <br/><span className="italic text-primary-foreground/90">Cada Detalhe</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-md font-light leading-relaxed">
              Descubra a beleza atemporal de nossas peças exclusivas, desenhadas para momentos inesquecíveis.
            </p>
            <div className="pt-4">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 text-sm tracking-widest uppercase">
                  Explorar Coleção
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="uppercase tracking-widest text-xs font-semibold text-primary mb-2 block">Categorias</span>
            <h2 className="font-serif text-4xl font-medium">Nossas Coleções</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, idx) => (
              <motion.div 
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <Link href={`/shop?collection=${collection.id}`} className="block w-full h-full">
                  <div className="w-full h-full relative">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="font-serif text-2xl mb-2">{collection.name}</h3>
                      <span className="text-xs uppercase tracking-widest border-b border-white/50 pb-1 group-hover:border-white transition-all">Ver Produtos</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="uppercase tracking-widest text-xs font-semibold text-primary mb-2 block">Lançamentos</span>
              <h2 className="font-serif text-4xl font-medium">Novas Chegadas</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider hover:text-primary transition-colors">
                Ver Tudo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square bg-white mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Novo
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
                      <Button className="w-full rounded-none bg-black text-white hover:bg-primary uppercase text-xs tracking-widest">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-muted-foreground mt-1">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link href="/shop">
              <Button variant="outline" className="rounded-none border-black text-black uppercase tracking-widest text-xs px-8">
                Ver Tudo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story / Minimal */}
      <section className="py-32 bg-background text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Star className="h-6 w-6 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
            "A verdadeira elegância não é sobre ser notado, é sobre ser lembrado."
          </h2>
          <p className="text-muted-foreground text-lg font-light italic">
            — Giorgio Armani
          </p>
          <div className="mt-12">
            <Link href="/about">
              <Button variant="link" className="text-foreground hover:text-primary uppercase tracking-widest text-sm">
                Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
