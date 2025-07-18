import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import logo from '../assets/logo.png';
import background from '../assets/background.png';
import dashboard from '../assets/dashboard.png';
import list from '../assets/list.png';
import add from '../assets/add.png';
import growth from '../assets/growth.png';
import leafLogo from '../assets/leaf-logo.png';
import placeholder from '../assets/placeholder.png';
import footer from '../assets/footer.png';
import { useNavigate } from "@solidjs/router";

interface FeatureSectionProps {
  number: number;
  title: string;
  quote: string;
  description: string;
  imageSrc: string;
}

const FeatureSection: Component<FeatureSectionProps> = ({ number, title, quote, description, imageSrc }) => {
  return (
    <div class="flex flex-col md:flex-row items-center my-8 space-y-4 md:space-y-0 md:space-x-6">
      <div class="flex flex-col items-center md:items-start w-full md:w-1/2 px-4">
        <div class="flex flex-col items-center md:items-start mb-2 md:ml-10">
          <div class="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-2 ml-32">
            {number}
          </div>
          <h2 class="text-xl font-bold ml-24">{title}</h2>
          <h3 class="text-xl ml-10">{quote}</h3>
        </div>
        <p class="text-gray-700 text-lg">{description}</p>
      </div>
      <img src={imageSrc} alt={title} class="w-full md:w-1/2 rounded-lg shadow-md border" />
    </div>
  );
};

const Home: Component = () => {
  const navigate = useNavigate();

  let featuresRef: HTMLDivElement | undefined;
  let aboutRef: HTMLDivElement | undefined;
  let dashboardRef: HTMLDivElement | undefined;

  const goToReview = () => {
    navigate("/review");
  };

  const scrollToFeatures = () => {
    featuresRef?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDashboard = () => {
    dashboardRef?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div class="relative w-full">
      {/* Navbar */}
      <nav class="absolute top-0 left-0 w-full flex justify-between items-center p-2 z-10">
        <div class="flex items-center space-x-2">
          <img src={logo} alt="Logo" class="w-19 h-16 ml-8" />
          <span class="font-baloo text-2xl font-semibold">Gardenary</span>
        </div>
        <ul class="flex space-x-6 text-white font-medium mr-16">
          <li>
            <button onClick={scrollToFeatures} class="hover:underline">Features</button>
          </li>
          <li>
            <button onClick={scrollToAbout} class="hover:underline">About</button>
          </li>
          <li>
            <button onClick={scrollToDashboard} class="hover:underline">Recent</button>
          </li>
          <li>
            <a href="/login" class="bg-green-800 text-white px-4 py-1 rounded-full hover:bg-green-900">Login</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div
        class="h-[600px] bg-cover bg-[center_100%] flex flex-col items-center justify-center text-center text-white px-4"
        style={{ "background-image": `url(${background})` }}
      >
        <h1 class="text-3xl md:text-4xl font-bold max-w-2xl mb-4">
          "Modern gardening solutions for everyone."
        </h1>
        <p class="text-sm md:text-base max-w-xl mb-6">
          Get the best guides, tools and plants for your dream garden.
        </p>
        <a href="/signup" class="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold transition">
          GET STARTED
        </a>
      </div>

      {/* Placeholder Section */}
      <div class="bg-green-800 text-white font-bold mt-[-100px] mx-auto max-w-5xl rounded-2xl p-16 shadow-lg relative z-10">
        <p class="text-center text-2xl">GROW AND REALIZE YOUR PLANTS WITH GARDENARY</p>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} class="max-w-5xl mx-auto py-16 px-4" id="features">
        <FeatureSection
          number={1}
          title="Dashboard"
          quote="Get your plants growing!"
          description="On this page, you will get various information about your plants. such as information on how many plants should be watered or fertilized, a calendar containing information about plant growth every day and a graph to see whether the plant is getting better or decreasing."
          imageSrc={dashboard}
        />
        <FeatureSection
          number={2}
          title="        List"
          quote="see all your plant list here!"
          description="You can see all your plants here. You can also monitor when your plants need to be watered, fertilized and harvested. Here you can also see the name, type, age and final status of the plant, such as not yet / already watered and fertilized or even harvested."
          imageSrc={list}
        />
        <FeatureSection
          number={3}
          title="ㅤ   Add"
          quote="add your new plant here!"
          description="this is where you add the plants you just bought. You can add it by filling in the name, type of plant, date you planted it and a photo of the plant. so, you don't have to worry if you want to add a new plant."
          imageSrc={add}
        />
        <FeatureSection
          number={4}
          title="    Growth"
          quote=""
          description="Track plant growth over time with helpful visualizations and insights."
          imageSrc={growth}
        />
      </div>

       {/* section */}
      <div class="bg-green-800 text-white mt-[-0px] mx-auto max-w-20xl p-8 shadow-lg relative z-10"></div>

      {/* About Section */}
      <div ref={aboutRef} id="about" class="bg-green-50 min-h-[80vh] flex items-center justify-center px-4 py-2">
        <div class="max-w-5xl mx-auto w-full">
          <h2 class="text-2xl md:text-3xl font-bold text-center mb-20">What is Gardenary?</h2>
          <div class="flex flex-col md:flex-row items-start gap-y-2 md:gap-x-1">
            <div class="w-full md:w-1/2 flex justify-center md:justify-start mt-0 md:ml-16">
              <img src={leafLogo} alt="Garden Logo" class="w-72 h-72 md:w-[300px] md:h-[300px] object-contain" />
            </div>
            <div class="w-full md:w-1/2 mt-4 md:mt-8 -ml-28">
              <p class="text-gray-800 text-lg leading-relaxed text-justify">
                Gardenary is a website that aims to help users take care of their plants. With Gardenary, users can take care of their plants regularly and consistently. Gardenary also provides various features that are quite helpful to users such as reminders of plants that have not been watered and fertilized as well as calendars and growth charts every day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback Section */}
      <div ref={dashboardRef} class="bg-white p-8 rounded-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">Recent Feedback</h2>

        {/* Ratings Summary */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
          {/* Average Rating */}
          <div class="bg-yellow-50 rounded-lg p-6 text-center">
            <div class="text-3xl font-semibold text-yellow-500">4.7</div>
            <div class="flex justify-center text-yellow-400 mt-2 mb-2 text-xl">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p class="text-sm text-gray-700">50 Ratings</p>
          </div>

          {/* Rating Bars */}
          <div class="space-y-2 text-sm">
            {["Five", "Four", "Three", "Two", "One"].map((label, index) => {
              const widths = ["70%", "85%", "60%", "30%", "15%"];
              return (
                <div class="flex items-center gap-2">
                  <span class="w-12">{label}</span>
                  <div class="flex-1 h-2 bg-gray-300 rounded">
                    <div class="h-2 bg-yellow-400 rounded" style={{ width: widths[index] }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-orange-300 p-6 rounded-lg">
            <img src={placeholder} alt="Avatar" class="w-10 h-10 rounded-full mb-4" />
            <p class="text-white">This plant tracking app has helped me stay consistent with my watering schedule. Love it!</p>
          </div>
          <div class="bg-orange-300 p-6 rounded-lg">
            <img src={placeholder} alt="Avatar" class="w-10 h-10 rounded-full mb-4" />
            <p class="text-white">I really like the reminders and the clean interface. My plants are healthier than ever.</p>
          </div>
        </div>
      </div>

      <footer
      class="w-full h-48 md:h-56 bg-cover bg-center flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-6 text-white"
      style={{ "background-image": `url(${footer})` }}
      >
      {/* Brand Name */}
      <h2 class="text-3xl font-extrabold drop-shadow-md md:ml-16">Gardenary</h2>

      {/* Feedback Form */}
      <div class="flex flex-col items-center space-y-2 md:mr-28">
      <span class="text-sm md:text-base">Send your <span class="whitespace-nowrap">feedback!!!</span></span>
      <button
      onClick={goToReview}
      class="bg-green-800 hover:bg-green-900 text-white px-36 py-2 rounded-full font-semibold transition duration-200"
      >
      Send
    </button>
  </div>
</footer>

    </div>
  );
};

export default Home;
