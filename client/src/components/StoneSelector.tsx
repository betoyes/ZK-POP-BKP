import { Gem } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface StoneOption {
  id: string;
  label: string;
  price: number;
}

// Helper to parse stone variations from product
export const getStoneOptions = (product: any): StoneOption[] => {
  const options: StoneOption[] = [];
  
  // Add main stone (base price)
  options.push({
    id: 'main',
    label: product.mainStoneName || 'Diamante Natural',
    price: product.price
  });
  
  // Add dynamic variations from stoneVariations JSON
  if (product.stoneVariations) {
    try {
      const variations = typeof product.stoneVariations === 'string' 
        ? JSON.parse(product.stoneVariations) 
        : product.stoneVariations;
      variations.forEach((v: any, i: number) => {
        if (v.name && v.price) {
          options.push({
            id: `var_${i}`,
            label: v.name,
            price: v.price
          });
        }
      });
    } catch (e) {}
  }
  
  // Legacy support: add old fixed variations
  if (product.priceDiamondSynthetic) {
    options.push({ id: 'synthetic', label: 'Diamante Sintético', price: product.priceDiamondSynthetic });
  }
  if (product.priceZirconia) {
    options.push({ id: 'zirconia', label: 'Zircônia', price: product.priceZirconia });
  }
  
  return options;
};

// Check if product has stone variations
export const hasStoneVariations = (product: any): boolean => {
  const options = getStoneOptions(product);
  return options.length > 1;
};

// Get price for selected stone
export const getStonePrice = (product: any, stoneId: string): number => {
  const options = getStoneOptions(product);
  const selected = options.find(o => o.id === stoneId);
  return selected ? selected.price : product.price;
};

// Get label for selected stone
export const getStoneLabel = (product: any, stoneId: string): string => {
  const options = getStoneOptions(product);
  const selected = options.find(o => o.id === stoneId);
  return selected ? selected.label : options[0]?.label || 'Selecione';
};

interface StoneSelectorProps {
  product: any;
  value: string;
  onChange: (value: string) => void;
  showPrice?: boolean;
  size?: 'sm' | 'lg';
  className?: string;
}

export default function StoneSelector({ 
  product, 
  value, 
  onChange, 
  showPrice = true,
  size = 'sm',
  className = ''
}: StoneSelectorProps) {
  const options = getStoneOptions(product);
  const selectedLabel = getStoneLabel(product, value);
  
  if (options.length <= 1) {
    return null;
  }
  
  const triggerClasses = size === 'lg' 
    ? "w-full h-14 rounded-none border-black font-mono text-sm uppercase tracking-widest"
    : "w-full h-8 rounded-none text-xs font-mono border-black/30 hover:border-black transition-colors";
  
  const itemClasses = size === 'lg'
    ? "font-mono text-sm uppercase tracking-widest"
    : "text-xs font-mono";
  
  return (
    <div className={`${className}`} onClick={(e) => e.stopPropagation()}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className={triggerClasses}
          data-testid={`stone-selector-${product.id}`}
        >
          <div className="flex items-center gap-2">
            <Gem className={size === 'lg' ? "h-4 w-4" : "h-3 w-3"} />
            <SelectValue placeholder="Tipo de Pedra">{selectedLabel}</SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          {options.map(stone => (
            <SelectItem 
              key={stone.id} 
              value={stone.id} 
              className={itemClasses}
              data-testid={`stone-option-${stone.id}`}
            >
              {stone.label}
              {showPrice && ` - R$ ${(stone.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
