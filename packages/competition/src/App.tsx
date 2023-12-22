import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Accordion, Button, Input, Card } from "@sast/oj-ui";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisble] = useState(true);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button color="primary" onClick={() => setVisble(!visible)}>
          hello
        </Button>
        <Input></Input>
        <Accordion
          accordionTrigger={<span>hi</span>}
          accordionContent={<span>hello</span>}
        ></Accordion>
        <Card></Card>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
