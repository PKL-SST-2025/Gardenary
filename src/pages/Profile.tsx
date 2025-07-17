import { createSignal, createMemo, Show, For } from 'solid-js';
import { createStore } from 'solid-js/store';

// Types
interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  plantedDate: string;
  status: 'healthy' | 'needs-water' | 'needs-care' | 'flowering';
  location: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: 'common' | 'rare' | 'epic';
}

interface GardenerProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  gardenType: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  joinDate: string;
  plantsOwned: number;
  plantsHarvested: number;
  gardenScore: number;
  followers: number;
  following: number;
  favoritePlants: string[];
  recentPlants: Plant[];
  achievements: Achievement[];
}

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  gardenType: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  favoritePlants: string[];
}

// Mock data
const mockProfile: GardenerProfile = {
  id: '1',
  name: 'Sarah Green',
  email: 'sarah.green@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c3a6b1?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate gardener with a love for sustainable growing. Specializing in herbs and vegetables. 🌱',
  location: 'Bandung, Indonesia',
  gardenType: 'Organic Vegetable Garden',
  experience: 'intermediate',
  joinDate: 'March 2023',
  plantsOwned: 47,
  plantsHarvested: 23,
  gardenScore: 1250,
  followers: 892,
  following: 234,
  favoritePlants: ['Tomato', 'Basil', 'Lettuce', 'Mint'],
  recentPlants: [
    {
      id: '1',
      name: 'Cherry Tomato',
      species: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop',
      plantedDate: '2 weeks ago',
      status: 'healthy',
      location: 'Greenhouse'
    },
    {
      id: '2',
      name: 'Sweet Basil',
      species: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=100&h=100&fit=crop',
      plantedDate: '1 week ago',
      status: 'needs-water',
      location: 'Indoor Pot'
    },
    {
      id: '3',
      name: 'Lettuce',
      species: 'Lactuca sativa',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&h=100&fit=crop',
      plantedDate: '3 days ago',
      status: 'healthy',
      location: 'Garden Bed'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Green Thumb',
      description: 'Successfully grew 10 different plants',
      icon: '🌱',
      earnedDate: '1 month ago',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Harvest Master',
      description: 'Harvested 20 plants successfully',
      icon: '🥕',
      earnedDate: '2 weeks ago',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Plant Whisperer',
      description: 'Maintained 95% plant survival rate',
      icon: '🌿',
      earnedDate: '1 week ago',
      rarity: 'epic'
    }
  ]
};

const GardenProfilePage = () => {
  // State management
  const [profile, setProfile] = createStore<GardenerProfile>(mockProfile);
  const [isEditing, setIsEditing] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal<'plants' | 'achievements'>('plants');
  const [formData, setFormData] = createStore<ProfileFormData>({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    gardenType: profile.gardenType,
    experience: profile.experience,
    favoritePlants: [...profile.favoritePlants]
  });

  // Computed values
  const displayStats = createMemo(() => [
    { label: 'Plants Owned', value: profile.plantsOwned, icon: '🌱' },
    { label: 'Harvested', value: profile.plantsHarvested, icon: '🥕' },
    { label: 'Garden Score', value: profile.gardenScore.toLocaleString(), icon: '⭐' },
    { label: 'Followers', value: profile.followers.toLocaleString(), icon: '👥' }
  ]);

  const experienceColor = createMemo(() => {
    switch (profile.experience) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  });

  const getStatusColor = (status: Plant['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'needs-water': return 'bg-blue-100 text-blue-800';
      case 'needs-care': return 'bg-orange-100 text-orange-800';
      case 'flowering': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Event handlers
  const handleEdit = () => {
    setFormData({
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      gardenType: profile.gardenType,
      experience: profile.experience,
      favoritePlants: [...profile.favoritePlants]
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfile({
      ...profile,
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      gardenType: formData.gardenType,
      experience: formData.experience,
      favoritePlants: [...formData.favoritePlants]
    });
    
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(field, value);
  };

  const addFavoritePlant = () => {
    const newPlant = prompt('Enter plant name:');
    if (newPlant && !formData.favoritePlants.includes(newPlant)) {
      setFormData('favoritePlants', [...formData.favoritePlants, newPlant]);
    }
  };

  const removeFavoritePlant = (plant: string) => {
    setFormData('favoritePlants', formData.favoritePlants.filter(p => p !== plant));
  };

  return (
    <div class="min-h-screen bg-green-50 py-8">
      <div class="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Avatar */}
            <div class="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                class="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow-lg"
              />
              <div class="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                🌱
              </div>
            </div>

            {/* User Info */}
            <div class="flex-1 text-center lg:text-left">
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">{profile.name}</h1>
                  <span class={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${experienceColor()}`}>
                    {profile.experience.charAt(0).toUpperCase() + profile.experience.slice(1)} Gardener
                  </span>
                </div>
                <Show when={!isEditing()}>
                  <button
                    onClick={handleEdit}
                    class="mt-3 lg:mt-0 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                </Show>
              </div>
              
              <p class="text-gray-600 mb-3">{profile.email}</p>
              <p class="text-gray-700 mb-4">{profile.bio}</p>
              
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600 mb-4">
                <div class="flex items-center">
                  <span class="mr-1">📍</span>
                  {profile.location}
                </div>
                <div class="flex items-center">
                  <span class="mr-1">🏡</span>
                  {profile.gardenType}
                </div>
                <div class="flex items-center">
                  <span class="mr-1">📅</span>
                  Joined {profile.joinDate}
                </div>
              </div>

              {/* Favorite Plants */}
              <div class="mb-4">
                <h3 class="text-sm font-semibold text-gray-700 mb-2">Favorite Plants:</h3>
                <div class="flex flex-wrap gap-2">
                  <For each={profile.favoritePlants}>
                    {(plant) => (
                      <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {plant}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div class="mt-6 border-t pt-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <For each={displayStats()}>
                {(stat) => (
                  <div class="text-center p-4 bg-green-50 rounded-lg">
                    <div class="text-2xl mb-1">{stat.icon}</div>
                    <div class="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div class="text-sm text-gray-600">{stat.label}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <Show when={isEditing()}>
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Edit Garden Profile</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onInput={(e) => handleInputChange('name', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onInput={(e) => handleInputChange('location', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Garden Type</label>
                <input
                  type="text"
                  value={formData.gardenType}
                  onInput={(e) => handleInputChange('gardenType', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onInput={(e) => handleInputChange('bio', e.target.value)}
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Favorite Plants</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <For each={formData.favoritePlants}>
                    {(plant) => (
                      <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                        {plant}
                        <button
                          onClick={() => removeFavoritePlant(plant)}
                          class="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </For>
                </div>
                <button
                  onClick={addFavoritePlant}
                  class="text-green-600 hover:text-green-800 text-sm"
                >
                  + Add Plant
                </button>
              </div>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                disabled={isLoading()}
                class="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading()}
                class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                <Show when={isLoading()}>
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                </Show>
                {isLoading() ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Show>

        {/* Tabs */}
        <div class="bg-white rounded-lg shadow-md mb-6">
          <div class="border-b">
            <nav class="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('plants')}
                class={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab() === 'plants'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Recent Plants ({profile.recentPlants.length})
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                class={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab() === 'achievements'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Achievements ({profile.achievements.length})
              </button>
            </nav>
          </div>

          <div class="p-6">
            <Show when={activeTab() === 'plants'}>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={profile.recentPlants}>
                  {(plant) => (
                    <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div class="flex items-center space-x-3 mb-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          class="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 class="font-semibold text-gray-900">{plant.name}</h3>
                          <p class="text-sm text-gray-600">{plant.species}</p>
                        </div>
                      </div>
                      <div class="space-y-2">
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Status:</span>
                          <span class={`px-2 py-1 rounded-full text-xs ${getStatusColor(plant.status)}`}>
                            {plant.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Location:</span>
                          <span class="text-sm text-gray-900">{plant.location}</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Planted:</span>
                          <span class="text-sm text-gray-900">{plant.plantedDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>

            <Show when={activeTab() === 'achievements'}>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={profile.achievements}>
                  {(achievement) => (
                    <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div class="flex items-center space-x-3 mb-3">
                        <div class="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 class="font-semibold text-gray-900">{achievement.title}</h3>
                          <span class={`px-2 py-1 rounded-full text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <p class="text-xs text-gray-500">Earned {achievement.earnedDate}</p>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenProfilePage;