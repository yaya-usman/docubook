import "./App.css";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import * as esbuild from "esbuild-wasm";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async () => {
    const service = await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const handleSubmit = () =>{

  }
  return (
    <div className="App">
      <textarea value = {input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onSubmit={handleSubmit}>submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
