const links = [
  { name: "View Car", href: "#" },
  { name: "Policy", href: "#" },
  { name: "About Company", href: "#" },
  { name: "Answer Survey", href: "#" },
];
const stats = [
  { name: "Total products sold", value: "1200" },
  { name: "Number of reviews", value: "300+" },
  { name: "Maintenance team", value: "40" },
];

export default function HeaderSection() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
      <img
        alt=""
        src={`${
          import.meta.env.VITE_API_BASE_URL
        }/images/car/car-bg-dark.jpg`}
        className="opacity-30 absolute inset-0 -z-10 size-full object-cover object-right md:object-center bg-cover bg-[50%]"
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Work with us
          </h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-indigo-600 sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
