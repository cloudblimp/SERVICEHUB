export const NotFound = () => {
  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-6xl font-bold text-gray-800 mb-4">OOPS! 404</p>
        <p class="text-2xl text-gray-600 mb-4">Page Not Found</p>
        <p class="text-4xl">&#128542;</p>
        <p class="text-lg text-gray-700 mt-4">
          The line you followed is probably broken or the page has not been
          found.
        </p>
        <div class="mt-8">
          <a
            href="/"
            class="text-white bg-blue-500 px-6 py-3 rounded-full text-xl hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};
