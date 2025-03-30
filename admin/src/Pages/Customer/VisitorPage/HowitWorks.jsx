export const HowitWorks = () => {
  return (
    <>
      <div class="w-full h-full ">
        <div class="container flex flex-col items-center gap-16 mx-auto my-32 ">
          <div class="grid w-full grid-cols-1 gap-32 lg:grid-cols-2 bg-slate-50 px-20">
            <div
              class="bg-cover bg-center hidden lg:block rounded-3xl"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/7564196/pexels-photo-7564196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              }}
            ></div>
            <div class="flex flex-col gap-16 text-justify">
              <div class="flex flex-col gap-2 text-center md:text-start">
                <h1 class="mt-2 text-3xl font-black text-[#1A3570] md:text-5xl dark:text-gray-300">
                  How It Works
                </h1>
              </div>
              <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10">
                <div class="flex flex-col items-start gap-1">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500 mb-2 ">
                    <span class="text-lg font-bold  text-white bg-[#FCA311] rounded-full p-6 w-2 h-2 flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h3 class=" font-bold text-base leading-7 text-gray-700">
                    Browse, Book, Enjoy:
                  </h3>
                  <p class=" mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                    Select category, date, time effortlessly on Service Hub.
                  </p>
                </div>
                <div class="flex flex-col items-start gap-1">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500 mb-2">
                    <span class="text-lg font-bold  text-white bg-[#FCA311] rounded-full p-6 w-2 h-2 flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <h3 class=" font-bold text-base leading-7 text-gray-700">
                    Review, Choose, Trust:
                  </h3>
                  <p class=" mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                    Explore providers, view ratings, and read reviews for
                    confidence.
                  </p>
                </div>
                <div class="flex flex-col items-start gap-1">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500 mb-2">
                    <span class="text-lg font-bold  text-white bg-[#FCA311] rounded-full p-6 w-2 h-2 flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <h3 class=" font-bold text-base leading-7 text-gray-700">
                    Cart, Confirm, Discover:
                  </h3>
                  <p class=" mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                    Add to cart, delve into service details, and review your
                    choices.
                  </p>
                </div>
                <div class="flex flex-col items-start gap-1">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-blue-500 mb-2">
                    <span class="text-lg font-bold  text-white bg-[#FCA311] rounded-full p-6 w-2 h-2 flex items-center justify-center">
                      4
                    </span>
                  </div>
                  <h3 class=" font-bold text-base leading-7 text-gray-700">
                    Pay Securely, Relax:
                  </h3>
                  <p class=" mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                    Confirm order, pay securely, and await your seamless service
                    experience.
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
