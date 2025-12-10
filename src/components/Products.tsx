import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  ShoppingCart,
  Filter,
  Plus,
  Minus,
  Leaf,
  Sprout,
  Bug,
  Droplets,
  FlaskConical,
  X,
  Check,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  brand: string;
  imageUrl: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductsProps {
  onNavigate: (view: string) => void;
}

const products: Product[] = [
  {
    id: 'P001',
    name: 'Glifosato 360 SL',
    category: 'Herbicida',
    description: 'Herbicida sistémico no selectivo para control total de malezas',
    price: 245.00,
    unit: 'L',
    stock: 150,
    brand: 'AgroMax',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
  },
  {
    id: 'P002',
    name: 'Azoxistrobina 250 SC',
    category: 'Fungicida',
    description: 'Fungicida sistémico preventivo y curativo de amplio espectro',
    price: 680.00,
    unit: 'L',
    stock: 85,
    brand: 'CropShield',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400',
  },
  {
    id: 'P003',
    name: 'NPK 18-46-0',
    category: 'Fertilizante',
    description: 'Fertilizante granulado de alta concentración para inicio de ciclo',
    price: 580.00,
    unit: 'kg',
    stock: 320,
    brand: 'NutriCrop',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400',
  },
  {
    id: 'P004',
    name: 'Clorpirifos 480 EC',
    category: 'Insecticida',
    description: 'Insecticida organofosforado de contacto e ingestión',
    price: 325.00,
    unit: 'L',
    stock: 110,
    brand: 'BioProtect',
    imageUrl: 'https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=400',
  },
  {
    id: 'P005',
    name: 'Tebuconazol 250 EW',
    category: 'Fungicida',
    description: 'Fungicida sistémico triazol para enfermedades foliares',
    price: 795.00,
    unit: 'L',
    stock: 65,
    brand: 'CropShield',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
  },
  {
    id: 'P006',
    name: 'Urea 46%',
    category: 'Fertilizante',
    description: 'Fertilizante nitrogenado de alta concentración',
    price: 420.00,
    unit: 'kg',
    stock: 450,
    brand: 'NutriCrop',
    imageUrl: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=400',
  },
  {
    id: 'P007',
    name: 'Lambda Cihalotrina 50 CS',
    category: 'Insecticida',
    description: 'Insecticida piretroide de contacto y acción residual',
    price: 510.00,
    unit: 'L',
    stock: 95,
    brand: 'BioProtect',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
  },
  {
    id: 'P008',
    name: 'Mancozeb 800 WP',
    category: 'Fungicida',
    description: 'Fungicida preventivo multisitio de contacto',
    price: 285.00,
    unit: 'kg',
    stock: 180,
    brand: 'CropShield',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400',
  },
  {
    id: 'P009',
    name: '2,4-D Amina 720 SL',
    category: 'Herbicida',
    description: 'Herbicida selectivo hormonal para hoja ancha',
    price: 195.00,
    unit: 'L',
    stock: 220,
    brand: 'AgroMax',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
  },
  {
    id: 'P010',
    name: 'Sulfato de Potasio',
    category: 'Fertilizante',
    description: 'Fertilizante potásico soluble de alta pureza',
    price: 655.00,
    unit: 'kg',
    stock: 140,
    brand: 'NutriCrop',
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=400',
  },
  {
    id: 'P011',
    name: 'Imidacloprid 350 SC',
    category: 'Insecticida',
    description: 'Insecticida sistémico neonicotinoide',
    price: 865.00,
    unit: 'L',
    stock: 55,
    brand: 'BioProtect',
    imageUrl: 'https://images.unsplash.com/photo-1669065515578-44d0ba70bb69?w=400',
  },
  {
    id: 'P012',
    name: 'Propiconazol 250 EC',
    category: 'Fungicida',
    description: 'Fungicida sistémico triazol de amplio espectro',
    price: 725.00,
    unit: 'L',
    stock: 75,
    brand: 'CropShield',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
];

const categoryIcons: { [key: string]: any } = {
  Herbicida: Leaf,
  Fungicida: Sprout,
  Insecticida: Bug,
  Fertilizante: Droplets,
};

const categoryColors: { [key: string]: string } = {
  Herbicida: 'bg-green-100 text-green-700 border-green-200',
  Fungicida: 'bg-blue-100 text-blue-700 border-blue-200',
  Insecticida: 'bg-purple-100 text-purple-700 border-purple-200',
  Fertilizante: 'bg-orange-100 text-orange-700 border-orange-200',
};

export function Products({ onNavigate }: ProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Todos', 'Herbicida', 'Fungicida', 'Insecticida', 'Fertilizante'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map((item) => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Productos Agroquímicos</h1>
          <p className="text-slate-600 mt-2">
            Catálogo completo de insumos agrícolas para tus cultivos
          </p>
        </div>
        <Button
          onClick={() => setIsCartOpen(true)}
          className="h-12 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/30 relative"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Carrito ({cartItemsCount})
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="search"
            placeholder="Buscar productos por nombre, descripción o marca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : ''
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Total Productos</p>
              <h3 className="text-slate-900 mt-2">{products.length}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {['Herbicida', 'Fungicida', 'Insecticida'].map((category) => {
          const count = products.filter((p) => p.category === category).length;
          const Icon = categoryIcons[category];
          return (
            <Card key={category} className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600">{category}s</p>
                  <h3 className="text-slate-900 mt-2">{count}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const Icon = categoryIcons[product.category];
          return (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 right-3 ${categoryColors[product.category]}`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {product.category}
                </Badge>
                {product.stock < 50 && (
                  <Badge className="absolute top-3 left-3 bg-red-100 text-red-700 border-red-200">
                    Stock Bajo
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-slate-500">{product.brand}</p>
                  <h3 className="text-slate-900 mt-1">{product.name}</h3>
                  <p className="text-slate-600 mt-2 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-slate-900">${product.price.toFixed(2)}</p>
                    <p className="text-slate-500">por {product.unit}</p>
                  </div>
                  <p className="text-slate-600">Stock: {product.stock}</p>
                </div>

                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={product.stock === 0}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar al Carrito
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <FlaskConical className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">No se encontraron productos</h3>
          <p className="text-slate-600">
            Intenta con otros términos de búsqueda o filtros
          </p>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Cart Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-slate-900">Carrito de Compras</h2>
                  <p className="text-slate-600 mt-1">{cartItemsCount} productos</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-slate-900 mb-2">Carrito vacío</h3>
                  <p className="text-slate-600">
                    Agrega productos para comenzar tu orden
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-slate-900">{item.name}</p>
                            <p className="text-slate-500">{item.brand}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-slate-900 w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-6 space-y-4 bg-slate-50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="text-slate-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">IVA (16%)</span>
                    <span className="text-slate-900">${(cartTotal * 0.16).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-900">Total</span>
                    <span className="text-slate-900">
                      ${(cartTotal * 1.16).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                  onClick={() => {
                    // Aquí iría la lógica de checkout
                    alert('Funcionalidad de checkout en desarrollo');
                  }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Procesar Orden
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}