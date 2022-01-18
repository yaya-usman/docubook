import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            path: args.path,
            namespace: "a",
          };
        }

        
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });



      build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `import message from './message
                      console.log(message)
            `,
          };
        }

        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };

  // require('esbuild').build({
  //   entryPoints: ['index.js'],
  //   bundle: true,
  //   write: false,
  //   // outfile: 'out.js',
  //   plugins: [unpkgPathPlugin()],
  // }).catch(() => process.exit(1))
};
