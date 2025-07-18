import { createSignal, onMount, onCleanup, Show } from "solid-js";
import { plants, setPlants } from "../data/plantstore";
import { createPlant } from "../data/plantFactory";
import profile from "../assets/profile.png";

export default function AddPlant() {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;

  const [name, setName] = createSignal("");
  const [type, setType] = createSignal("Vegetable");
  const [imageData, setImageData] = createSignal<string | undefined>();

  // Handle upload gambar
  const handleImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Simpan data tanaman baru
  const handleSave = () => {
    if (!name().trim()) return alert("Name required");

    const newPlant = createPlant(name(), type(), imageData());
    setPlants((prev) => [...prev, newPlant]);

    setName("");
    setImageData(undefined);
    alert("Plant added!");
  };

  // Tutup menu profil kalau klik di luar
  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef && !profileRef.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  return (
    <div class="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <div
        class={`fixed z-40 top-0 left-0 h-screen overflow-y-auto transition-transform duration-300 bg-lime-100 w-48 p-4 ${
          sidebarOpen() ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:sticky md:top-0`}
      >
        <a href="/" class="font-bold border-b pb-2 block text-xl text-green-900">
          Gardenary
        </a>
        <nav class="space-y-2 text-green-900 mt-4">
          <a href="/dashboard" class="flex items-center gap-2 hover:underline">🏠 Dashboard</a>
          <a href="/list" class="flex items-center gap-2 hover:underline">📋 List</a>
          <a href="/add" class="flex items-center gap-2 hover:underline font-bold text-green-800">➕ Add</a>
          <a href="/growth" class="flex items-center gap-2 hover:underline">📈 Growth</a>
        </nav>
        <a href="/account" class="absolute bottom-4 left-4 text-sm text-gray-600 hover:underline">
          Manage Account
        </a>
      </div>

      {/* Konten Utama */}
      <div class={`flex-1 transition-all duration-300 p-4 md:p-6 overflow-y-auto max-h-screen ${sidebarOpen() ? "ml-64" : "ml-0"}`}>
        {/* Tombol menu (mobile) */}
        <button
          class="md:hidden mb-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen())}
        >
          {sidebarOpen() ? "Close" : "Menu"}
        </button>

        {/* Tombol profil */}
        <div class="absolute top-8 right-10 z-50" ref={profileRef}>
          <img
            src={profile}
            alt="Profile"
            class="w-12 h-12 rounded-full cursor-pointer border-2 border-green-500 transition-transform duration-300 hover:scale-105"
            onClick={() => setShowProfileMenu(!showProfileMenu())}
          />
          <Show when={showProfileMenu()}>
            <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <a href="/profile" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">Profile</a>
              <a href="/settings" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">Settings</a>
              <a href="/logout" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer text-red-500">Logout</a>
            </div>
          </Show>
        </div>

        {/* Form Tambah Tanaman */}
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-6 text-center">Create your new plants</h2>
          <div class="flex flex-col md:flex-row gap-8 justify-center items-start">
            {/* Form Input */}
            <div class="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter name your plant"
                class="border px-4 py-2 rounded w-72"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
              />
              <select
                class="border px-4 py-2 rounded w-72"
                value={type()}
                onInput={(e) => setType(e.currentTarget.value)}
              >
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Herb">Herb</option>
              </select>
              <button
                class="bg-green-700 text-white px-8 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>

            {/* Upload Gambar */}
            <div class="bg-gray-200 w-40 h-40 flex items-center justify-center rounded shadow">
              <label class="cursor-pointer text-green-800 text-center px-2">
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  onChange={handleImageUpload}
                />
                Upload picture
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
