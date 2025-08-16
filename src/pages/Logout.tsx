import { createSignal, type Component } from 'solid-js';
import { A, useNavigate } from "@solidjs/router";

const Logout: Component = () => {
  const navigate = useNavigate();

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [agreed, setAgreed] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleLogin = async () => {
    if (!name() || !email() || !password()) {
      alert("Please fill in all fields");
      return;
    }
    if (!agreed()) {
      alert("You must agree to the terms");
      return;
    }

    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      <style>
        {`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(2deg); }
        }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 5s ease-in-out infinite; }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
        .slow { animation-duration: 3s; }
        `}
      </style>
      
      <div class="min-h-screen relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-100 to-teal-200 animate-gradient-x"></div>
        
        {/* Floating Abstract Elements */}
        <div class="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-40 right-32 w-40 h-40 bg-emerald-300/20 rounded-full blur-2xl animate-bounce slow"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-teal-200/40 rounded-full blur-lg animate-ping slow"></div>

        {/* Vegetable Elements - Realistic and Larger */}
        {/* Tomato */}
        <div class="absolute top-16 right-16 animate-float opacity-30 hover:opacity-60 transition-opacity duration-300">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <defs>
              <radialGradient id="tomatoGrad" cx="40%" cy="30%">
                <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#e74c3c;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#c0392b;stop-opacity:1" />
              </radialGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#27ae60;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1e8449;stop-opacity:1" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="55" rx="25" ry="28" fill="url(#tomatoGrad)"/>
            <path d="M35 25c0-4 2-6 4-6s4 2 4 6c0 2-1 4-2 6" fill="url(#leafGrad)"/>
            <path d="M45 25c0-4 2-6 4-6s4 2 4 6c0 2-1 4-2 6" fill="url(#leafGrad)"/>
            <path d="M55 25c0-4 2-6 4-6s4 2 4 6c0 2-1 4-2 6" fill="url(#leafGrad)"/>
            <ellipse cx="45" cy="45" rx="2" ry="1" fill="#ff8a80" opacity="0.6"/>
            <ellipse cx="55" cy="50" rx="1.5" ry="0.8" fill="#ff8a80" opacity="0.4"/>
          </svg>
        </div>

        {/* Carrot */}
        <div class="absolute bottom-32 left-16 animate-sway opacity-35 hover:opacity-65 transition-opacity duration-300">
          <svg width="100" height="100" viewBox="0 0 80 100" fill="none">
            <defs>
              <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff9500;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ff7700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e65100;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="carrotLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4caf50;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2e7d32;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M40 80L25 25L55 25L40 80Z" fill="url(#carrotGrad)"/>
            <path d="M25 25L20 8L22 8L26 22" fill="url(#carrotLeafGrad)"/>
            <path d="M32 25L30 6L32 6L34 22" fill="url(#carrotLeafGrad)"/>
            <path d="M40 25L40 4L42 4L42 22" fill="url(#carrotLeafGrad)"/>
            <path d="M48 25L48 6L50 6L50 22" fill="url(#carrotLeafGrad)"/>
            <path d="M55 25L58 8L60 8L56 22" fill="url(#carrotLeafGrad)"/>
            <line x1="30" y1="35" x2="50" y2="35" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
            <line x1="32" y1="45" x2="48" y2="45" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
            <line x1="34" y1="55" x2="46" y2="55" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
            <line x1="36" y1="65" x2="44" y2="65" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
          </svg>
        </div>

        {/* Broccoli */}
        <div class="absolute top-1/2 left-8 animate-float-reverse opacity-30 hover:opacity-55 transition-opacity duration-300">
          <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
            <defs>
              <radialGradient id="broccoliGrad" cx="50%" cy="30%">
                <stop offset="0%" style="stop-color:#66bb6a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2e7d32;stop-opacity:1" />
              </radialGradient>
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#8bc34a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#558b2f;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="35" r="12" fill="url(#broccoliGrad)"/>
            <circle cx="35" cy="45" r="10" fill="url(#broccoliGrad)"/>
            <circle cx="65" cy="45" r="10" fill="url(#broccoliGrad)"/>
            <circle cx="42" cy="52" r="8" fill="url(#broccoliGrad)"/>
            <circle cx="58" cy="52" r="8" fill="url(#broccoliGrad)"/>
            <circle cx="50" cy="58" r="6" fill="url(#broccoliGrad)"/>
            <rect x="47" y="58" width="6" height="25" fill="url(#stemGrad)" rx="3"/>
            <circle cx="45" cy="40" r="3" fill="#4caf50" opacity="0.8"/>
            <circle cx="55" cy="38" r="2.5" fill="#4caf50" opacity="0.6"/>
            <circle cx="38" cy="48" r="2" fill="#4caf50" opacity="0.7"/>
            <circle cx="62" cy="48" r="2.5" fill="#4caf50" opacity="0.6"/>
          </svg>
        </div>

        {/* Bell Pepper */}
        <div class="absolute bottom-20 right-20 animate-float opacity-35 hover:opacity-65 transition-opacity duration-300">
          <svg width="90" height="90" viewBox="0 0 80 100" fill="none">
            <defs>
              <linearGradient id="pepperGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd54f;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffb300;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ff8f00;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="pepperStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4caf50;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#388e3c;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M25 25C25 15 30 8 40 8C50 8 55 15 55 25V70C55 85 45 90 40 90C35 90 25 85 25 70V25Z" fill="url(#pepperGrad)"/>
            <ellipse cx="40" cy="8" rx="8" ry="4" fill="url(#pepperStemGrad)"/>
            <path d="M35 8L38 2L42 2L45 8" fill="url(#pepperStemGrad)"/>
            <ellipse cx="35" cy="45" rx="2" ry="3" fill="#ffe082" opacity="0.6"/>
            <ellipse cx="45" cy="35" rx="1.5" ry="2" fill="#ffe082" opacity="0.5"/>
            <ellipse cx="40" cy="60" rx="2" ry="2.5" fill="#ffe082" opacity="0.4"/>
          </svg>
        </div>

        {/* Eggplant */}
        <div class="absolute top-1/4 right-1/3 animate-sway opacity-30 hover:opacity-55 transition-opacity duration-300">
          <svg width="80" height="80" viewBox="0 0 60 100" fill="none">
            <defs>
              <linearGradient id="eggplantGrad" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" style="stop-color:#9c27b0;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#7b1fa2;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4a148c;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="eggplantCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#66bb6a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#388e3c;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M30 15C20 15 15 20 15 30V70C15 85 20 90 30 90C40 90 45 85 45 70V30C45 20 40 15 30 15Z" fill="url(#eggplantGrad)"/>
            <ellipse cx="30" cy="15" rx="10" ry="5" fill="url(#eggplantCapGrad)"/>
            <path d="M25 15L28 5L32 5L35 15" fill="url(#eggplantCapGrad)"/>
            <ellipse cx="30" cy="35" rx="1.5" ry="2" fill="#ba68c8" opacity="0.4"/>
            <ellipse cx="25" cy="50" rx="1" ry="1.5" fill="#ba68c8" opacity="0.3"/>
            <ellipse cx="35" cy="45" rx="1.2" ry="1.8" fill="#ba68c8" opacity="0.3"/>
          </svg>
        </div>

        {/* Corn */}
        <div class="absolute top-3/4 left-1/4 animate-float-reverse opacity-35 hover:opacity-65 transition-opacity duration-300">
          <svg width="70" height="70" viewBox="0 0 50 100" fill="none">
            <defs>
              <linearGradient id="cornGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#fff176;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffeb3b;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#fbc02d;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="cornHuskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#8bc34a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#689f38;stop-opacity:1" />
              </linearGradient>
            </defs>
            <ellipse cx="25" cy="50" rx="8" ry="30" fill="url(#cornGrad)"/>
            <path d="M20 20L22 5M25 20L25 3M28 20L28 5M30 20L32 5" stroke="url(#cornHuskGrad)" stroke-width="2" stroke-linecap="round"/>
            <g opacity="0.6">
              <circle cx="22" cy="35" r="1.5" fill="#ff9800"/>
              <circle cx="28" cy="37" r="1.5" fill="#ff9800"/>
              <circle cx="22" cy="42" r="1.5" fill="#ff9800"/>
              <circle cx="28" cy="44" r="1.5" fill="#ff9800"/>
              <circle cx="22" cy="49" r="1.5" fill="#ff9800"/>
              <circle cx="28" cy="51" r="1.5" fill="#ff9800"/>
              <circle cx="22" cy="56" r="1.5" fill="#ff9800"/>
              <circle cx="28" cy="58" r="1.5" fill="#ff9800"/>
              <circle cx="22" cy="63" r="1.5" fill="#ff9800"/>
              <circle cx="28" cy="65" r="1.5" fill="#ff9800"/>
            </g>
          </svg>
        </div>

        {/* Lettuce */}
        <div class="absolute top-10 left-1/3 animate-float opacity-30 hover:opacity-55 transition-opacity duration-300">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <defs>
              <radialGradient id="lettuceGrad" cx="50%" cy="50%">
                <stop offset="0%" style="stop-color:#c8e6c9;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#81c784;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4caf50;stop-opacity:1" />
              </radialGradient>
            </defs>
            <path d="M50 15C30 15 20 25 20 40C20 50 25 60 30 68C35 75 40 80 50 80C60 80 65 75 70 68C75 60 80 50 80 40C80 25 70 15 50 15Z" fill="url(#lettuceGrad)"/>
            <path d="M30 35C30 25 35 20 50 20C65 20 70 25 70 35" stroke="#66bb6a" stroke-width="1.5" fill="none" opacity="0.8"/>
            <path d="M35 50C35 40 40 35 50 35C60 35 65 40 65 50" stroke="#66bb6a" stroke-width="1.2" fill="none" opacity="0.6"/>
            <path d="M40 60C40 55 45 50 50 50C55 50 60 55 60 60" stroke="#66bb6a" stroke-width="1" fill="none" opacity="0.4"/>
            <ellipse cx="45" cy="45" rx="2" ry="3" fill="#a5d6a7" opacity="0.5"/>
            <ellipse cx="55" cy="40" rx="1.5" ry="2" fill="#a5d6a7" opacity="0.4"/>
          </svg>
        </div>

        {/* Pumpkin */}
        <div class="absolute bottom-1/4 right-1/4 animate-sway opacity-35 hover:opacity-65 transition-opacity duration-300">
          <svg width="110" height="110" viewBox="0 0 120 100" fill="none">
            <defs>
              <radialGradient id="pumpkinGrad" cx="40%" cy="30%">
                <stop offset="0%" style="stop-color:#ffab40;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#ff9800;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ef6c00;stop-opacity:1" />
              </radialGradient>
              <linearGradient id="pumpkinStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#8d6e63;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#5d4037;stop-opacity:1" />
              </linearGradient>
            </defs>
            <ellipse cx="60" cy="55" rx="35" ry="25" fill="url(#pumpkinGrad)"/>
            <path d="M60 30C60 25 65 20 70 20C75 20 80 25 80 30" fill="url(#pumpkinStemGrad)"/>
            <line x1="30" y1="55" x2="90" y2="55" stroke="#ef6c00" stroke-width="1" opacity="0.3"/>
            <line x1="35" y1="45" x2="85" y2="45" stroke="#ef6c00" stroke-width="1" opacity="0.3"/>
            <line x1="35" y1="65" x2="85" y2="65" stroke="#ef6c00" stroke-width="1" opacity="0.3"/>
            <path d="M45 35C45 30 48 28 60 28C72 28 75 30 75 35" stroke="#ef6c00" stroke-width="0.8" fill="none" opacity="0.4"/>
            <path d="M40 55C40 40 45 35 60 35C75 35 80 40 80 55" stroke="#ef6c00" stroke-width="0.8" fill="none" opacity="0.4"/>
            <path d="M40 55C40 70 45 75 60 75C75 75 80 70 80 55" stroke="#ef6c00" stroke-width="0.8" fill="none" opacity="0.4"/>
          </svg>
        </div>

        {/* Radish */}
        <div class="absolute top-2/3 right-12 animate-float-reverse opacity-30 hover:opacity-55 transition-opacity duration-300">
          <svg width="70" height="70" viewBox="0 0 60 100" fill="none">
            <defs>
              <radialGradient id="radishGrad" cx="40%" cy="30%">
                <stop offset="0%" style="stop-color:#ffcdd2;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#f48fb1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e91e63;stop-opacity:1" />
              </radialGradient>
              <linearGradient id="radishLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#66bb6a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#388e3c;stop-opacity:1" />
              </linearGradient>
            </defs>
            <ellipse cx="30" cy="70" rx="12" ry="18" fill="url(#radishGrad)"/>
            <path d="M25 52L22 25M30 52L30 20M35 52L38 25" stroke="url(#radishLeafGrad)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M20 25L18 15M30 20L30 10M40 25L42 15" stroke="url(#radishLeafGrad)" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
            <ellipse cx="30" cy="60" rx="2" ry="3" fill="#f8bbd9" opacity="0.6"/>
            <ellipse cx="25" cy="75" rx="1.5" ry="2" fill="#f8bbd9" opacity="0.4"/>
          </svg>
        </div>

        <div class="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div class="w-full max-w-lg">
            {/* Glassmorphism Card */}
            <div class="relative backdrop-blur-lg bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition duration-300">
              {/* Animated border glow */}
              <div class="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-3xl opacity-20 blur-sm animate-pulse"></div>
              
              <div class="relative z-10">
                {/* Header with animation */}
                <div class="text-center mb-8 animate-fade-in-down">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h2 class="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    SEE YOU!
                  </h2>
                  <p class="text-gray-600 mt-2 font-medium">Logout to leave at you account</p>
                </div>

                {/* Form with enhanced styling */}
                <div class="space-y-6 animate-fade-in-up">
                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="text"
                      placeholder="Enter your name"
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="email"
                      placeholder="Enter your email"
                      value={email()}
                      onInput={(e) => setEmail(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="password"
                      placeholder="Enter your password"
                      value={password()}
                      onInput={(e) => setPassword(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  {/* Enhanced Checkbox */}
                  <div class="flex items-center group cursor-pointer">
                    <div class="relative">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreed()}
                        onInput={(e) => setAgreed((e.target as HTMLInputElement).checked)}
                        class="sr-only"
                      />
                      <div class={`w-6 h-6 rounded-lg border-2 transition duration-300 flex items-center justify-center ${
                        agreed() 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 shadow-lg' 
                          : 'border-gray-300 bg-white group-hover:border-green-400'
                      }`}>
                        {agreed() && (
                          <svg class="w-4 h-4 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <label for="agree" class="ml-3 text-gray-700 font-medium select-none cursor-pointer group-hover:text-green-700 transition duration-300">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {/* Enhanced Button */}
                  <button
                    class={`relative w-full py-4 rounded-xl font-bold text-lg transition duration-300 overflow-hidden ${
                      agreed()
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-2xl hover:shadow-green-500/25 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!agreed() || isLoading()}
                    onClick={handleLogin}
                  >
                    {/* Button ripple effect */}
                    <div class="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span class="relative z-10 flex items-center justify-center">
                      {isLoading() ? (
                        <>
                          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Logout
                          <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;