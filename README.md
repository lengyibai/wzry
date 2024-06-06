![278098855-5af3b300-0cf6-462a-80c5-34c175365711.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98af25f498c54c409c8bb854feace28d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1440&s=945580&e=jpg&b=151414)

> `Vscode`同款风格搭配：[🌈Vscode外观定制🎨](https://juejin.cn/post/7374984900371644452)

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

- 访问地址：https://lengyibai.github.io/wztj
- Github仓库：https://github.com/lengyibai/wzry

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

## 👻九、工作悲惨经历

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d2064b0af744eebdff0d91ae3cb9b0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=924739&e=png&b=2a4265)

当时进了一家除了后端全是实习生的4个人的小公司实习，刚开始比较闲，回家也是打王者，闲着无聊就用`Vue2`做`王者图鉴`这个项目。这家公司写后台管理系统，以及地图，项目过于陈旧，老板审美略低，后面项目写起来太枯燥，同时维护4个项目，还有甲方的需求和BUG交织，作为实习生实在顶不住，迫于压力，选择离职，隔了一个月打电话让我写完剩下的功能，新来的实习生写不动，我没答应，最后离职当月的工资也没发。

![Image_1716956859916.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e17b2f789ca44ae18940a5e2dc32d782~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2133&h=1600&s=514981&e=jpg&b=c9c6b1)

![IMG_20240529_122853.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab714e0c20d543d6829bcddb8ff39f96~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600&h=3555&s=252029&e=jpg&b=b9bcc0)

毕业后工作不好找，`BOSS直聘`找了两个月，一次面试都没有，最后退租回家专心写我的项目，给这个项目开发更多的功能。失业了半年，项目也差不多完成了一个版本，最后在以前同事的内推下，靠这项目免技术面进了一家游戏公司，负责写`H5`游戏（没有使用`Canvas`）。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5d2708d9c5a464c831ff973d3b957b7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2133&h=1600&s=3848687&e=png&b=22262a)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9786682cd464fa4a36726d1e41c8169~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2133&h=1600&s=3123632&e=png&b=212529)

干了半年，由于要更换工作地点，大部分人不愿意换，导致小组解散。

但我又被另一个项目组组长挖到他那边写PC和H5的游戏大厅及活动。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4b69299ff3e400d8a259f0b32fb7e9d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2133&h=1600&s=2876076&e=png&b=87848a)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03277c10969442f3a26264986aade923~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2133&h=1600&s=3882156&e=png&b=82898f)

干了几个月，本来已经在年底涨薪名单中，由于老板跟客户介绍产品的时候游戏客户端数据出了问题，小组又解散了。其他员工嫌赔偿少，跟老板闹，老板在国外，最后赔偿老板直接不给了，赔偿也没办法拿到。

第一个小组的组长打算重启第一个项目自己运营，又把我拉上了，远程办公，偶尔聚在一起对接需求。发了第一个月的工资后，发不起工资，打算按项目收益来分红，由于推广推不起来，用户充值量少，而且后端数据上报问题一直解决不了，项目在这个月也凉了，大家伙一分钱也没挣到，白干了两三个月。

## 👾十、兴趣追溯

初二开始玩`Minecraft`，高中那会儿就开始通过修改`json`代码来美化`UI`，通过手机版`Photoshop`用阴影效果搞伪3D贴图制作`Minecraft`手机版材质包，发布到多玩我的世界盒子，收获了不少粉丝。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c5afbe2a51d463f86544d8fb9dd1ad4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=960&h=540&s=1331914&e=png&b=746582)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c3b424da3c4fbb8ef9ee802dc7f990~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=4055990&e=png&b=2b2416)

后来多玩我的世界盒子停服了，粉丝也就清空了...

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a0acc5613b945a480988e619ad44283~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1080&h=2340&s=1723495&e=png&b=fdf7e9)


到了大学，自然就看上了网页设计这门课程，整天沉迷代码，当时就开始用王者荣耀的素材设计充满动画效果的网页，参考：[在校学习HTML5+CSS半学年的成果之一](https://www.bilibili.com/video/BV1rT4y1G7uY)。

![QQ截图20240529115805.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b9e6d940d3b4db495b9ea084fed0cf7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=929024&e=png&b=dba97d)

王者图鉴是在`2022年3月`使用`Vue2`搭建的，一开始是为了统一自己的代码风格，在未来能够按照这个风格来写项目，项目里面的一些功能兴许也能在以后的项目中用上。从第一家公司离职后，就开始学习`Vue3`，学有所成后开始学习`Typescript`，看视频做的都是一些小案例，难以做到过目不忘，看文档也看不明白，打算直接上手，把我这个`Vue2`项目转成`Vue3+TS`。刚开始写类型声明，有什么类型报错解决不了的就去查，到后面发现结合实际项目去学`Typescript`真的超级容易，最后就靠这个项目进了第二家公司。

进了公司之后，因为兴趣，在业余时间继续维护这个项目，再加上自己也只玩王者荣耀，并且游戏官网素材也很丰富，对它的数据很熟悉，能很好地管理。

第二家公司解散后，当时网站仅仅是一个图鉴网站，没有什么新颖的地方，所以就考虑开始开发游戏夺宝这个稍微比较有难度的玩法。因为夺宝会衍生出很多功能，会加入各种道具，有道具就能兑换英雄和皮肤，有道具就有背包和商城。这个时候就会产生很多用户的体验数据，数据就通过`召唤师卡片文件`来存储，凭此卡可在`多端读取`自己的使用数据。

网站中`跟随鼠标跳跃移动的方块`，参考的王者荣耀的`灵宝`，取名为`乂(yì)宝`，与我网名的`弋`同音。其实在大学学完`JavaScript`(还没有系统性地学`ES6`，甚至还没不知道`CSS预处理器`)，那会儿就做过一个简易的，参考[小电视跳舞演示](https://www.bilibili.com/video/BV1bt4y167cE?p=3)以及[小电视制作历程](https://www.bilibili.com/video/BV1bt4y167cE?p=2)，也算是将我的一些想法更好的展现出来。

![QQ截图20240529115434.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d660e6bffd47469bbef948326501523b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=140736&e=png&b=24933e)

![QQ截图20240529115553.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/173e9540d8de46a8a4035652bc92a410~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=572695&e=png&b=f379b2)

总的来说，写这个项目的目的：

一是为了熟悉前端的工程化、代码规范化、模块化、组件化，养成比较良好的开发习惯，并且对我这个强迫症也是一种福利。

二是为了能在未来的项目中，用上里面现成的技术，这个项目包含了一些我在公司用过的效果和功能，毕竟里面的效果和功能是测试更新了很多次的，比较深刻。

三是为了面试，虽然不喜欢背八股文，但还是得略看一下，就当查漏补缺了，八股文为辅，这个项目为主。

四是因为兴趣，做过`Minecraft`材质包，自然就对设计网页感兴趣，玩过王者，自然要将这个项目贯彻到底。当然，做这个项目获得的成就感可比玩游戏多得多，兴趣是最好的老师，让我学前端时没那么枯燥，成就感也是最重要的“燃料”，带给我写这个项目的动力。


> PS：只要`标注作者`及`Github`地址，`允许搬运`文章内容。