// eslint-disable-next-line @typescript-eslint/no-var-requires
require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    platform: 'node',
    treeShaking: true,
  })
  .catch(() => process.exit(1));
