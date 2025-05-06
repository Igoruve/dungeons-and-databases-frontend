function SkillsCard({ data }) {
  return (
    <>
      <article>
        <section className="w-100 flex flex-row h-min-40 gap-4 border-gray-500 border-b">
          <div className="flex flex-col flex-1">
            <h2 className="text-white text-lg py-4"><strong>{data.name}</strong></h2>
            <p className="text-white text-opacity-70 pb-3">
              {data.description}
            </p>
            <p className="text-white mb-4">
              <strong>Associated Stat:</strong> {data.associated_stat}.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

export default SkillsCard;
