import { createSignal, onMount, JSX, onCleanup, Show, For } from "solid-js";
import profile from "../assets/profile.png";

export default function ReviewForm() {
  const [rating, setRating] = createSignal(0);
  const [hover, setHover] = createSignal(0);
  const [name1, setName1] = createSignal("");
  const [name2, setName2] = createSignal("");
  const [comment, setComment] = createSignal("");
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);
  let profileRef: HTMLDivElement | undefined;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert(`Rating: ${rating()} - Name1: ${name1()} - Name2: ${name2()} - Comment: ${comment()}`);
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
    <div class="min-h-screen flex justify-center items-center bg-white relative p-6">
      {/* Profile Button */}
      <div class="absolute top-10 ml-80 right-20 z-50" ref={profileRef}>
        <img
          src={profile}
          alt="Profile"
          class="w-16 h-16 rounded-full object-cover border-2 border-green-500 cursor-pointer transition-transform duration-300 hover:scale-105"
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

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        class="max-w-md w-full space-y-4 text-center"
      >
        <h1 class="text-3xl font-bold">ADD YOUR REVIEW</h1>

        <div class="text-left">
          <label class="block font-semibold mb-1">Add your ratings</label>
          <div class="flex space-x-1 text-yellow-500">
            <For each={[1, 2, 3, 4, 5]}>
              {(star) => (
                <span
                  class="cursor-pointer text-xl"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  {hover() >= star || rating() >= star ? "★" : "☆"}
                </span>
              )}
            </For>
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter your name"
          class="w-full border p-2 rounded"
          value={name1()}
          onInput={(e) => setName1(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          class="w-full border p-2 rounded"
          value={name2()}
          onInput={(e) => setName2(e.currentTarget.value)}
        />
        <textarea
          placeholder="Enter your name"
          class="w-full border p-2 rounded h-24"
          value={comment()}
          onInput={(e) => setComment(e.currentTarget.value)}
        />

        <button
          type="submit"
          class="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
