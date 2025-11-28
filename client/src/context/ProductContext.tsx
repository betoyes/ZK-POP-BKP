import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, products as initialProducts, Category, categories as initialCategories, Collection, collections as initialCollections } from '@/lib/mockData';
import ringImage from '@assets/generated_images/diamond_ring_product_shot.png';

// Mock initial orders
const initialOrders = [
  { id: 'ORD-001', customer: 'Maria Silva', date: '2025-11-28', status: 'Entregue', total: 12500, items: 1 },
  { id: 'ORD-002', customer: 'João Santos', date: '2025-11-27', status: 'Processando', total: 4200, items: 1 },
  { id: 'ORD-003', customer: 'Ana Oliveira', date: '2025-11-26', status: 'Enviado', total: 8900, items: 2 },
  { id: 'ORD-004', customer: 'Carlos Lima', date: '2025-11-25', status: 'Cancelado', total: 3800, items: 1 },
  { id: 'ORD-005', customer: 'Beatriz Costa', date: '2025-11-24', status: 'Entregue', total: 25000, items: 3 },
];

// Mock initial customers
const initialCustomers = [
  { id: 'CUST-001', name: 'Maria Silva', email: 'maria@email.com', orders: 5, totalSpent: 45000, lastOrder: '2025-11-28' },
  { id: 'CUST-002', name: 'João Santos', email: 'joao@email.com', orders: 2, totalSpent: 8400, lastOrder: '2025-11-27' },
  { id: 'CUST-003', name: 'Ana Oliveira', email: 'ana@email.com', orders: 3, totalSpent: 15600, lastOrder: '2025-11-26' },
  { id: 'CUST-004', name: 'Carlos Lima', email: 'carlos@email.com', orders: 1, totalSpent: 3800, lastOrder: '2025-11-25' },
  { id: 'CUST-005', name: 'Beatriz Costa', email: 'bia@email.com', orders: 8, totalSpent: 82000, lastOrder: '2025-11-24' },
];

interface ProductContextType {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  orders: any[];
  customers: any[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  deleteCollection: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [orders] = useState(initialOrders);
  const [customers] = useState(initialCustomers);

  // Products
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...newProduct, id }]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Categories
  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const id = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    setCategories([...categories, { ...newCategory, id }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Collections
  const addCollection = (newCollection: Omit<Collection, 'id'>) => {
    const id = newCollection.name.toLowerCase().replace(/\s+/g, '-');
    // Use a placeholder image if none provided (mock behavior)
    const collectionWithImage = { 
      ...newCollection, 
      id,
      image: newCollection.image || ringImage 
    };
    setCollections([...collections, collectionWithImage]);
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
  };

  return (
    <ProductContext.Provider value={{ 
      products, categories, collections, orders, customers,
      addProduct, updateProduct, deleteProduct,
      addCategory, deleteCategory,
      addCollection, deleteCollection
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
