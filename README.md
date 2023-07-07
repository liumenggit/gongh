### 代码风格指南

```js
// 参考：https://eslint.bootcss.com/docs/rules/
// 参考：https://blog.csdn.net/x550392236/article/details/89497202
// 参考：https://blog.csdn.net/brokenkay/article/details/111106266

module.exports = {
    root: true,
    /**环境提供预定义的全局变量 */
    env: {
        /**Node.js全局变量和Node.js范围 */
        node: true,
        /**浏览器全局变量 */
        browser: true,
    },
    /**定义ESLint的解析器 */
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    /**定义文件继承的子规范 */
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-var': 'error', //要求使用 let 或 const 而不是 var
        camelcase: 'error', // 双峰驼命名格式
        indent: ['error', 4, {SwitchCase: 1}], //代码缩进2个空格
        semi: ['error', 'always'], //行尾需要有分号
        quotes: ['error', 'single'], //强制使用一致的反勾号、双引号或单引号
        'linebreak-style': ['error', 'windows'], //强制使用一致的换行风格,"unix"：\n 表示 LF , "windows"：\r\n 表示 CRLF
        eqeqeq: ['error', 'always', {null: 'ignore'}], //比较时强制使用 === 或者 !==,但对null作比较时可以不用全等
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ], //不允许使用未使用的变量
        '@typescript-eslint/no-explicit-any': 'off', //不允许任何类型
        '@typescript-eslint/no-empty-function': 'off', //不允许空函数
        'vue/html-indent': ['error', 4], //在<template>中强制一致缩进
        'vue/singleline-html-element-content-newline': 'off', //要求在单行元素的内容之前和之后有一个换行符
        'vue/max-attributes-per-line': 'off', //执行每行的最大属性数(被 prettier 最大单行控制了暂off)
        'vue/multi-word-component-names': 'off', //要求组件名称始终为多字
        'vue/html-self-closing': 'off', //执行自我封闭式
        'no-undef': 'off', //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        '@typescript-eslint/ban-ts-comment': 'off', // 不允许@ts-<指令>评论或要求指令后的描述
        '@typescript-eslint/ban-types': 'off', // 不允许某些类型
        '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用！后缀操作符的非空断言
    },
    globals: {
        //可以定义全局中的变量的权限（只读，可读可写）
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        uni: 'readonly',
    },
    ignorePatterns: [
        // # 忽略目录
        '/dist',
        '/public',
        '/src/public',
        '/src/static',
        '/node_modules',
        // # 忽略文件
        '**/*-min.js',
        '**/*.min.js',
        '**/*-min.css',
        '**/*.min.css',
        '**/*.tsbuildinfo',
        '**/*.config.js',
        '**/*.config.ts',
        '/src/manifest.json',
    ],
};
```

### 目录结构

```
├─components        自定义组件
├─enums             枚举
├─pages             页面路径
├─router            路由
├─services          数据服务相关
│  ├─api            API
│  │  └─common      公共API
│  └─model          接口
├─settings          配置
├─static            静态文件
├─store             状态管理
├─theme             主题配置
├─types             全局接口
│─utils             自定义功能
│   ├─cache         缓存
│   ├─common        公共方法
│   ├─http          请求封装 
│   └─router        路由封装
│─.env              全局配置
│─.env.development  开发环境
└─.env.production   生产环境
```

### 文件命名规则

```yaml
ls:
  .js: kebab-case
  .ts: kebab-case
  .json: kebab-case
  .vue: PascalCase
  .tsx: PascalCase
  .d.ts: kebab-case
  src/components:
    .dir: kebab-case
    .vue: kebab-case
  src/enums:
    .ts: camelcase

ignore:
  - .git
  - node_modules
  - dist
  - src/tmui
  - src/hybrid/html/js
  - postcss.config.js
  - vite.config.ts
  - src/androidPrivacy.json
```

## CSS 规范

### 杂类

| 类名                 | 作用说明                                                                                                          |
|:-------------------|:--------------------------------------------------------------------------------------------------------------|
| safe-height        | 底部安全区域高度 <Badge type="danger" text="nvue不支持" vertical="middle" />                                             |
| overflow           | 溢出隐藏。                                                                                                         |
| overflow-x         | 横轴溢出隐藏，Y 轴自动（滚动条）                                                                                             |
| overflow-y         | 竖向溢出隐藏，X 轴自动（滚动条）                                                                                             |
| relative           | 相对定位                                                                                                          |
| absolute           | 绝对定位                                                                                                          |
| fixed              | 固定悬浮                                                                                                          |
| clear              | 清除浮动<Badge type="danger" text="nvue不支持" vertical="middle" />                                                  |
| fulled             | 宽度 100%<Badge type="danger" text="nvue不支持" vertical="middle" />                                               |
| fulled-height      | 高度 100%                                                                                                       |
| gray-100           | 使元素变灰色<Badge type="danger" text="nvue不支持" vertical="middle" />                                                |
| gray               | 使元素变灰色 25%<Badge type="danger" text="nvue不支持" vertical="middle" />                                            |
| d-inline-block     | 使元素变为内联，即和文字变为一行<Badge type="danger" text="nvue不支持" vertical="middle" />                                      |
| d-block            | 使元素变为块联即占一行<Badge type="danger" text="nvue不支持" vertical="middle" />                                           |
| vertical-align-[x] | x=[top/middle/bottom]内联对齐方式,如：vertical-align-top 顶部对齐<Badge type="danger" text="nvue不支持" vertical="middle" /> |
| wrap               | 断行，包括内联元素和单词，数字全部强制断行                                                                                         |
| nowrap             | 不断行，使用内联元素形成一排                                                                                                |

### 文本类

| 类名                | 作用说明                                             |
|:------------------|:-------------------------------------------------|
| text-delete       | 删除线                                              |
| text-underline    | 下划线                                              |
| text-size-[x]     | 文本大小 x 可能的值为：xxs,xs,s,n,g,lg,xl，例如中号:text-size-n |
| text-weight-[x]   | 粗细，x 可能值为：细 s,正常 n,加粗 b                          |
| text-align-[x]    | 文本对齐 。text-align-left,right,center               |
| text-overflow     | 超过一行末尾省略号                                        |
| text-overflow-[x] | x=[1-5],最多几行出现省略号                                |

### 圆角

| 类名        | 作用说明                    |
|:----------|:------------------------|
| round-[x] | 圆角,x=[0-25],比如：round-10 |
| rounded   | 50%的半圆角                 |

圆角的其它辅助特性。`round-tl-[上面的数值] 如：round-tl-10`

| tl | tr | bl | br | a  |   t   |   b   |   l   |   r   |
|:--:|:--:|:--:|:--:|:--:|:-----:|:-----:|:-----:|:-----:|
| 顶左 | 顶右 | 底左 | 底右 | 全部 | 顶左和顶右 | 底左和底右 | 顶左和底左 | 顶右和底右 |

### 透明度

| 类名          | 作用说明                                      |
|:------------|:------------------------------------------|
| opacity-[x] | 透明,x=只能是整数 0,1,2,3,4,5,6,7,8,9 对应 0.0~0.9 |

### 投影

| 类名          | 作用说明                       |
|:------------|:---------------------------|
| shadow-[x]  | 投影大小 x=[0-25]如：shadow-5    |
| shadow-颜色-值 | 主题色的投影，比如红色投影 shadow-red-5 |

### 边线

| 类名              | 作用说明                          |
|:----------------|:------------------------------|
| border-[x]      | 加四边边线，边线大小 x=[0-25]如：border-5 |
| border          | 加四边边线，边线为 1px                 |
| border-[方向]-[x] | 颜色边线如：border-a-1 四周边红色框 1     |

border 的其它辅助特性。`round-方向-精细`
| l | r | b | t | a |
| :--: | :--: | :--: | :--: | :--: |
| 左 | 右 | 底 | 顶 | 四边 |

**规则:border-方向-粗细 <br>**

### zIndex 层级

| 类名          | 作用说明                                     |
|:------------|:-----------------------------------------|
| zIndex-[x]  | x=[0-25]如：zIndex-5,=>z-index:5           |
| zIndex-n[x] | x=[0-25],其中 n=4,如：zIndex-n5,=>z-index:20 |

### 文字颜色类

如果想要改变一个文字颜色为主题色，使用`text-颜色名`即可。<br>
比如红色文字 `text-red`，其它类推。

### Flex 综合排版

| flex-start | flex-end | flex-center | flex-between | flex-around | flex-reverse |
|:-----------|:---------|:------------|:-------------|:------------|:-------------|
| 居中左对齐      | 居中右对齐    | 居中对齐        | 居中两边对齐       | 居中均分        | 行内反转内容       |

| flex-row | flex-col | flex    | flex-wrap | flex-shrink<Badge type="danger" text="nvue不支持" vertical="middle" /> |
|:---------|:---------|:--------|:----------|:--------------------------------------------------------------------|
| 横向排列     | 纵向行排列    | flex 布局 | 自动断行      | 保证宽度不受挤压                                                            |

| flex-[x]         |
|:-----------------|
| [x]=0-12，flex 布局 |

### Flex-row 排版

需要配合 flex flex-row 类，加上本类比如：

```
//表示横向排列上中间对齐
<view class="flex flex-row flex-row-top-center"></view>
```

其它类推组合

| flex-row-top-start | flex-row-top-center | flex-row-top-end |
|:-------------------|:--------------------|:-----------------|
| 上左对齐               | 上中对齐                | 上右对齐             |

| flex-row-center-start | flex-row-center-center | flex-row-center-end |
|:----------------------|:-----------------------|:--------------------|
| 中左对齐                  | 中对齐                    | 中右对齐                |

| flex-row-bottom-start | flex-row-bottom-center | flex-row-bottom-end |
|:----------------------|:-----------------------|:--------------------|
| 底左对齐                  | 底中对齐                   | 底右对齐                |

| flex-row-center-between |
|:------------------------|
| 上下居中，两边对齐。              |

### Flex-col 排版

需要配合 flex flex-col 类，加上本类比如：

```
//表示纵向排列 左上对齐
<view class="flex flex-col flex-col-top-center"></view>
```

其它类推组合

| flex-col-top-start | flex-col-top-center | flex-col-top-end |
|:-------------------|:--------------------|:-----------------|
| 左上对齐               | 左中对齐                | 左右对齐             |

| flex-col-center-start | flex-col-center-center | flex-col-center-end |
|:----------------------|:-----------------------|:--------------------|
| 中左对齐                  | 中对齐                    | 中右对齐                |

| flex-col-bottom-start | flex-col-bottom-center | flex-col-bottom-end |
|:----------------------|:-----------------------|:--------------------|
| 底左对齐                  | 底中对齐                   | 底右对齐                |

### 位置控制

|   t   |   l    |    r    |    b     |
|:-----:|:------:|:-------:|:--------:|
| 上 top | 左 left | 右 right | 底 bottom |

**规则示例**<br>

`t-x`表示正数，x=0-50，比如：t-24，表示顶部偏移 24rpx，等于：top:24rpx;<br>
`t-nx`表示正数\*4 的倍数，x=0-25,比如：t-n10，表示向上偏移 40rpx，等于：top:40rpx;<br>
`t--x`表示负数，x=0-50，比如：t-24，表示向上偏移 24rpx，等于：top:-24rpx;<br>
`t--nx`表示负数，x=0-25，比如：t-n10，表示向上偏移 40rpx，等于：top:-40rpx;<br>
其它类推。

### 外边距

| 类名 | 方向 |  值   |        示例         |
|:--:|:--:|:----:|:-----------------:|
| m  | a  | 0-50 | ma-10,四周边距为 10upx |

规则为`m方向-值即可。`<br>
可选的方向

| a  | l | r | t | b |  x   |  y   |
|:--:|:-:|:-:|:-:|:-:|:----:|:----:|
| 四周 | 左 | 右 | 顶 | 底 | 水平左右 | 竖向上下 |

外边距如果觉得数据不够用嫌小，还可以这样使用`m方向-n值`比如外边距 40 可以写成：`ma-n10`，n\*4 倍的数据，n 为 1-25

### 负数外边距

**还可以使用负方向**<br>
<span style="color:red">规则和上方样，需要加上-号。比如向上负：mt--24,表示负 24rpx，ml-n10 表示向左负 40rpx</span>

### 内边距

| 类名 | 方向 |  值   |         示例         |
|:--:|:--:|:----:|:------------------:|
| p  | a  | 0-50 | pa-10,四周内边距为 10upx |

规则为`p方向-值即可。`<br>
可选的方向

| a  | l | r | t | b |  x   |  y   |
|:--:|:-:|:-:|:-:|:-:|:----:|:----:|
| 四周 | 左 | 右 | 顶 | 底 | 水平左右 | 竖向上下 |

内边距如果觉得数据不够用嫌小，还可以这样使用`p方向-n值`比如内边距 40 可以写成：`pa-n10`，n\*4 倍的数据，n 为 1-25

## Vue TS 规范

### 变量命名规范

```ts
//TODO 常量命名（CONSTANT_CASE）表示某个值不可被修改.它还可以用于虽然技术上可以实现,但是用户不应当试图修改的值,比如并未进行深度冻结（deep frozen）的值.
const UNIT_SUFFIXES = {
    age: '岁',
    cm: '厘米',
    kg: '千克',
    auth: '已认证',
    ontAuth: '未认证',
};
//TODO 接口本身使用 UpperCamelCase 方式命名,不要在接口名前加I.接口成员使用 lowerCamelCase 方式命名.
//TODO 成员上方必须加单行注释
declare interface UserInfo {
    //接口成员 小驼峰
    age: number;
    //接口成员 小驼峰
    nickName: string;
    name: string;
    //接口成员混合类型
    card: string | number;
    //认证状态 可有可无
    isLogin?: boolean;
    //生日
    birthday?: string;

    camelCaseFunc?(): number;
}

//TODO 变量使用 camelCase 方式命名.经常会变量与接口名称一致,所以变量小驼峰,接口大驼峰便于区分.
let userInfo: Ref<UserInfo> = ref({
    age: 18,
    nickName: '刘老六',
    name: '刘猛',
    card: 152104199300000000,
    birthday: '1993-12-25',
});
//TODO 解构访问和使用对象的多个属性时,使用对象解构.
const {name, age} = userInfo.value;
//TODO 引用类型变量应该保证类型正确,不正确的需要手动声明.后期需要改变的变量使用 let 定义
let countList: number[] = Array.from<number>({length: 5}).fill(0);
let shopList = ['第一', '第二'];
//TODO 使用 push 添加数据
countList.push(1);
shopList.push('addItem');
//TODO 展开运算符
const foo = {
    num: 1,
};
```

### 函数声明规范

```ts
class TodoItem {
    //TODO 字段初始化省略构造函数
    private readonly userList: string[] = [];
    //TODO 私有属性和方法添加下划线前缀
    private _toastCount: number = 1;

    private _log() {
        console.log(this._toastCount);
    }

    //TODO 接口名称中应包含创建这一接口的原因.（例如,在为类 TodoItem 创建一个将其转为 JSON 格式以用于存储或者序列化的接口时,可以将这一接口命名为 TodoItemStorage .）
    TodoItemStorage() {
    }

    //TODO 方法名使用动词+名词
    setUserName() {
    }

    //TODO 函数使用 lowerCamelCase 方式命名.
    lowerCamelCase() {
    }
}
```

| 定义      | 名词 | 定义      | 名词 |
|:--------|:--:|:--------|:--:|
| create  | 添加 | push    | 推送 |
| delete  | 删除 | send    | 发送 |
| update  | 更新 | notify  | 通知 |
| get     | 获取 | sync    | 同步 |
| list    | 列表 | bind    | 绑定 |
| count   | 统计 | unbind  | 解绑 |
| batch   | 批量 | open    | 开启 |
| search  | 搜索 | close   | 关闭 |
| query   | 查询 | cancel  | 取消 |
| apply   | 申请 | done    | 结束 |
| confirm | 确认 | upload  | 上传 |
| check   | 检查 | accept  | 同意 |
| verify  | 验证 | reply   | 回复 |
| change  | 更改 | refresh | 刷新 |
| fetch   | 拉取 | clear   | 清空 |

### 注释规范

使用WebStorm [Show Comment](https://plugins.jetbrains.com/plugin/18553-show-comment) 插件实现

```ts
/**
 * 文章分类
 */
export function getArticleTypeList() {
    return request.Get<[ArticleType]>('article_category');
}
```

```ts
declare interface AccountParams {
    /**
     * 地址
     */
    bind_address: string;
    /**
     * 燃气号，选填，没有则留空
     */
    bind_gas?: string;
    /**
     * 身份证
     */
    bind_idcard: string;
    /**
     * 姓名
     */
    bind_name: string;
    /**
     * 手机号
     */
    bind_phone: string;
    /**
     * 小区ID
     */
    bind_village: number;
    /**
     * id，选填，不传新增，传了编辑
     */
    id?: number;
    /**
     * code，验证码
     */
    code: number;
}
```

## 框架和库规范

### **请求拦截与封装** [Alova](https://.js.org)

### **Uniapp Ui 框架** [TMUI VUE3.0](https://tmui.design/)

## 数据请求和处理最佳实践

```ts
// 多级联动
// 提交字段type,date
// 监听变化字段[segId, weekbar, refresh]
import {useWatcher} from 'alova';
import {userBespeak} from '@/services/api/user/bespeak';
//切换器
const segList = ref([
    {text: '祭祀', id: 1},
    {text: '祭扫', id: 5},
]);
//切换器id
let segId = ref(segList.value[0].id);
//选择的日期
let weekbar = ref(nowDate);
const {
    loading,
    data: bespeak,
    error,
} = useWatcher(() => userBespeak({type: segId.value, date: weekbar.value}), [segId, weekbar, refresh], {
    force: true,
    debounce: 500,
    immediate: true,
    initialData: [],
});
// 登录请求
import {useUserInfo} from '@/state/modules/user-info';

useUserInfo()
    .login({code: 'code'})
    .then((res) => {
        console.log(res);
        uni.navigateBack();
    })
    .catch((err) => {
        console.log('错误', err);
    });
```

## 团队协作

### Git 项目提交规范

#### 提交类型

| 提交类型       | 标题        | 描述                                                            |
|------------|-----------|---------------------------------------------------------------|
| `feat`     | 特征        | 新功能、新特性                                                       |
| `fix`      | Bug 修复    | bug 修复                                                        |
| `docs`     | 文档        | 仅文档更改                                                         |
| `style`    | 风格        | 不影响代码含义的更改（空格、格式、缺少分号等）                                       |
| `refactor` | 代码重构      | 重构，在不影响代码内部行为，功能下的代码修改                                        |
| `perf`     | 性能改进      | 更改代码，以提高性能                                                    |
| `test`     | 测试        | 添加缺失的测试或纠正现有的测试                                               |
| `build`    | 构建        | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| `ci`       | 持续集成      | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改    | 不修改 src 或测试文件的其他更改                                            |
| `revert`   | 还原        | 恢复之前的提交                                                       |
| `release`  | 发布新版本     | \-                                                            |
| `workflow` | 工作流相关文件修改 | \-                                                            |

#### 提交别名

| 提交类型               | 映射到     | 标题   | 描述                  |
|--------------------|---------|------|---------------------|
| `initial`          | `feat`  | 最初的  | 初始提交                |
| `dependencies`     | `fix`   | 依赖项  | 更新依赖项               |
| `peerDependencies` | `fix`   | 对等依赖 | 更新对等依赖项             |
| `devDependencies`  | `chore` | 开发依赖 | 更新开发依赖              |
| `metadata`         | `fix`   | 元数据  | 更新元数据（package.json） |
