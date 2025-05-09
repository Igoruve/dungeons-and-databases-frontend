function StatsCard({ stats }) {
  return (
    <section className="grid grid-cols-3 gap-6 px-10 mb-10">
      <article className="grid-square">
        <h3 className="grid-stat">STR</h3>
        <p className="grid-first-num">{`${stats.STR > 10 ? "+" : ""}${Math.floor(
          (stats.STR - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.STR}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">DEX</h3>
        <p className="grid-first-num">{`${stats.DEX > 10 ? "+" : ""} ${Math.floor(
          (stats.DEX - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.DEX}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">CON</h3>
        <p className="grid-first-num">{`${stats.CON > 10 ? "+" : ""}${Math.floor(
          (stats.CON - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.CON}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">INT</h3>
        <p className="grid-first-num">{`${stats.INT > 10 ? "+" : ""}${Math.floor(
          (stats.INT - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.INT}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">WIS</h3>
        <p className="grid-first-num">{`${stats.WIS > 10 ? "+" : ""}${Math.floor(
          (stats.WIS - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.WIS}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">CHA</h3>
        <p className="grid-first-num">{`${stats.CHA > 10 ? "+" : ""}${Math.floor(
          (stats.CHA - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.CHA}</p>
      </article>
    </section>
  );
}

export default StatsCard;
