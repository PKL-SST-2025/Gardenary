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

const TransactionHistory: Component = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = createSignal<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = createSignal<Transaction | null>(null);

  // Sample transactions for demo
  onMount(() => {
    const sampleTransactions: Transaction[] = [
      {
        id: "1703123456789",
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
              id: 2,
              name: "Garden Shovel",
              price: 75000,
              image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
              description: "Durable steel garden shovel",
              category: 'tools',
              stock: 25
            },
            quantity: 1
          }
        ],
        total: 125000,
        date: "2024-12-21T10:30:00.000Z",
        status: 'completed',
        customerInfo: {
          name: "John Doe",
          email: "john@example.com",
          address: "Jl. Sudirman No. 123, Jakarta",
          phone: "08123456789"
        }
      },
      {
        id: "1703023456789",
        items: [
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
        total: 45000,
        date: "2024-12-20T15:45:00.000Z",
        status: 'pending',
        customerInfo: {
          name: "Jane Smith",
          email: "jane@example.com",
          address: "Jl. Thamrin No. 456, Jakarta",
          phone: "08123456790"
        }
      }
    ];
    setTransactions(sampleTransactions);
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateTransactionStatus = (transactionId: string, newStatus: 'pending' | 'completed' | 'cancelled') => {
    setTransactions(transactions().map(transaction =>
      transaction.id === transactionId
        ? { ...transaction, status: newStatus }
        : transaction
    ));
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
                onClick={() => navigate('/products')}
                class="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md"
              >
                Products
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p class="text-gray-600">Track all your orders and their status</p>
        </div>

        {/* Transactions List */}
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          
          <Show when={transactions().length === 0}>
            <div class="text-center py-12">
              <p class="text-gray-500">No transactions found</p>
            </div>
          </Show>

          <For each={transactions()}>
            {(transaction) => (
              <div class="border-b border-gray-200 last:border-b-0">
                <div class="px-6 py-4">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        Order #{transaction.id}
                      </h3>
                      <p class="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div class="flex items-center space-x-4">
                      <span class={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                      <span class="text-lg font-bold text-green-800">
                        {formatCurrency(transaction.total)}
                      </span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">Customer Information</h4>
                      <div class="text-sm text-gray-600">
                        <p>{transaction.customerInfo.name}</p>
                        <p>{transaction.customerInfo.email}</p>
                        <p>{transaction.customerInfo.phone}</p>
                        <p class="mt-1">{transaction.customerInfo.address}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">Items Ordered</h4>
                      <div class="space-y-2">
                        <For each={transaction.items}>
                          {(item) => (
                            <div class="flex items-center space-x-3">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name}
                                class="w-12 h-12 object-cover rounded"
                              />
                              <div class="flex-1">
                                <p class="text-sm font-medium">{item.product.name}</p>
                                <p class="text-xs text-gray-500">
                                  {item.quantity}x {formatCurrency(item.product.price)}
                                </p>
                              </div>
                            </div>
                          )}
                        </For>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Admin */}
                  <Show when={transaction.status === 'pending'}>
                    <div class="flex space-x-2">
                      <button
                        onClick={() => updateTransactionStatus(transaction.id, 'completed')}
                        class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => updateTransactionStatus(transaction.id, 'cancelled')}
                        class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </Show>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Statistics */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
            <p class="text-3xl font-bold text-green-800">{transactions().length}</p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Completed Orders</h3>
            <p class="text-3xl font-bold text-green-600">
              {transactions().filter(t => t.status === 'completed').length}
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
            <p class="text-2xl font-bold text-green-800">
              {formatCurrency(
                transactions()
                  .filter(t => t.status === 'completed')
                  .reduce((sum, t) => sum + t.total, 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;