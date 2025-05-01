function StatsCard({ stats }) {
  return (
    <section className="character-stats">
      <h3>Stats</h3>
      <article className="stat-card">
        <h2>DEX</h2>
        <h3>{Math.floor((stats.Strength - 10) / 2)}</h3>
        <p>{stats.Strength}</p>
      </article>
      <article>
        <h2>STR</h2>
        <h3>{Math.floor((stats.Dexterity - 10) / 2)}</h3>
        <p>{stats.Dexterity}</p>
      </article>
      <article>
        <h2>CON</h2>
        <h3>{Math.floor((stats.Constitution - 10) / 2)}</h3>
        <p>{stats.Constitution}</p>
      </article>
      <article>
        <h2>INT</h2>
        <h3>{Math.floor((stats.Intelligence - 10) / 2)}</h3>
        <p>{stats.Intelligence}</p>
      </article>
      <article>
        <h2>WIS</h2>
        <h3>{Math.floor((stats.Wisdom - 10) / 2)}</h3>
        <p>{stats.Wisdom}</p>
      </article>
      <article>
        <h2>CHAR</h2>
        <h3>{Math.floor((stats.Charisma - 10) / 2)}</h3>
        <p>{stats.Charisma}</p>
      </article>
    </section>
  );
}

export default StatsCard;
