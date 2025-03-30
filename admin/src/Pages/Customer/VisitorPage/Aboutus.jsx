const AboutUs = () => {
  return (
    <section
      class="py-10 lg:py-20 bg-slate-50 font-poppins dark:bg-gray-800"
      id="about"
    >
      <div class="max-w-6xl py-4 mx-auto lg:py-6 px-0">
        <div class="flex flex-wrap ">
          <div class="w-full mb-10 lg:w-1/2 lg:mb-0 ">
            <div class="lg:max-w-md">
              <div class="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                <span class="text-sm text-gray-600 uppercase dark:text-gray-400">
                  Who we are?
                </span>
                <h1 class="mt-2 text-3xl font-black text-[#1A3570] md:text-5xl dark:text-gray-300">
                  About Us
                </h1>
              </div>
              <p class="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
                Service Hub offers a user-friendly experience: effortlessly
                browse and book services, trust providers through reviews,
                confirm choices in your cart, and securely pay for a seamless
                and relaxing service.
              </p>
            </div>
          </div>
          <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <img
              src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg"
              alt=""
              class="relative z-40 object-cover w-full h-full rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
