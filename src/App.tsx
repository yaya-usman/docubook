import "./App.css";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

import * as esbuild from "esbuild-wasm";

function App() {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.25/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async () => {
    if (!ref.current) {
      return;
    }


    //ensures the frame refreshes its content before rendering
    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });


    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
    <html>
      <head></head>
      <body>
      <div id = "root"></div>

      <script>
          window.addEventListener("message",(event) =>{
              try{
                eval(event.data)
              }catch(err){
                  const root = document.querySelector('#root');
                  root.innerHTML = '<div style = "color: red"> ' + err + ' </div>';
                  console.log(err);
              }
          }, false)
      </script>
      </body>
    </html>
  
  `

  return (
    <div className="App">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <iframe title = "output" ref = {iframeRef} sandbox="allow-scripts" srcDoc={html}></iframe>

    </div>
  );
}

export default App;
