import CarItem from "./CarItem";

export default function CarLists({ cars, haveEdit = false }) {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {cars.map((car) => (
              <CarItem car={car} haveEdit={haveEdit} key={car.id}></CarItem>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
