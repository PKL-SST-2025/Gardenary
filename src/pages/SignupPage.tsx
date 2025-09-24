import { createSignal, type Component } from 'solid-js';
import { useNavigate, A } from "@solidjs/router";
import { registerUser, syncUserToProfile, type RegisterDTO } from "../services/api";

const SignupPage: Component = () => {
  const navigate = useNavigate();

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [city, setCity] = createSignal("");
  const [birthDate, setBirthDate] = createSignal("");
  const [agreed, setAgreed] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [errorMsg, setErrorMsg] = createSignal("");
  const [successMsg, setSuccessMsg] = createSignal("");

  const handleSignup = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    
    if (!name() || !email() || !password() || !confirmPassword() || !city() || !birthDate()) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    if (password() !== confirmPassword()) {
      setErrorMsg("Passwords do not match");
      return;
    }
    if (!agreed()) {
      setErrorMsg("You must agree to the terms");
      return;
    }
    
    setIsLoading(true);
    try {
      const userData: RegisterDTO = {
        name: name(),
        email: email(),
        password: password(),
        confirm_password: confirmPassword(),
        city: city(),
        birth_date: birthDate(),
      };

      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccessMsg(result.message);
        
        // Sync user data to profile immediately after successful registration
        syncUserToProfile();
        
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard/profile
        }, 1500);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg("Registration failed. Please try again.");
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Animation & Gradient */}
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

        {/* Vegetable Elements */}
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
            </defs>
            <path d="M40 80L25 25L55 25L40 80Z" fill="url(#carrotGrad)"/>
            <line x1="30" y1="35" x2="50" y2="35" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
            <line x1="32" y1="45" x2="48" y2="45" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
            <line x1="34" y1="55" x2="46" y2="55" stroke="#e65100" stroke-width="0.8" opacity="0.4"/>
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
            </defs>
            <circle cx="50" cy="35" r="12" fill="url(#broccoliGrad)"/>
            <circle cx="35" cy="45" r="10" fill="url(#broccoliGrad)"/>
            <circle cx="65" cy="45" r="10" fill="url(#broccoliGrad)"/>
            <rect x="47" y="58" width="6" height="25" fill="#8bc34a" rx="3"/>
          </svg>
        </div>

        <div class="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div class="w-full max-w-lg">
            <div class="relative backdrop-blur-lg bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-10 hover:scale-105 transition duration-300">
              <div class="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-3xl opacity-20 blur-sm animate-pulse"></div>

              <div class="relative z-10">
                <div class="text-center mb-8 animate-fade-in-down">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </div>
                  <h2 class="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    GET STARTED
                  </h2>
                  <p class="text-gray-600 mt-2 font-medium">Create your Gardenary account</p>
                </div>

                <div class="space-y-4 animate-fade-in-up">
                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="text"
                      placeholder="Enter your full name"
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

                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword()}
                      onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="text"
                      placeholder="Enter your city"
                      value={city()}
                      onInput={(e) => setCity(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  <div class="relative group">
                    <input
                      class="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 placeholder-gray-400 shadow-lg backdrop-blur-sm"
                      type="date"
                      lang="en-CA"
                      placeholder="Enter your birth date"
                      value={birthDate()}
                      onInput={(e) => setBirthDate(e.currentTarget.value)}
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
                  </div>

                  {/* Checkbox */}
                  <div class="flex items-center group cursor-pointer">
                    <div class="relative">
                      <input type="checkbox" id="agree" checked={agreed()} onInput={(e) => setAgreed((e.target as HTMLInputElement).checked)} class="sr-only" />
                      <div class={`w-6 h-6 rounded-lg border-2 transition duration-300 flex items-center justify-center ${
                        agreed() 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 shadow-lg' 
                          : 'border-gray-300 bg-white group-hover:border-green-400'
                      }`}>
                        {agreed() && (
                          <svg class="w-4 h-4 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label for="agree" class="ml-3 text-gray-700 font-medium select-none cursor-pointer group-hover:text-green-700 transition duration-300">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {/* Error/Success Messages */}
                  {errorMsg() && (
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in-down">
                      {errorMsg()}
                    </div>
                  )}
                  {successMsg() && (
                    <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fade-in-down">
                      {successMsg()}
                    </div>
                  )}

                  {/* Button */}
                  <button
                    class={`relative w-full py-4 rounded-xl font-bold text-lg transition duration-300 overflow-hidden ${
                      agreed()
                        ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-2xl hover:shadow-green-500/25 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!agreed() || isLoading()}
                    onClick={handleSignup}
                  >
                    <span class="relative z-10 flex items-center justify-center">
                      {isLoading() ? (
                        <>
                          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  {/* Link to Login */}
                  <p class="text-center text-gray-600 font-medium">
                    Already have an account?{" "}
                    <A href="/login" class="text-green-700 font-bold hover:text-emerald-600 transition duration-300 relative inline-block group">
                      Login
                      <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
                    </A>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

export default SignupPage;