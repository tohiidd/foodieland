import { IoWarning } from "react-icons/io5";

/* eslint-disable react/no-unescaped-entities */
function Error404Page() {
  return (
    <section className="h-[100vh] bg-[#F4F5FA] flex items-center justify-center font-inter text-center">
      <div>
        <h1 className="text-8xl font-medium">404</h1>
        <div className="flex items-center justify-center gap-1 mt-3">
          <h6 className="text-2xl font-semibold">Page Not Found</h6>
          <span>
            <IoWarning className="text-yellow-400 text-2xl" />
          </span>
        </div>
        <p className="text-sm text-secondary mt-3">we couldn't find the page you are looking for</p>
      </div>
    </section>
  );
}

export default Error404Page;
