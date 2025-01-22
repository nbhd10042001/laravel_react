import { useStateContext } from "../../contexts/ContextProvider";

export default function HeroSection() {
  const { showDialog } = useStateContext();
  return (
    <div className="bg-black py-8 sm:py-16">
      <div className="relative isolate px-6 lg:px-8">
        <div>
          <video
            autoPlay
            muted
            loop
            className="opacity-70 absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
          >
            <source
              src={`${import.meta.env.VITE_API_BASE_URL}/videos/lambo_4k.mp4`}
              type="video/mp4"
            />
          </video>
        </div>

        <div className="mx-auto max-w-2xl py-16 sm:py-12">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 font-medium border border-indigo-700 text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a
                href={null}
                className="font-medium text-indigo-500"
                onClick={() => showDialog(true)}
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-100 sm:text-7xl">
              Modern and innovative
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
              Quickly and securely cash-in your offer from a local dealer, or
              create a free listing to sell it yourself on this website.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 hover:text-gray-900 border border-gray-600"
              >
                Get instant offer
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-200">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
