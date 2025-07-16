import { createSignal, onMount, onCleanup, Show, type Component } from "solid-js";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import profile from "../assets/profile.png";

const GrowthChart: Component = () => {
  onMount(() => {
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, { layout: root.verticalLayout })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Growth",
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "month",
        fill: am5.color(0x006400),
      })
    );

    const data = [
      { month: "JAN", value: 100000 },
      { month: "FEB", value: 250000 },
      { month: "MAR", value: 400000 },
      { month: "APR", value: 550000 },
      { month: "MAY", value: 600000 },
      { month: "JUN", value: 500000 },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    onCleanup(() => root.dispose());
  });

  return <div id="chartdiv" class="w-full h-[300px]" />;
};

const PlantTable: Component = () => {
  const columnDefs = [
    { headerName: "No", field: "no", width: 100 },
    { headerName: "Plant", field: "plant" },
    { headerName: "Harvest", field: "harvest" },
  ];

  const rowData = [
    { no: 1, plant: "Tomato", harvest: "May" },
    { no: 2, plant: "Cucumber", harvest: "June" },
  ];

  return (
    <div class="ag-theme-alpine w-full h-[200px] mt-4">
      <AgGridSolid rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

const GrowthPage: Component = () => {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;

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
          <a href="/add" class="flex items-center gap-2 hover:underline">➕ Add</a>
          <a href="/growth" class="flex items-center gap-2 hover:underline font-bold text-green-800">📈 Growth</a>
        </nav>
        <a href="/account" class="absolute bottom-4 left-4 text-sm text-gray-600 hover:underline">
          Manage Account
        </a>
      </div>

      {/* Main Content */}
      <div
        class={`flex-1 transition-all duration-300 p-4 md:p-6 overflow-y-auto max-h-screen ${
          sidebarOpen() ? "ml-64" : "ml-0"
        }`}
      >
        {/* Toggle Button (mobile) */}
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

        <div class="mt-4">
          <h2 class="text-2xl font-bold mb-6">Plant Growth</h2>

          <section class="bg-white rounded-xl shadow p-4">
            <h3 class="font-semibold text-sm text-gray-600 mb-2">Statistics</h3>
            <div class="flex justify-between items-center mb-2">
              <span class="text-lg font-bold">Growing</span>
              <select class="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Last 6 months</option>
              </select>
            </div>
            <GrowthChart />
          </section>

          <section class="mt-6 bg-white rounded-xl shadow p-4">
            <h3 class="text-lg font-semibold mb-2">Your Plant</h3>
            <PlantTable />
          </section>
        </div>
      </div>
    </div>
  );
};

export default GrowthPage;
