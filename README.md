## 🚀一、主要技术栈

- [Vue3.4](https://cn.vuejs.org/)
- [Typescript](https://www.tslang.cn/index.html)
- [Vite4](https://vitejs.cn/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue-Router](https://router.vuejs.org/zh)
- [Less](https://less.bootcss.com/)

## ✈️二、主要插件

- [axios](https://github.com/axios/axios) 网络请求库
- [mitt](https://github.com/developit/mitt) 事件总线
- [dayjs](https://github.com/iamkun/dayjs) 时间处理工具
- [vue-i18n](https://github.com/intlify/vue-i18n-next) 国际化
- [lodash](https://github.com/lodash/lodash) 实用工具库
- [js-base64](https://github.com/dankogai/js-base64) Base64加密解密工具
- [localforage](https://github.com/localForage/localForage) IndexedDB数据存储库
- [jszip](https://github.com/Stuk/jszip) Zip压缩、解压工具
- [decimal.js](https://github.com/MikeMcl/decimal.js) 高精度运算工具
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) 中文转拼音工具
- [vueuse](https://github.com/vueuse/vueuse) Vue组合式API实用工具集

## 🚁三、其他插件

- `basic-ssl` 开发环境下https访问
- `autoprefixer + postcss` 编译时自动加CSS兼容性前缀
- `vite-plugin-pwa` 实现网站作为应用程序安装，从浏览器分离
- `cspell` 拼写检查工具
- `eslint` 代码校验工具
- `prettier` 代码美化工具
- `stylelint` css检验工具(主要用来css属性排序)

## 🏡四、模块列表

- Zip包下载
- 更新公告
- 邮箱
- 设置
- 音效反馈
- 音乐播放器
- 鼠标悬浮反馈
- 小贴士小窗
- 个人中心
- 任务中心
- 皮肤、技能竞猜活动
- 英雄列表
- 英雄详情(包含基本信息页、关系网页、皮肤语音页、技能页)
- 皮肤列表
- 英雄海报、皮肤海报合集列表
- 装备三级联动
- 英雄夺宝
- 皮肤夺宝
- 道具商店、英雄碎片商店和皮肤碎片商店、王者水晶商店和荣耀水晶商店
- 铭文列表、铭文搭配、铭文套装及套装信息
- 背包
- 开箱、英雄熟练度升级、英雄兑换和皮肤兑换、双倍道具卡和夺宝周卡
- 乂宝部件个性化套装搭配及购买、部件订单列表
- 可点击播放语音的弹幕
- 个人数据统计
- 召唤师卡数据合并与读取写入

## ✨五、项目细节

### 1、PWA应用

当浏览网站`三分钟后`会提示安装`PWA`应用，安装后网站将会从浏览器`分离`成为单独的应用程序，`体验更佳`。

### 2、Zip下载

为了解决在体验时出现音效点击会因为`网速问题`迟迟没有播放，贴图还需要`边看边加载`。

网站素材及游戏数据采用下载`压缩包`，部署在`Github`。

下载后`解压`并存储在内存中，访问内存中的图片，提高网站浏览的`顺畅度`。

如果浏览器刷新，由于`缓存`的原因，压缩包不会`重新下载`，但需要`重新解压`。

下载的资源总共不足`10MB`，分包下载是为了`方便更新`。

下载资源时按顺序`依次下载`，不会`同时下载`，`设计如此`。

下载的游戏数据存储在`IndexDB`。

### 3、版本更新

版本分为`网站部署版本`和`数据版本`，检测到新版会在网站下载资源之前弹出更新弹窗。

通过请求`版本JSON文件`获取两个版本号与本地版本号`比对`，如果是部署版本更新，则要求点击按钮`刷新浏览器`并写入版本号。

如果是数据版本更新，点击按钮后`关闭弹窗`并`删除本地指定数据库`。

此时进入`下载阶段`，下载是会判断本地是否存在指定数据来决定是否下载并`解压数据`。

### 4、数据存储

用户数据加密后存储在`LocalStorage`，当在个人中心`退卡`时，会导出一个`召唤师卡片文件`，下次登录可凭此卡在任何设备上登录。

### 5、数据展示

英雄海报、皮肤海报、铭文贴图加载时，会`读取本地`下载的小图，加载大图时，将小图模糊，当大图加载完成后，替换为大图并去除模糊。

每一张皮肤海报包含了三种尺寸：小图(100×100，用于`模糊加载`)、中图(640×294，用于列表`封面展示`)、大图(2351×1080，用于英雄详情页`全屏皮肤背景`)、4K图(用于查看大图及`下载原图`)。

英雄列表、商城-碎片商店-英雄列表采用`分页加载`，皮肤列表、商城-碎片商店-英雄列表、商城-水晶商店-皮肤列表采用`虚拟列表`，图集列表采用`瀑布流布局`+`分页加载`，当屏幕尺寸缩小时，通过改变列表一行的个数来进行适配，`虚拟列表`和`瀑布流布局`都有适配。

所有图片列表都使用了`懒加载`，即进入`可视区`后才会加载图片，但做了一个`防抖`，必须停留可视区`250ms`才会加载，不会加载`快速略过`的图片。

### 6、夺宝及开箱概率

每个普通道具的数量为`2`，每个稀有道具的数量为`1`，以这样的方式存在`奖池`中，每次夺宝和开箱会重新`打乱奖池`并`随机获取`其中一个。

### 7、乂宝

跟随鼠标的`3D`方块，通过`CSS`拼接六面合成一个`立方体`。

乂宝页的`乂宝`跳跃动画使用的是`JS`的`Element.animate`帧动画，在进入`乂宝页`和购买`乂宝`部件装扮时调用并播放帧动画函数。

## 📚六、素材来源

- 英雄头像、技能图标、图片素材——[王者荣耀官网](https://pvp.qq.com)
- 英雄语音——[王者世界观体验站](https://pvp.qq.com/ip)
- 点击音效——游戏内录制视频、提取音频、截取音频
- 英雄封面——对`100`多个英雄的海报进行裁剪获取
- 技能信息——游戏内对每个英雄的详情页进行截图、识字、富文本编辑器对关键文字设置颜色
- 英雄基础信息——手敲
- 游戏装备——游戏内截图、抠图、利用深度卷积神经网络进行修复

## 🎉七、网站地址

> Github部署的网站，需要科学上网，勉强适配手机，但为了更好地体验，推荐使用使用电脑横屏浏览。

- 访问地址：https://lengyibai.github.io/wzry
- Github仓库：https://github.com/lengyibai/wzry

推送到 `main` 分支后，GitHub Actions 会自动执行依赖安装、Vite 构建并发布到 GitHub Pages；也可以在 Actions 页面手动运行 `Deploy to GitHub Pages`。首次启用时，请在仓库 `Settings > Pages` 中将 `Build and deployment > Source` 设为 `GitHub Actions`。

⭐求Star⭐求Star⭐求Star⭐

## 🌈八、29张截图

![0.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/437ff4ef34dc42a392379bda2cb69ea8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=36424&e=png&b=060606)

![1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/263238a6fdb24c548938570147b8a201~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=448001&e=png&b=0b2940)

![2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52094c20e1254d48b255cd2b85b3e63c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=479437&e=png&b=837f68)

![3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee5f1106804b46c1b36fe299bb448b24~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=580184&e=png&b=11243d)

![4.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc7cd05cece842be99b4bc9c7eb28f6e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=737423&e=png&b=15212c)

![5.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d7d294089c54c6ca5aa46532b7e48ba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=741991&e=png&b=2e2825)

![6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec222ef51cb046de94556e22e9e3bd6c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=728145&e=png&b=15202c)

![7.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bcf4d18eec4505beb21db37448a2fc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=769212&e=png&b=3d1f29)

![8.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbf2c97396c54cc89b776e8ec172ba30~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=496208&e=png&b=1d4074)

![9.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0590da7b4e914540944f22673605a855~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=415791&e=png&b=111f34)

![10.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b6e7385ff9e481184c4cf20fd7bbd6d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=335808&e=png&b=11243d)

![11.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36dc8b16bd724a8baec15bda023fe842~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=328977&e=png&b=0e1f34)

![12.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8d132b8a21340618f3ddab6762963a8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=370216&e=png&b=11233b)

![13.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1668841c9e174530b82b2d5be2359898~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=351863&e=png&b=102138)

![14.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b28e0e1b6842484ca5ed0b343db29de3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=353648&e=png&b=11243c)

![15.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a453a5bb1e964a3ab19d7d1be4c28df8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=698723&e=png&b=3b1e2a)

![16.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbf270be5c034c0a97ed2dbffc13dd93~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=307514&e=png&b=11243d)

![17.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ceef809ee4d84b738843830347e191c5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=307228&e=png&b=11223c)

![18.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d3aa7a87a9e4a25b971f0358b83e839~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=305736&e=png&b=11243d)

![19.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98718d0e8b0e4c20b57f38c2e9f78001~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=261199&e=png&b=0f1e35)

![20.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/febb2044971e456692ff215e89da1003~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=279191&e=png&b=1f4476)

![21.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fa56f275ccc48a583e998ff866cd6e1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=691283&e=png&b=11233d)

![22.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c13a1b421884cd9a4dc8a14fef00838~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=748920&e=png&b=12233e)

![23.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95a788fb9a5e4819908a869811c553ca~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=776571&e=png&b=12233e)

![24.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c94c2c8dd2c4bb792e0cfb534704210~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=902818&e=png&b=2b262c)

![25.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c8159d14f644839aec06fcc5dada3d8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=606374&e=png&b=111012)

![26.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e97d17d879c244659a61c27ff07bd0e1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=600926&e=png&b=0f1319)

![27.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6556fa3147c4ba393e1b824e2266d36~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=347960&e=png&b=11233b)

![28.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0497baca754a47588123a3319af623f0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=558026&e=png&b=111f30)
