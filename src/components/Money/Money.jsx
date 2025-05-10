function MoneyCard({ money }) {
  return (
    <section className="grid grid-cols-2 gap-4 max-w-md mx-auto py-2 px-10">
      <div className="flex flex-col">
        <div className="flex justify-around border border-zinc-500 px-2 py-1 rounded-md">
          <p
            className={`${money.platinum > 10 ? "text-green-500" : "text-red-500"}`}
          >
            {money.platinum}
          </p>
          <p className="skills-section-text">PP</p>
        </div>
        <div className="flex justify-around border border-zinc-500 px-2 py-1 rounded-md">
          <p
            className={`${money.gold > 10 ? "text-green-500" : "text-red-500"}`}
          >
            {money.gold}
          </p>
          <p className="skills-section-text">GP</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-around border border-zinc-500 px-2 py-1 rounded-md">
          <p
            className={`${money.silver > 10 ? "text-green-500" : "text-red-500"}`}
          >
            {money.silver}
          </p>
          <p className="skills-section-text">SP</p>
        </div>
        <div className="flex justify-around border border-zinc-500 px-2 py-1 rounded-md">
          <p
            className={`${money.copper > 10 ? "text-green-500" : "text-red-500"}`}
          >
            {money.copper}
          </p>
          <p className="skills-section-text">CP</p>
        </div>
      </div>
    </section>
  );
}

export default MoneyCard;
