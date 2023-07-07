if (process.env.PNPM_HOME) {
    console.warn('需要使用pnpm');
    process.exit(1);
}
