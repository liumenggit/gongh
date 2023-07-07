// cli.exe open && uni build -p app && cli.exe pack --config \"$INIT_CWD\\uniapp.pack.json.local\" --iscustom true --safemode false

const {execSync, spawn} = require('child_process');
const iconv = require('iconv-lite');

const args = process.argv.splice(2); // 参数
const dir = process.env.INIT_CWD; // npm package.json 所在目录
const projectPath = `${dir}\\dist\\build\\app`; // 编译后的app目录，要导入到 hbx 中
const packConfigUrl = `${dir}\\uniapp.pack.json.local`; // 打包配置文件

let iscustom = false;
let safemode = true;
let packMode = '云打包';

// 如果打包自定义基座
if (args.includes('custom')) {
    iscustom = true;
    safemode = false;
    packMode = '打包自定义基座';
}

(function () {
    // 启动 hbx
    execSync('cli open');
    console.log('- hbx 启动成功...\n');

    // 导入（已存在，不做任何事情）
    execSync(`cli project open --path ${projectPath}`).toString('ascii');
    console.log('- hbx 打开(导入)项目成功...\n');

    // 显示当前已存在的项目
    const projectList = iconv
        .decode(execSync('cli project list'), 'GBK')
        .split('\r\n')
        .filter(i => i && !i.startsWith('0'));
    console.log(projectList, '\n');

    // 编译 app
    const uni = spawn('uni', ['build', '-p app'], {shell: true});
    uni.stdout.on('data', (data) => {
        let message = data.toString();
        if (message.endsWith('\n'))
            message = message.slice(0, -1);
        console.log(`- uni: ${message}`);
    });
    uni.stderr.on('data', (data) => {
        let message = data.toString();
        if (message.endsWith('\n'))
            message = message.slice(0, -1);
        console.error(`- uni: ${message}`);
    });
    uni.on('error', err => console.error('- 编译失败：' + `${err}`));
    uni.on('close', (_code) => {
        console.log(`- 编译完成，开始[${packMode}]...\n`);

        // 云打包（打包自定义基座）
        const cli = spawn(
            'cli',
            ['pack', `--config \"${packConfigUrl}\"`, `--iscustom ${iscustom}`, `--safemode ${safemode}`],
            {shell: true},
        );
        cli.stdout.on('data', (data) => {
            let message = iconv.decode(data, 'gbk');
            if (message.endsWith('\n'))
                message = message.slice(0, -1);
            console.log(`- HBuilderX cli: ${message}`);
        });
        cli.stderr.on('data', (data) => {
            let message = iconv.decode(data, 'gbk');
            if (message.endsWith('\n'))
                message = message.slice(0, -1);
            console.error(`- HBuilderX cli: ${message}`);
        });
        cli.on('close', _code => console.log(`- ${packMode} 成功`));
        cli.on('error', err => console.error(`- ${packMode} 失败：${err}`));
    });
})();
