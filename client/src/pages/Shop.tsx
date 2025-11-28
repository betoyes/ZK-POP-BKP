import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { products, categories } from '@/lib/mockData';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Shop() {
  const [location] = useLocation();
  // Extract query params manually or use a library. Simple manual check for now.
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <div className="bg-secondary/30 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Nossa Coleção</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore nossa seleção exclusiva de joias finas, criadas para celebrar os momentos mais preciosos da vida.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="font-serif text-lg mb-6 pb-2 border-b border-border">Categorias</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-all" 
                    checked={selectedCategory === 'all'}
                    onCheckedChange={() => setSelectedCategory('all')}
                  />
                  <label htmlFor="cat-all" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    Todas
                  </label>
                </div>
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cat-${cat.id}`} 
                      checked={selectedCategory === cat.id}
                      onCheckedChange={() => setSelectedCategory(cat.id)}
                    />
                    <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-serif text-lg mb-6 pb-2 border-b border-border">Preço</h3>
              <div className="space-y-6">
                <Slider 
                  defaultValue={[0, 50000]} 
                  max={50000} 
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} resultados
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-secondary/20">
                <p className="text-lg font-serif mb-4">Nenhum produto encontrado.</p>
                <Button variant="outline" onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 50000]);
                }}>
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} 
                    className="group"
                  >
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative aspect-square bg-white mb-4 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
                          <Button className="w-full rounded-none bg-black text-white hover:bg-primary uppercase text-xs tracking-widest">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-muted-foreground mt-1">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
