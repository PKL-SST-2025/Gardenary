import { createSignal, type Component, For, Show } from 'solid-js';
import { onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import logo from '../assets/logo.png';

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

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const MyOrders: Component = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = createSignal<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = createSignal(false);
  const [filterStatus, setFilterStatus] = createSignal<string>('all');

  // Sample orders data for demo
  onMount(() => {
    const sampleOrders: Order[] = [
      {
        id: "ORD-2024-001",
        items: [
          {
            product: {
              id: 1,
              name: "Tomato Seeds",
              price: 25000,
              image: "https://images.unsplash.com/photo-1592841200221-a6898f65c2af?w=300&h=300&fit=crop",
              description: "High-quality tomato seeds",
              category: 'seeds',
              stock: 50
            },
            quantity: 2
          },
          {
            product: {
              id: 3,
              name: "Organic Fertilizer",
              price: 45000,
              image: "https://images.unsplash.com/photo-1585838888915-6440a3f5b530?w=300&h=300&fit=crop",
              description: "Organic fertilizer for healthy plant growth",
              category: 'fertilizer',
              stock: 30
            },
            quantity: 1
          }
        ],
        total: 95000,
        date: "2024-12-25T10:30:00.000Z",
        status: 'delivered',
        customerInfo: {
          name: "Ahmad Wijaya",
          email: "ahmad@example.com",
          address: "Jl. Sudirman No. 123, Purwokerto",
          phone: "08123456789"
        },
        trackingNumber: "JNE123456789",
        estimatedDelivery: "2024-12-27"
      },
      {
        id: "ORD-2024-002",
        items: [
          {
            product: {
              id: 2,
              name: "Garden Shovel",
              price: 75000,
              image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
              description: "Durable steel garden shovel",
              category: 'tools',
              stock: 25
            },
            quantity: 1
          },
          {
            product: {
              id: 4,
              name: "Ceramic Pot",
              price: 35000,
              image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop",
              description: "Beautiful ceramic pot for indoor plants",
              category: 'pots',
              stock: 20
            },
            quantity: 2
          }
        ],
        total: 145000,
        date: "2024-12-28T15:45:00.000Z",
        status: 'shipped',
        customerInfo: {
          name: "Ahmad Wijaya",
          email: "ahmad@example.com",
          address: "Jl. Sudirman No. 123, Purwokerto",
          phone: "08123456789"
        },
        trackingNumber: "JNE987654321",
        estimatedDelivery: "2024-12-30"
      },
      {
        id: "ORD-2024-003",
        items: [
          {
            product: {
              id: 5,
              name: "Carrot Seeds",
              price: 20000,
              image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
              description: "Fresh carrot seeds for your vegetable garden",
              category: 'seeds',
              stock: 40
            },
            quantity: 3
          }
        ],
        total: 60000,
        date: "2024-12-30T09:15:00.000Z",
        status: 'processing',
        customerInfo: {
          name: "Ahmad Wijaya",
          email: "ahmad@example.com",
          address: "Jl. Sudirman No. 123, Purwokerto",
          phone: "08123456789"
        }
      },
      {
        id: "ORD-2024-004",
        items: [
          {
            product: {
              id: 6,
              name: "Watering Can",
              price: 55000,
              image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
              description: "Metal watering can with long spout",
              category: 'tools',
              stock: 15
            },
            quantity: 1
          }
        ],
        total: 55000,
        date: "2025-01-02T14:20:00.000Z",
        status: 'pending',
        customerInfo: {
          name: "Ahmad Wijaya",
          email: "ahmad@example.com",
          address: "Jl. Sudirman No. 123, Purwokerto",
          phone: "08123456789"
        }
      }
    ];
    setOrders(sampleOrders);
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'pending':
        return '📝';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  const filteredOrders = () => {
    if (filterStatus() === 'all') {
      return orders();
    }
    return orders().filter(order => order.status === filterStatus());
  };

  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const getProgressSteps = (status: string) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(status);
    
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav class="bg-white shadow-md sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="Logo" class="w-12 h-12" />
              <span class="font-baloo text-xl font-semibold text-green-800">Gardenary</span>
            </div>
            
            <div class="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                class="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md transition"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/products')}
                class="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md transition"
              >
                Products
              </button>
              <button class="bg-green-800 text-white px-4 py-2 rounded-full">
                My Orders
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p class="text-gray-600">Track and manage your gardening orders</p>
        </div>

        {/* Filter Tabs */}
        <div class="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <button
              onClick={() => setFilterStatus(status)}
              class={`px-4 py-2 rounded-full font-medium capitalize transition ${
                filterStatus() === status
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-300'
              }`}
            >
              {status === 'all' ? 'All Orders' : status}
              {status !== 'all' && (
                <span class="ml-2 text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full">
                  {orders().filter(o => o.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div class="space-y-4">
          <Show when={filteredOrders().length === 0}>
            <div class="bg-white rounded-lg shadow-md p-12 text-center">
              <div class="text-gray-400 text-6xl mb-4">📦</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p class="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/products')}
                class="bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-900 transition"
              >
                Start Shopping
              </button>
            </div>
          </Show>

          <For each={filteredOrders()}>
            {(order) => (
              <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div class="p-6">
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div class="mb-4 lg:mb-0">
                      <div class="flex items-center space-x-3 mb-2">
                        <h3 class="text-lg font-semibold text-gray-900">
                          Order {order.id}
                        </h3>
                        <div class={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          <span class="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </div>
                      <p class="text-sm text-gray-500">
                        Ordered on {formatDate(order.date)}
                      </p>
                      {order.trackingNumber && (
                        <p class="text-sm text-blue-600 font-medium">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div class="text-right">
                        <p class="text-sm text-gray-500">Total</p>
                        <p class="text-xl font-bold text-green-800">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                      <button
                        onClick={() => viewOrderDetail(order)}
                        class="bg-green-800 text-white px-4 py-2 rounded-md font-medium hover:bg-green-900 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div class="border-t pt-4">
                    <div class="flex flex-wrap gap-4">
                      <For each={order.items.slice(0, 3)}>
                        {(item) => (
                          <div class="flex items-center space-x-3">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              class="w-12 h-12 object-cover rounded border"
                            />
                            <div>
                              <p class="text-sm font-medium text-gray-900">{item.product.name}</p>
                              <p class="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        )}
                      </For>
                      {order.items.length > 3 && (
                        <div class="flex items-center text-sm text-gray-500">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  {order.estimatedDelivery && order.status !== 'delivered' && (
                    <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p class="text-sm text-blue-800">
                        <span class="font-medium">Estimated Delivery:</span> {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Show when={showOrderDetail() && selectedOrder()}>
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen px-4 py-6">
            <div class="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowOrderDetail(false)}></div>
            <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">
                  Order Details - {selectedOrder()?.id}
                </h2>
                <button
                  onClick={() => setShowOrderDetail(false)}
                  class="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div class="p-6">
                {/* Order Status Progress */}
                <div class="mb-8">
                  <h3 class="text-lg font-semibold mb-4">Order Status</h3>
                  <div class="flex items-center justify-between">
                    <For each={getProgressSteps(selectedOrder()?.status || '')}>
                      {(step, index) => (
                        <>
                          <div class="flex flex-col items-center">
                            <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step.completed 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step.completed ? '✓' : index() + 1}
                            </div>
                            <span class={`text-xs mt-2 capitalize ${
                              step.completed ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {step.step}
                            </span>
                          </div>
                          {index() < getProgressSteps(selectedOrder()?.status || '').length - 1 && (
                            <div class={`flex-1 h-1 mx-2 ${
                              step.completed ? 'bg-green-600' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </>
                      )}
                    </For>
                  </div>
                </div>

                {/* Order Information */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Order Information</h4>
                    <div class="space-y-1 text-sm">
                      <p><span class="text-gray-500">Order ID:</span> {selectedOrder()?.id}</p>
                      <p><span class="text-gray-500">Date:</span> {formatDate(selectedOrder()?.date || '')}</p>
                      <p><span class="text-gray-500">Status:</span> 
                        <span class={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedOrder()?.status || '')}`}>
                          {selectedOrder()?.status}
                        </span>
                      </p>
                      {selectedOrder()?.trackingNumber && (
                        <p><span class="text-gray-500">Tracking:</span> {selectedOrder()?.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Delivery Address</h4>
                    <div class="text-sm text-gray-600">
                      <p class="font-medium">{selectedOrder()?.customerInfo.name}</p>
                      <p>{selectedOrder()?.customerInfo.address}</p>
                      <p>{selectedOrder()?.customerInfo.phone}</p>
                      <p>{selectedOrder()?.customerInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div class="mb-6">
                  <h4 class="text-sm font-semibold text-gray-700 mb-4">Items Ordered</h4>
                  <div class="space-y-4">
                    <For each={selectedOrder()?.items}>
                      {(item) => (
                        <div class="flex items-center space-x-4 p-4 border rounded-lg">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            class="w-16 h-16 object-cover rounded border"
                          />
                          <div class="flex-1">
                            <h5 class="font-medium text-gray-900">{item.product.name}</h5>
                            <p class="text-sm text-gray-600">{item.product.description}</p>
                            <p class="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div class="text-right">
                            <p class="font-medium">{formatCurrency(item.product.price)}</p>
                            <p class="text-sm text-gray-500">each</p>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>

                {/* Order Total */}
                <div class="border-t pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold">Total</span>
                    <span class="text-2xl font-bold text-green-800">
                      {formatCurrency(selectedOrder()?.total || 0)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div class="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3">
                  {selectedOrder()?.status === 'delivered' && (
                    <button class="flex-1 bg-green-800 text-white px-4 py-2 rounded-md font-medium hover:bg-green-900 transition">
                      Leave Review
                    </button>
                  )}
                  {selectedOrder()?.status === 'pending' && (
                    <button class="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition">
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/products')}
                    class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition"
                  >
                    Order Again
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

export default MyOrders;