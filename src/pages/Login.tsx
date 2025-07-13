import { createSignal, type Component } from 'solid-js';
import cucumberImage from '../assets/cucumberbackground.png';
import { useNavigate } from "@solidjs/router";

const Login: Component = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = createSignal(false);

  return (
    <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Kiri: Gambar */}
      <div class="relative hidden md:block h-fit">
        <img
          src={cucumberImage}
          alt="Garden background"
          class="w-7xl h-screen object-cover"
        />
      </div>

      {/* Kanan: Form */}
      <div class="flex items-center justify-center bg-white p-8 pr-48">
        <div class="w-full max-w-md space-y-4">
          <h2 class="text-3xl font-bold mb-2">Get Started</h2>
          <p class="text-gray-600 mb-6">Create your Gardenary account :</p>

          <div class="space-y-4">
            <input class="input" type="text" placeholder="Enter your name" />
            <input class="input" type="email" placeholder="Enter your email" />
          </div>

          <div class="mt-4 flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agreed()}
              onInput={(e) => setAgreed((e.target as HTMLInputElement).checked)}
              class="mr-2"
            />
            <label for="agree" class="text-sm text-gray-700">I agree to the terms</label>
          </div>

          <button
            class="w-full bg-green-800 hover:bg-green-700 text-white py-2 rounded mt-6 transition"
            onClick={() => {
              if (agreed()) {
                // bisa isi logika validasi di sini
                navigate("/dashboard");
              }
            }}
          >
            Login
          </button>

          <p class="text-sm text-center mt-4">
            Don't have account?
            <a href="/signup" class="text-green-700 ml-1 hover:underline">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
