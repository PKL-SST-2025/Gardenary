import { createSignal, onMount, JSX, onCleanup, Show } from "solid-js";
import { plants, setPlants } from "../data/plantstore";
import type { Plant } from "../data/plant";
import paprika from "../assets/paprika.png";
import profile from "../assets/profile.png";
import { getTodayDate } from "../data/date";

const initialPlants: Plant[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Paprika",
  type: "Vegetable",
  age: 110,
  image: paprika,
  status: {
    [getTodayDate()]: {
      watered: false,
      fertilized: false,
      harvested: false,
    },
  },
}));

export default function YourPlants() {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;

  const toggleStatus = (plantId: number, field: keyof Plant["status"][string]) => {
    const today = getTodayDate();
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plantId
          ? {
              ...p,
              status: {
                ...p.status,
                [today]: {
                  ...p.status[today],
                  [field]: !p.status[today][field],
                },
              },
            }
          : p
      )
    );
  };

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
          <a href="/list" class="flex items-center gap-2 hover:underline font-bold text-green-800">📋 List</a>
          <a href="/add" class="flex items-center gap-2 hover:underline">➕ Add</a>
          <a href="/growth" class="flex items-center gap-2 hover:underline">📈 Growth</a>
        </nav>
        <a href="/account" class="absolute bottom-4 left-4 text-sm text-gray-600 hover:underline">
          Manage Account
        </a>
      </div>

      {/* Konten Utama */}
      <div
        class={`flex-1 transition-all duration-300 p-4 md:p-6 overflow-y-auto max-h-screen ${
          sidebarOpen() ? "ml-64" : "ml-0"
        }`}
      >
        {/* Tombol toggle (mobile) */}
        <button
          class="md:hidden mb-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen())}
        >
          {sidebarOpen() ? "Close" : "Menu"}
        </button>

        {/* Profile Button */}
        <div class="absolute top-8 right-10 z-50" ref={profileRef}>
          <img
            src={profile}
            alt="Profile"
            class="w-12 h-12 rounded-full cursor-pointer border-2 border-green-500 transition-transform duration-300 hover:scale-105"
            onClick={() => setShowProfileMenu(!showProfileMenu())}
          />
          <Show when={showProfileMenu()}>
              <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <a href="/profile" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">
                  Profile
                </a>
                <a href="/settings" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">
                  Settings
                </a>
                <a href="/logout" class="block py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer text-red-500">
                  Logout
                </a>
              </div>
            </Show>
        </div>

        {/* Plant List */}
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-6">Your Plants</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants().map((plant) => {
              const today = getTodayDate();
              const todayStatus = plant.status[today] || {
                watered: false,
                fertilized: false,
                harvested: false,
              };
              return (
                <div class="flex bg-white rounded-lg shadow p-4 gap-4 items-center">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    class="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <p><strong>Name</strong> : {plant.name}</p>
                    <p><strong>Type</strong> : {plant.type}</p>
                    <p><strong>Age</strong> : {plant.age} days</p>
                    <p class="mt-2"><strong>Last status :</strong></p>
                    <div class="text-sm space-y-1 mt-1">
                      <label class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={todayStatus.watered}
                          onChange={() => toggleStatus(plant.id, "watered")}
                        />
                        {todayStatus.watered ? "Sudah disiram" : "Belum disiram"}
                      </label>
                      <label class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={todayStatus.fertilized}
                          onChange={() => toggleStatus(plant.id, "fertilized")}
                        />
                        Dipupuk
                      </label>
                      <label class="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={todayStatus.harvested}
                          onChange={() => toggleStatus(plant.id, "harvested")}
                        />
                        Siap panen
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
