function MoneyCard({ money }) {
  return (
    <section className="character-money">
      <h3>Money</h3>
      <p className={money.platinum > 10 ? "money-green" : "money-red"}>
        PP: {money.platinum}
      </p>
      <p className={money.gold > 10 ? "money-green" : "money-red"}>
        GP: {money.gold}
      </p>
      <p className={money.silver > 10 ? "money-green" : "money-red"}>
        SP: {money.silver}
      </p>
      <p className={money.copper > 10 ? "money-green" : "money-red"}>
        CP: {money.copper}
      </p>
    </section>
  );
}

export default MoneyCard;
