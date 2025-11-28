import { useRoute, Link } from 'wouter';
import { products } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Product() {
  const [match, params] = useRoute('/product/:id');
  const { toast } = useToast();
  
  if (!match) return null;

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-serif">Produto não encontrado</h1>
        <Link href="/shop"><Button>Voltar para Loja</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado à sua sacola.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
           <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar para Loja
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery (Mock - just one image for now) */}
          <div className="bg-white aspect-[4/5] overflow-hidden relative">
             <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 text-primary uppercase tracking-widest text-xs font-semibold">
              {product.collection}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-primary">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-xs text-muted-foreground">(12 avaliações)</span>
            </div>

            <p className="text-2xl mb-8">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>

            <p className="text-muted-foreground leading-relaxed mb-10 font-light">
              {product.description} Feito à mão pelos nossos mestres artesãos, esta peça representa o ápice da qualidade e design. Cada detalhe foi cuidadosamente pensado para garantir brilho e durabilidade excepcionais.
            </p>

            <div className="space-y-4 mb-12">
              <Button 
                size="lg" 
                className="w-full rounded-none h-14 bg-black text-white hover:bg-primary uppercase tracking-widest"
                onClick={handleAddToCart}
              >
                Adicionar à Sacola
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 text-foreground" />
                <span>Frete grátis e seguro para todo o Brasil.</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-foreground" />
                <span>Garantia vitalícia e certificado de autenticidade.</span>
              </div>
            </div>

            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger className="font-serif text-lg">Detalhes do Produto</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Material: Ouro 18k<br/>
                    Pedras: Diamantes certificados<br/>
                    Peso: Aprox. 5g<br/>
                    Acabamento: Polido à mão
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger className="font-serif text-lg">Envio e Devoluções</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Enviamos em até 2 dias úteis. Aceitamos devoluções em até 30 dias após o recebimento, desde que a peça esteja em sua condição original.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
