function StatsCard({ stats }) {
  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    <section className="grid grid-cols-3 gap-6 px-10 mb-10">
      <article className="grid-square">
        <h3 className="grid-stat">STR</h3>
        <p className="grid-first-num">{`${stats.strength > 10 ? "+" : ""}${Math.floor(
          (stats.strength - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.strength}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">DEX</h3>
        <p className="grid-first-num">{`${stats.dexterity > 10 ? "+" : ""} ${Math.floor(
          (stats.dexterity - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.dexterity}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">CON</h3>
        <p className="grid-first-num">{`${stats.constitution > 10 ? "+" : ""}${Math.floor(
          (stats.constitution - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.constitution}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">INT</h3>
        <p className="grid-first-num">{`${stats.intelligence > 10 ? "+" : ""}${Math.floor(
          (stats.intelligence - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.intelligence}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">WIS</h3>
        <p className="grid-first-num">{`${stats.wisdom > 10 ? "+" : ""}${Math.floor(
          (stats.wisdom - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.wisdom}</p>
      </article>
      <article className="grid-square">
        <h3 className="grid-stat">CHA</h3>
        <p className="grid-first-num">{`${stats.charisma > 10 ? "+" : ""}${Math.floor(
          (stats.charisma - 10) / 2
        )}`}</p>
        <p className="grid-sec-num">{stats.charisma}</p>
      </article>
    </section>
  );
}

export default StatsCard;
