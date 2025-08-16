import { createSignal, type Component, For, Show } from 'solid-js';
import { onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import logo from '../assets/logo.png';
import tomato from "../assets/tomatoseeds.png";

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'seeds' | 'tools' | 'fertilizer' | 'pots';
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Tomato Seeds",
    price: 25000,
    image: "tomatoseeds.png",
    description: "High-quality tomato seeds for your garden",
    category: 'seeds',
    stock: 50
  },
  {
    id: 2,
    name: "Garden Shovel",
    price: 75000,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    description: "Durable steel garden shovel",
    category: 'tools',
    stock: 25
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    price: 45000,
    image: "https://images.unsplash.com/photo-1585838888915-6440a3f5b530?w=300&h=300&fit=crop",
    description: "Organic fertilizer for healthy plant growth",
    category: 'fertilizer',
    stock: 30
  },
  {
    id: 4,
    name: "Ceramic Pot",
    price: 35000,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop",
    description: "Beautiful ceramic pot for indoor plants",
    category: 'pots',
    stock: 20
  },
  {
    id: 5,
    name: "Carrot Seeds",
    price: 20000,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    description: "Fresh carrot seeds for your vegetable garden",
    category: 'seeds',
    stock: 40
  },
  {
    id: 6,
    name: "Watering Can",
    price: 55000,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
    description: "Metal watering can with long spout",
    category: 'tools',
    stock: 15
  }
];

const Products: Component = () => {
  const navigate = useNavigate();
  
  // Signals
  const [products] = createSignal<Product[]>(sampleProducts);
  const [cart, setCart] = createSignal<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = createSignal<string>('all');
  const [showCart, setShowCart] = createSignal(false);
  const [showCheckout, setShowCheckout] = createSignal(false);
  const [transactions, setTransactions] = createSignal<Transaction[]>([]);
  const [customerInfo, setCustomerInfo] = createSignal({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  // Load cart and transactions from memory on mount
  onMount(() => {
    // In a real app, you might load from localStorage or API
    // For now, we'll just use in-memory storage
  });

  // Filter products by category
  const filteredProducts = () => {
    if (selectedCategory() === 'all') {
      return products();
    }
    return products().filter(product => product.category === selectedCategory());
  };

  // Add to cart
  const addToCart = (product: Product) => {
    const existingItem = cart().find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart().map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart(), { product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    setCart(cart().filter(item => item.product.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart().map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  // Calculate total
  const cartTotal = () => {
    return cart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Process checkout
  const processCheckout = () => {
    const info = customerInfo();
    
    if (!info.name || !info.email || !info.address || !info.phone) {
      alert('Please fill in all customer information');
      return;
    }

    if (cart().length === 0) {
      alert('Your cart is empty');
      return;
    }

    const orderId = 'ORD-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-6);
    const transaction: Transaction = {
      id: orderId,
      items: [...cart()],
      total: cartTotal(),
      date: new Date().toISOString(),
      status: 'pending',
      customerInfo: { ...info }
    };

    setTransactions([...transactions(), transaction]);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setCustomerInfo({ name: '', email: '', address: '', phone: '' });
    
    // Show success message with option to view orders
    const viewOrders = confirm(
      `Order placed successfully! Order ID: ${orderId}\n\nWould you like to view your orders?`
    );
    
    if (viewOrders) {
      navigate('/my-orders');
    }
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav class="bg-white shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-2">
              <img src={logo} alt="Logo" class="w-12 h-12" />
              <span class="font-baloo text-xl font-semibold text-green-800">Gardenary</span>
            </div>
            
            <div class="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                class="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/my-orders')}
                class="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md"
              >
                My Orders
              </button>
              <button
                onClick={() => setShowCart(!showCart())}
                class="relative bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900"
              >
                Cart ({cart().length})
                {cart().length > 0 && (
                  <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart().reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Gardenary Store</h1>
          <p class="text-gray-600">Find everything you need for your garden</p>
        </div>

        {/* Category Filter */}
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'seeds', 'tools', 'fertilizer', 'pots'].map(category => (
            <button
              onClick={() => setSelectedCategory(category)}
              class={`px-4 py-2 rounded-full font-medium capitalize transition ${
                selectedCategory() === category
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <For each={filteredProducts()}>
            {(product) => (
              <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img 
                  src={product.image} 
                  alt={product.name}
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p class="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-xl font-bold text-green-800">
                      {formatCurrency(product.price)}
                    </span>
                    <span class="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    class={`w-full py-2 px-4 rounded-md font-medium transition ${
                      product.stock > 0
                        ? 'bg-green-800 text-white hover:bg-green-900'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Show when={showCart()}>
        <div class="fixed inset-0 z-50 overflow-hidden">
          <div class="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div class="flex flex-col h-full">
              <div class="px-6 py-4 border-b">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Shopping Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    class="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div class="flex-1 overflow-y-auto px-6 py-4">
                <Show when={cart().length === 0}>
                  <p class="text-center text-gray-500 mt-8">Your cart is empty</p>
                </Show>
                
                <For each={cart()}>
                  {(item) => (
                    <div class="flex items-center space-x-4 py-4 border-b">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        class="w-16 h-16 object-cover rounded"
                      />
                      <div class="flex-1">
                        <h4 class="font-medium">{item.product.name}</h4>
                        <p class="text-sm text-gray-500">{formatCurrency(item.product.price)}</p>
                        <div class="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span class="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        class="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </For>
              </div>
              
              <Show when={cart().length > 0}>
                <div class="px-6 py-4 border-t">
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-lg font-semibold">Total:</span>
                    <span class="text-xl font-bold text-green-800">
                      {formatCurrency(cartTotal())}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    class="w-full bg-green-800 text-white py-3 rounded-md font-medium hover:bg-green-900 transition"
                  >
                    Checkout
                  </button>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>

      {/* Checkout Modal */}
      <Show when={showCheckout()}>
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4">
            <div class="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCheckout(false)}></div>
            <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 class="text-xl font-semibold mb-4">Checkout</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={customerInfo().name}
                    onInput={(e) => setCustomerInfo({...customerInfo(), name: e.target.value})}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={customerInfo().email}
                    onInput={(e) => setCustomerInfo({...customerInfo(), email: e.target.value})}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={customerInfo().phone}
                    onInput={(e) => setCustomerInfo({...customerInfo(), phone: e.target.value})}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="08123456789"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={customerInfo().address}
                    onInput={(e) => setCustomerInfo({...customerInfo(), address: e.target.value})}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                    placeholder="Your delivery address"
                  ></textarea>
                </div>
                
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center mb-4">
                    <span class="font-semibold">Total:</span>
                    <span class="text-xl font-bold text-green-800">
                      {formatCurrency(cartTotal())}
                    </span>
                  </div>
                </div>
                
                <div class="flex space-x-3">
                  <button
                    onClick={() => setShowCheckout(false)}
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processCheckout}
                    class="flex-1 px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Products;