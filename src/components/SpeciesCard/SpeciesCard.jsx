function SpeciesCard({ data }) {
  const classText = "text-white leading-relaxed pb-2";
  const baseButtonClasses =
    "w-full text-white py-2 text-center flex flex-col justify-center items-center";
  return (
    <>
      <article>
        <section className="w-100 flex flex-row h-min-40 gap-4 border-gray-500 border-b">
          <div className="flex flex-col flex-1">
            <h2 className="text-white text-lg py-4"><strong>{data.name}</strong></h2>
            <p className={`${classText}`}>
              <strong>Creature Type: </strong>
              {data.creature_type}.
            </p>
            <p className={`${classText}`}>
              <strong>Size: </strong>
              {data.size}.
            </p>
            <p className={`${classText}`}>
              <strong>Speed: </strong>
              {data.speed} ft.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

export default SpeciesCard;
