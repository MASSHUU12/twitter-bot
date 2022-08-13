// import axios from "axios";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://127.0.0.1:9000/test",
  //   }).then((res) => console.log(res));
  // }, []);
  //

  return (
    <div>
      <h1>Twitter Bot</h1>
      <p>
        To start using the bot, you need to go through several steps (see
        README.md for details).
      </p>
      <ol>
        <li>
          Authorize the bot <a href="http://127.0.0.1:9000/auth">here</a>.
        </li>
        <li>
          Go to the <a href="/dashboard">dashboard</a>, if it starts without any
          problems, then add the information to the database to be sent by the
          bot.
        </li>
        <li>Run the bot.</li>
      </ol>
    </div>
  );
}

export default App;
