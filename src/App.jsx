import { useState, useRef } from "react";
import useFetch from "./hooks/useFetch";

function App() {
  let imageName = useRef("");
  const KEY = "2ruUD-HWY2FdBp9KSU1e84UoifT6YytCyXRKDSsoUp0";
  const {
    data: images,
    error,
    isPending,
    fetchData,
  } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${KEY}&query=${imageName.current.value}&per_page=28`
  );
  const resetSearch = () => {
    fetchData();
  };
  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };
  return (
    <section>
      <div className="flex flex-col justify-center items-center pt-28">
        <h1 className="text-primary opacity-75 font-semibold text-5xl mb-5">
          Image Search
        </h1>
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <input
            type="search"
            placeholder="Type something to search"
            className="input input-bordered input-primary w-full"
            ref={imageName}
          />
        </form>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10 max-w-7xl mx-auto px-4">
        {images &&
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className="h-80 w-full object-cover rounded-lg shadow-md hover:shadow-xl  hover:scale-105 transition duration-500"
            />
          ))}
      </div>
    </section>
  );
}

export default App;
