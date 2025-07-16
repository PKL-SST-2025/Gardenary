import { createSignal, createMemo, Show, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import avatar from '../assets/footer.png';

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  followers: number;
  following: number;
  posts: number;
}

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  website: string;
}

// Mock data
const mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: avatar,
  bio: 'Full-stack developer passionate about web technologies and open source.',
  location: 'Jakarta, Indonesia',
  website: 'https://johndoe.dev',
  joinDate: 'January 2023',
  followers: 1234,
  following: 567,
  posts: 89
};

const ProfilePage = () => {
  // State management
  const [user, setUser] = createStore<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [formData, setFormData] = createStore<ProfileFormData>({
    name: user.name,
    bio: user.bio,
    location: user.location,
    website: user.website
  });

  // Computed values
  const displayStats = createMemo(() => [
    { label: 'Posts', value: user.posts.toLocaleString() },
    { label: 'Followers', value: user.followers.toLocaleString() },
    { label: 'Following', value: user.following.toLocaleString() }
  ]);

  // Event handlers
  const handleEdit = () => {
    setFormData({
      name: user.name,
      bio: user.bio,
      location: user.location,
      website: user.website
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
    
    setUser({
      ...user,
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      website: formData.website
    });
    
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(field, value);
  };

  const handleAvatarChange = () => {
    // Simulate avatar change
    const newAvatar = avatar;
    setUser('avatar', newAvatar);
  };

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div class="relative">
              <img
                src={user.avatar}
                alt={user.name}
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={handleAvatarChange}
                class="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                title="Change avatar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div class="flex-1 text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h1 class="text-2xl font-bold text-gray-900">{user.name}</h1>
                <Show when={!isEditing()}>
                  <button
                    onClick={handleEdit}
                    class="mt-2 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                </Show>
              </div>
              
              <p class="text-gray-600 mb-2">{user.email}</p>
              <p class="text-gray-700 mb-3">{user.bio}</p>
              
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <Show when={user.location}>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                </Show>
                
                <Show when={user.website}>
                  <a href={user.website} target="_blank" rel="noopener noreferrer" class="flex items-center text-blue-500 hover:text-blue-600">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Website
                  </a>
                </Show>
                
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {user.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div class="mt-6 border-t pt-6">
            <div class="flex justify-center md:justify-start space-x-8">
              <For each={displayStats()}>
                {(stat) => (
                  <div class="text-center">
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
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onInput={(e) => handleInputChange('name', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onInput={(e) => handleInputChange('bio', e.target.value)}
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onInput={(e) => handleInputChange('location', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onInput={(e) => handleInputChange('website', e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                <Show when={isLoading()}>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </Show>
                {isLoading() ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default ProfilePage;