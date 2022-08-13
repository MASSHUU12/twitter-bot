import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Twitter Bot</h1>
      <p>
        To start using the bot, you need to go through several steps (see
        README.md for details).
      </p>
      <ol>
        <li>
          Authorize the bot <Link to="/auth">here</Link>.
        </li>
        <li>
          Go to the <Link to="/dashboard">dashboard</Link>, if it starts without
          any problems, then add the information to the database to be sent by
          the bot.
        </li>
        <li>Run the bot.</li>
      </ol>
    </div>
  );
}

export default App;
