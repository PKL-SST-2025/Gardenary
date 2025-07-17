import { createSignal, onMount, onCleanup, Show } from "solid-js";
import wateringImg from "../assets/watering.png";
import paprikaImg from "../assets/paprika.png";
import fertilizedImg from "../assets/fertilized.png";
import profile from "../assets/profile.png";
import { plants } from "../data/plantstore";
import { getTodayDate } from "../data/date";
import type { Plant } from "../data/plant";
import { selectedDate, setSelectedDate } from "../data/calendarStore";


// Komponen Card
function Card(props: { image: string; title: string; value: number | string; active: boolean; imageBelow?: boolean }) {
  return (
    <div
      class={`p-4 h-auto bg-white rounded-xl shadow-md transition-transform hover:scale-[1.01]
        ${props.imageBelow ? "flex flex-col items-center text-center gap-2" : "flex items-center gap-4"}
        ${props.active ? "border-green-500 border-l-4" : "opacity-60"}`}
    >
      {props.imageBelow ? (
        <>
          <div>
            <h3 class="text-lg font-semibold">{props.title}</h3>
            <Show when={typeof props.value === "number" && props.value > 0}>
              <p class="text-green-600 font-bold text-lg">: {props.value}</p>
            </Show>
            <Show when={typeof props.value === "string"}>
              <p class="text-sm text-gray-700">{props.value}</p>
            </Show>
          </div>
          <img src={props.image} alt="card-img" class="w-28 h-28 md:w-80 md:h-24 object-contain" />
        </>
      ) : (
        <>
          <img src={props.image} alt="card-img" class="w-24 h-24 object-contain" />
          <div>
            <h3 class="text-lg font-semibold">{props.title}</h3>
            <Show when={typeof props.value === "number" && props.value > 0}>
              <p class="text-green-600 font-bold text-lg">: {props.value}</p>
            </Show>
            <Show when={typeof props.value === "string"}>
              <p class="text-sm text-gray-700">{props.value}</p>
            </Show>
          </div>
        </>
      )}
    </div>
  );
}




// Komponen Kalender
function Calendar() {
  return (
    <div class="bg-white p-4 rounded-xl shadow-md w-full md:w-[300px]">
      <h3 class="font-bold text-center mb-2">JULY</h3>
      <div class="grid grid-cols-7 gap-2 text-sm text-center">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div class="font-medium text-green-700">{d}</div>
        ))}
        {Array.from({ length: 30 }).map((_, i) => {
        const day = i + 1;
        const dateStr = `2025-07-${String(day).padStart(2, "0")}`;
        const isSelected = selectedDate() === dateStr;

        return (
        <div
      class={`py-1 rounded-full cursor-pointer hover:bg-green-200 transition ${
        isSelected ? "bg-green-500 text-white font-bold" : ""
      }`}
      onClick={() => setSelectedDate(dateStr)}
    >
      {day}
    </div>
  );
})}
      </div>
      <ul class="mt-4 space-y-1 text-sm text-gray-700">
        <li class="flex justify-between items-center"><span>🟢 Water</span><span>30min.</span></li>
        <li class="flex justify-between items-center"><span>🟢 Fertilize</span><span>60min.</span></li>
        <li class="flex justify-between items-center"><span>🟢 Harvest</span><span>30min.</span></li>
        <li class="flex justify-between items-center"><span>🟢 Prune</span><span>15min.</span></li>
      </ul>
    </div>
  );
}

// Komponen Utama Dashboard
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;

  const [wateringCount] = createSignal(3);
  const [fertilizeCount] = createSignal(1);

  // Tutup dropdown jika klik di luar area
  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef && !profileRef.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  const today = getTodayDate();

  const unwateredCount = () =>
  plants().filter((plant: Plant) => !plant.status?.[today]?.watered).length;

  const unfertilizedCount = () =>
  plants().filter((plant: Plant) => !plant.status?.[today]?.fertilized).length;

  const unharvestedCount = () =>
  plants().filter((plant: Plant) => !plant.status?.[today]?.harvested).length;

  const hasHarvestReadyPlants = () =>
  plants().some((plant: Plant) => {
    const status = plant.status?.[today];


    return status?.watered && status?.fertilized && !status?.harvested;
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
          <a href="/dashboard" class="flex items-center gap-2 hover:underline font-bold text-green-800">🏠 Dashboard</a>
          <a href="/list" class="flex items-center gap-2 hover:underline">📋 List</a>
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
        {/* Tombol toggle sidebar (mobile) */}
        <button
          class="md:hidden mb-4 bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen())}
        >
          {sidebarOpen() ? "Close" : "Menu"}
        </button>

        {/* Profile */}
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

        {/* Heading */}
        <div class="flex justify-between items-center mb-10 mt-4">
          <div>
            <h1 class="text-2xl font-bold mb-2 ml-4">Hello Nayira</h1>
            <p class="text-sm text-gray-700 ml-4">
              Ready to take care of your garden today? 🌱 Let's grow good things together.
            </p>
          </div>
        </div>

        {/* Konten Grid: Card kiri, Kalender kanan */}
        <div class="flex flex-col md:flex-row gap-6">
          {/* Kolom Card (kiri) */}
          <div class="flex flex-col space-y-4 flex-1">
            <Card
              image={wateringImg}
              title="Plants that need watering today"
              value={unwateredCount()}
              active={unwateredCount()  > 0}
            />
            <Card
              image={paprikaImg}
              title={
              hasHarvestReadyPlants()
              ? "🎉 You have plants ready to harvest today!"
              : "No harvest-ready plants yet"
              }
              value=""
              active={hasHarvestReadyPlants()}
            />

            <Card
              image={fertilizedImg}
              title="Plants that need to be fertilized today"
              value={unfertilizedCount()}
              active={unfertilizedCount() > 0}
              imageBelow={true}
            />
          </div>

          {/* Kalender (kanan) */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};
