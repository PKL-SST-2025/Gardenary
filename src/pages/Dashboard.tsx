import { createSignal, onMount, JSX, onCleanup, Show } from "solid-js";
import watering from "../assets/watering.png"
import paprika from "../assets/paprika.png"
import fertilized from "../assets/fertilized.png"
import profile from "../assets/profile.png"

// Data tugas harian berdasarkan tanggal (format: YYYY-MM-DD)
const taskData: Record<
  string,
  { watering: number; harvest: string; fertilize: number }
> = {
  "2025-07-10": {
    watering: 3,
    harvest: "paprika",
    fertilize: 1,
  },
  "2025-07-11": {
    watering: 1,
    harvest: "",
    fertilize: 0,
  },
};

// Utilitas untuk mendapatkan tanggal hari ini (format YYYY-MM-DD)
function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// Komponen Card (Reusable)
type CardProps = {
  icon?: JSX.Element;
  title?: string;
  value?: string | number;
  imageSrc?: string;
  children?: JSX.Element;
};

function DashboardCard(props: CardProps) {
  return (
    <div class="bg-white rounded-xl shadow-md p-4 text-lg">
  {props.children ? (
    props.children
  ) : (
    <div class="flex items-center gap-4">
      {props.imageSrc && (
        <img
          src={props.imageSrc}
          alt="card"
          class="w-16 h-16 rounded object-cover"
        />
      )}
      {props.icon && <div>{props.icon}</div>}
      <div>
        <p class="text-gray-700">{props.title}</p>
        {props.value !== "" && (
          <h3 class="text-xl font-semibold">{props.value}</h3>
        )}
      </div>
    </div>
  )}
</div>
  );
}

// Komponen Kalender Dummy
function Calendar() {
  return (
  <div class="bg-white rounded-2xl shadow-md p-2 w-90 h-[412px] mt-28">
  <h3 class="text-center text-2xl font-bold mt-6 mb-10">JULY</h3>

  {/* Header Hari */}
  <div class="grid grid-cols-7 text-white text-sm font-medium bg-green-500 rounded-md overflow-hidden">
    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
      <div class="py-2 text-center">{day}</div>
    ))}
  </div>

  {/* Tanggal */}
  <div class="grid grid-cols-7 gap-1 text-center text-sm text-gray-700 mt-2">
    {[...Array(30)].map((_, i) => (
      <div class="py-2">{i + 1}</div>
    ))}
  </div>
</div>

  );
}

// Komponen Utama Dashboard
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;
  const [todayTask, setTodayTask] = createSignal({
    watering: 0,
    harvest: "",
    fertilize: 0,
  });

  onMount(() => {
    const today = getTodayDate();
    const data = taskData[today] || { watering: 0, harvest: "", fertilize: 0 };
    setTodayTask(data);
  });

  console.log("Harvest value:", todayTask().harvest);

  const handleMenuClick = (menu: string) => {
    console.log(`Navigating to ${menu}`);
    // TODO: route or update state
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
    <a href="/dashboard" class="flex items-center gap-2 hover:underline">
      🏠 Dashboard
    </a>
    <a href="/list" class="flex items-center gap-2 hover:underline">
      📋 List
    </a>
    <a href="/add" class="flex items-center gap-2 hover:underline">
      ➕ Add
    </a>
    <a href="/growth" class="flex items-center gap-2 hover:underline">
      📈 Growth
    </a>
  </nav>

  <a
    href="/account"
    class="absolute bottom-4 left-4 text-sm text-gray-600 hover:underline"
  >
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

        {/* Profile Button (kanan atas) */}
          <div class="absolute top-8 right-10 z-50">
            <img
              src={profile}
              alt="Profile"
              class="w-12 h-12 rounded-full cursor-pointer border-2 border-green-500 transition-transform duration-300 hover:scale-105"
              onClick={() => setShowProfileMenu(!showProfileMenu())}
            />
            <Show when={showProfileMenu()}>
              <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <div class="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">
                  Profile
                </div>
                <div class="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer">
                  Settings
                </div>
                <div class="py-2 px-4 text-sm hover:bg-gray-100 cursor-pointer text-red-500">
                  Logout
                </div>
              </div>
            </Show>
          </div>
        </div>

        {/* Isi Dashboard */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kiri */}
          <div class="md:col-span-2 space-y-6">
            <h2 class="text-2xl font-bold ml-4 mt-10">Hello Nayira</h2>
            <p class="text-gray-600 text-xl ml-4">
              Ready to take care of your garden today? 🌱 Let’s grow good things
              together.
            </p>

            <DashboardCard
              title="Plants that need watering today"
              value={todayTask().watering}
              icon={<img src={watering} class="w-40 h-40" />}
            />

              <DashboardCard>
                <div class="flex items-center gap-4">
                  <img src={paprika} class="w-40 h-40 ml-2 mt-2" />
                  <p class="text-gray-800 text-2xl font-bold">
                    Your {todayTask().harvest} is ready!
                  </p>
                </div>
              </DashboardCard>

            <DashboardCard>
              <div class="text-center">
                <p class="text-gray-800 font-semibold text-lg">
                  Plants that need to be fertilized today:{" "}
                  <span class="text-green-600 font-bold">
                    {todayTask().fertilize}
                  </span>
                </p>
                <img src={fertilized} class="h-20 mx-auto mt-2" />
              </div>
            </DashboardCard>
          </div>

          {/* Kalender */}
          <Calendar />
        </div>
      </div>
  );
}
