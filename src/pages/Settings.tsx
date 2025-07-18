import { createSignal, createEffect } from 'solid-js';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  favoriteGardenType: 'indoor' | 'outdoor' | 'both';
}

interface NotificationSettings {
  wateringReminders: boolean;
  fertilizingReminders: boolean;
  harvestReminders: boolean;
  weeklyTips: boolean;
  diseaseAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface AppSettings {
  units: 'metric' | 'imperial';
  language: 'id' | 'en';
  theme: 'light' | 'dark' | 'auto';
  autoBackup: boolean;
  privateProfile: boolean;
}

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = createSignal<'profile' | 'notifications' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = createSignal(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = createSignal(false);

  const [profile, setProfile] = createSignal<UserProfile>({
    name: 'Sari Indah',
    email: 'sari.indah@example.com',
    phone: '+62 812 3456 7890',
    location: 'Purwokerto, Jawa Tengah',
    bio: 'Pecinta tanaman hias dan sayuran organik. Sudah berkebun selama 5 tahun.',
    avatar: '/api/placeholder/120/120',
    experience: 'intermediate',
    favoriteGardenType: 'both'
  });

  const [notifications, setNotifications] = createSignal<NotificationSettings>({
    wateringReminders: true,
    fertilizingReminders: true,
    harvestReminders: true,
    weeklyTips: true,
    diseaseAlerts: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const [appSettings, setAppSettings] = createSignal<AppSettings>({
    units: 'metric',
    language: 'id',
    theme: 'light',
    autoBackup: true,
    privateProfile: false
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleAppSettingChange = (setting: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div class="max-w-4xl mx-auto">
        {/* Header */}
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Pengaturan Profil</h1>
          <p class="text-gray-600">Kelola profil dan preferensi aplikasi Garden Anda</p>
        </div>

        {/* Save Confirmation */}
        {showSaveConfirmation() && (
          <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Pengaturan berhasil disimpan!
          </div>
        )}

        {/* Tab Navigation */}
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <div class="flex border-b border-gray-200">
            <button
              class={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab() === 'profile' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profil
              </div>
            </button>
            <button
              class={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab() === 'notifications' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Notifikasi
              </div>
            </button>
            <button
              class={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab() === 'preferences' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('preferences')}
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Preferensi
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div class="bg-white rounded-lg shadow-sm">
          {/* Profile Tab */}
          {activeTab() === 'profile' && (
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Informasi Profil</h2>
                <button
                  class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isEditing() 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => isEditing() ? handleSave() : setIsEditing(true)}
                >
                  {isEditing() ? 'Simpan' : 'Edit Profil'}
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar */}
                <div class="md:col-span-2 flex items-center space-x-4">
                  <img 
                    src={profile().avatar} 
                    alt="Profile Avatar" 
                    class="w-20 h-20 rounded-full object-cover border-4 border-green-100"
                  />
                  {isEditing() && (
                    <button class="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      Ganti Foto
                    </button>
                  )}
                </div>

                {/* Form Fields */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profile().name}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onInput={(e) => handleProfileChange('name', e.target.value)}
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile().email}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onInput={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={profile().phone}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onInput={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={profile().location}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onInput={(e) => handleProfileChange('location', e.target.value)}
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tingkat Pengalaman</label>
                  <select
                    value={profile().experience}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onChange={(e) => handleProfileChange('experience', e.target.value as any)}
                  >
                    <option value="beginner">Pemula</option>
                    <option value="intermediate">Menengah</option>
                    <option value="expert">Ahli</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kebun Favorit</label>
                  <select
                    value={profile().favoriteGardenType}
                    disabled={!isEditing()}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onChange={(e) => handleProfileChange('favoriteGardenType', e.target.value as any)}
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="both">Keduanya</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profile().bio}
                    disabled={!isEditing()}
                    rows={3}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    onInput={(e) => handleProfileChange('bio', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab() === 'notifications' && (
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">Pengaturan Notifikasi</h2>
              
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-700 mb-4">Pengingat Perawatan</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Pengingat Penyiraman</h4>
                        <p class="text-sm text-gray-600">Dapatkan notifikasi saat tanaman perlu disiram</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().wateringReminders}
                          onChange={() => handleNotificationToggle('wateringReminders')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Pengingat Pemupukan</h4>
                        <p class="text-sm text-gray-600">Notifikasi jadwal pemupukan tanaman</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().fertilizingReminders}
                          onChange={() => handleNotificationToggle('fertilizingReminders')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Pengingat Panen</h4>
                        <p class="text-sm text-gray-600">Dapatkan notifikasi saat tanaman siap dipanen</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().harvestReminders}
                          onChange={() => handleNotificationToggle('harvestReminders')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-700 mb-4">Konten & Informasi</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Tips Mingguan</h4>
                        <p class="text-sm text-gray-600">Terima tips berkebun setiap minggu</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().weeklyTips}
                          onChange={() => handleNotificationToggle('weeklyTips')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Peringatan Penyakit</h4>
                        <p class="text-sm text-gray-600">Notifikasi jika terdeteksi tanda-tanda penyakit tanaman</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().diseaseAlerts}
                          onChange={() => handleNotificationToggle('diseaseAlerts')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-700 mb-4">Metode Pengiriman</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Notifikasi Email</h4>
                        <p class="text-sm text-gray-600">Terima notifikasi melalui email</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().emailNotifications}
                          onChange={() => handleNotificationToggle('emailNotifications')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-800">Notifikasi Push</h4>
                        <p class="text-sm text-gray-600">Terima notifikasi langsung di perangkat</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          class="sr-only peer"
                          checked={notifications().pushNotifications}
                          onChange={() => handleNotificationToggle('pushNotifications')}
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab() === 'preferences' && (
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">Preferensi Aplikasi</h2>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Satuan Ukuran</label>
                  <select
                    value={appSettings().units}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => handleAppSettingChange('units', e.target.value)}
                  >
                    <option value="metric">Metrik (cm, kg, °C)</option>
                    <option value="imperial">Imperial (inch, lb, °F)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bahasa</label>
                  <select
                    value={appSettings().language}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => handleAppSettingChange('language', e.target.value)}
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tema Aplikasi</label>
                  <select
                    value={appSettings().theme}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => handleAppSettingChange('theme', e.target.value)}
                  >
                    <option value="light">Terang</option>
                    <option value="dark">Gelap</option>
                    <option value="auto">Otomatis</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-800">Backup Otomatis</h4>
                    <p class="text-sm text-gray-600">Secara otomatis backup data ke cloud</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked={appSettings().autoBackup}
                      onChange={() => handleAppSettingChange('autoBackup', !appSettings().autoBackup)}
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-800">Profil Privat</h4>
                    <p class="text-sm text-gray-600">Sembunyikan profil dari pengguna lain</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked={appSettings().privateProfile}
                      onChange={() => handleAppSettingChange('privateProfile', !appSettings().privateProfile)}
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-medium text-gray-700 mb-4">Aksi Akun</h3>
                <div class="space-y-3">
                  <button class="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Data
                  </button>
                  <button class="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-0 md:ml-3">
                    Hapus Akun
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div class="mt-8 text-center text-gray-500 text-sm">
          <p>Garden App v1.0 • Dibuat dengan ❤️ untuk para pencinta tanaman</p>
        </div>
      </div>
    </div>
  );
}