# webpack学习
### webpack使用
1. 安装
    - 初始化项目 npm init
    - 项目安装webpack  npm install webpack webpack-cli --save-dev
        - webpack是核心模块，webpack-cli是命令行工具。
    - 查看版本 npx webpack -v 以及 npx webpack-cli -v
2. 打包 
    - npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
        - 第一个参数entry是资源打包的入口。
        - 第二个参数output-filename是输出资源名。
        - 第三个参数mode是打包模式。开发一般设置development模式
3. 编辑package.json文件
    - ```
    "scripts":{
        "build":"webpack --entry=./index.js --output-filename=bundle.js --mode=development"
    },
    ```
    - 打包执行 npm run build
4. 查看webpack命令行 npx webpack -h
5. Webpack 默认配置文件为webpack.config.js
    - 创建webpack.config.js并添加：  
        ```
        module.exports = {
            entry:'./src/index.js',
            output:{
                filename:'bundle.js',
            },
            mode:'development',
        }
        ```
    - 编辑package.json
      ```
      "scripts": {
            "build":"webpack"
        },
      ```
    - 打包 npm run build
6. 便捷的本地开发工具
    - webpack-dev-server
    - 安装命令：npm install webpack-dev-server --save-dev
    - 在package.json中添加一个dev指令  
    ```
    "scripts": {
        "build":"webpack",
        "dev":"webpack-dev-server"
    },
    ```
    - 编辑webpack.config.js，添加webpack--dev-server
    ```
    module.exports = {
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
        },
        mode:'development',
        devServer:{
            publicPath:'/dist'
        }
    }
    ```  
    添加了一个devServer对象。
    - 直接使用Webpack开发和使用webpack-dev-server有一个很大的区别，前者每次都会生成budnle.js,而webpack-dev-server只是将打包的结果存放在内存中，并不会写入实际的bundle.js.  
      
### 模块打包
1. 模块
    - CommonJS中规定每个文件就是一个模块。
    - js文件通过Script标签插入页面中与封装成CommonJs模块最大的不同在于：  
    前者的顶层作用域是全局作用域，在进行变量及函数声明时会污染全局环境。  
    而后者会形成一个属于模块自身的作用域，所有的变量及函数只有自己能够访问，对外是不可见的。
    - 导出 
        - 通过module.exports可以导出模块中内容。
    - 导入
        - 在CommonJS中使用require进行模块导入。
2. ES6 Module
    - 模块输出 export
        - 命名导出：  
        ```
        写法1: 
        export const name = 'calculator';
        export const add = function(a,b) { return a+b; };
        ```
        ```
        写法2:
        const name = 'calculator';
         const add = function(a,b) { return a+b; };
        export { name ,add };
        ```
        - 导出时可以使用as关键词对变量重命名。  
        ```
        const name = 'calculator';
        const add = function(a,b) { return a+b; };
        export {name,add as getSun };
        ```
        - 默认导出只能有一个
        ```
        export default {
            name : 'calculator';
            add : function(a,b) { 
                return a + b; 
            };
        }
        ```  
        可以将export default理解为对外输出了一个名为default的变量，因此不需要像命名导出一样进行变量声明，直接导出值即可。
    - 模块导入 import
        - 例子：  
        ```
        // calculator.js  
        const name = 'calculator';  
        const add = function(a,b) { return a+b; };  
        export { name ,add };

        // index.js
        import {name ,add} form './calculator.js';
        add(2,3);
         ```  
         加载带有命名导出的模块时，import后面要跟一堆打括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完全一致。导入变量的效果相当于在当前作用域下声明了这些变量（name和add），并且不可对其进行更改，也就是所有导入的变量都是只读的。 
        - as 导入重命名：  
        `import { name,add as calculateSun } from './calculator.js';`
        - 整体导入重命名：  
        `import * as calculator from './calculator';`  
        使用import * as <myModule>可以把所有导入的变量作为属性值添加到<myModule>对象中，从而减少了对当前作用域对影响。
3. 资源输入输出：  
    Webpack会从入口文件开始检索，并将具有依赖关系的模块生成一棵依赖树，最终得到一个chunk。由这个chunk得到的打包产物我们一般称之为bundle。
    - 资源处理流程
        - 打包入口`entry`
            - 指定Webpack具体从源码目录下对哪个文件开始打包。
        - 打包代码块`chunk`
            - 存在依赖关系的模块会在打包时被封装为一个chunk。
        - 打包产物`bundle`
            - 由chunk得到的打包产物。
    - 配置资源入口
        - 资源入口路径前缀`context`  
        在配置时要求必须使用绝对路径的形式，只能为字符串。
        ```
        //以下两种配置达到的效果相同，入口都为<工程根路径>/src/scripts/index.js
        module.exports = {
            context:path.join(__dirname,'./src'),
            entry:'./scripts/index.js',
        };
        module.exports = {
            context:path.join(__dirname,'./src/scripts'),
            entry:'./index.js',
        };
        ```
        - 定义打包名称 `entry`  
        定义 chunk name。如果工程只有一个入口，那么默认其chunk name为“main”；
        如果工程有多个入口，我们需要为每个入口定义chunk name，来作为该chunk的唯一标示。entry的配置可以有多种形式L：字符串、数组、对象、函数。
        ```
        //1.字符串类型入口
        module.exports = {
            entry:'./scripts/index.js',
            output:{
                filename:'bundle.js',
            },
            mode:'development',
        };
        ```
        ```
        //2.数组类型入口
        module.exports = {
            entry:['babel-polyfill','./src/index.js'],
        };
        ```
        备注：传入一个数组的作用是将多个资源预先合并，在打包时Webpack会将数组中的最后一个元素作为实际的入口路径。上面配置等同于：
        ```
        // webpack.config.js
        module.exports = {
            entry:'./src/index.js',
        };

        //index.js
        import 'babel-polyfill';
        ```
        ```
        //3.对象类型入口
        module.exports = {
            entry:{
                // chunk name为index，入口路径为./src/index.js
                index:'./src/index.js',
                // chunk name 为lib，入口路径为./src/lib.js
                lib:'./src/lib.js',
            }
        }
        
        //对象属性值也可以为字符串或数组。如：

        module.export = {
            entry:{
                index:['babel-polyfill','./src/index.js'],
                lib:'./src/lib.js',
            },
        };
        //备注：在使用字符串或者数组定义单页面时，并没有办法更改chunk name，只能为“main”。在使用对象来定义多入口时，则必须为每一个入口定义chunk name。
        ```
        ```
        4.函数类型入口
        用函数定义入口时，只要返回上面介绍的任何配置形式即可，如：

        //返回一个字符串型入口
        module.exports = {
            entry:() => './src/index.js',
        };

        //返回一个对象型的入口
        module.exports = {
            entry:() => ({
                index:['babel-polyfill','./src/index.js'],
                lib:'./src/lib.js',
            }),
        };

        传入一个函数的优点在于我们可以在函数体里添加一些动态的逻辑来获取工程的入口。另外，函数也支持返回一个Promise对象来进行异步操作。
        module.exports = {
            entry: () => new Promise((resolve) => {
                //模拟异步操作
                setTimeout(() => {
                    resolve('./src/index.js');
                },1000);
            }),
        };
        ```
    - 实例：
        - 单页面应用（SPA)  
        当一个bundle大于250kB时（压缩前）会认为这个bundle已经过大了，在打包时会发生警告。
        - 提取 vendor  
       `vendor` 的意思是“供应商”，在Webpack中vendor一般指的是工程所使用的库、框架等第三方模块集中打包而产生的bundle。例如：
       ```
       module.exports = {
           context:path.join(__dirname,'./src'),
           entry:{
               app:'./src/app.js',
               vendor:['react','react-dom','react-router'],
           },
       };
       ```
       - 多页面应用  
       入口和页面一一对应
       ```
       module.exports = {
           entry:{
               pageA:'./src/pageA.js',
               pageB:'./src/pageB.js',
               pageC:'./src/pageC.js',
               vendor:['react','react-dom'],
           }
       }
       ```
       - 配置资源出口
       ```
       const path = require('path');
       module.exports = {
           entry:'./src/app.js',
           output:{
               filename:'bundle.js',
               path:path.join(__dirname,'assets'),
               publicPath:'/dist/',
           },
       }
       ```
       filename的作用是控制输出资源的文件名，其形式为字符串。  
       在多入口的场景中，我们需要为对应产生的每个bundle指定不同的名字，Webpackz支持使用一种类似模版语言的形式动态地生成文件名，如：
       ```
       module.exports = {
           entry:{
               app:'./src/app.js',
               vendor:'./src/vendor.js',
           output:{
               filename:'[name].js',
           },
       }
       ```
       在资源输出时，上面配置的filename中的[name]会被替换为chunk name，因此最后项目中实际生成的资源是vendor.js与app.js.app.js.
       - `path` 可以指定资源输出的位置，要求值必须为绝对路径。如：
       ```
       const path = require('path');
       module.exports = {
           entry:'./src/app.js',
           output:{
               filename:'bundle.js',
               path:path.join(__dirname,'dist'),
           },
       };
       ```
       上述配置将资源输出的位置设置为工程的dist目录。在Webpack 4 以前的版本中，打包资源默认会生成在工程根目录，因此我们需要上述配置；而在Webpack 4之后，output.path已经默认为dist目录，除非我们需要更改它，否则不必单独配置。
       - `publicPath` 用来指定资源的请求位置。
       1. HTML相关  
       与HTML相关，我们可以将publicPath指定为HTML的相对路径，在请求这些资源会以当前页面的HTML所在路径上相对路径，构成实际请求的URL。如：
       ```
       //假设当前HTML地址为 https://example.com/app/index.html
       //异步加载资源名为 0.chunk.js
       publicPath:"" 实际路径https://example.com/app/0.chunk.js
       publicPath:"./js"  //实际路径https://example.com/app/js/0.chunk.js
       publicPath:"../assets"  //实际路径https://example.com/assets/0.chunk.js
       ```
       2. Host相关  
       若`publicPath`的值以“/”开始，则代表此时publicPath是以当前页面的host name为基础路径的。如：
       ```
       //假设当前HTML地址为 https://example.com/app/index.html
       //异步加载资源名为 0.chunk.js
       publicPath:"/" 实际路径https://example.com/0.chunk.js
       publicPath:"/js"  //实际路径https://example.com/js/0.chunk.js
       publicPath:"/dist"  //实际路径https://example.com/dist/0.chunk.js
       ```
       3. CDN相关
       以上两种配置都是相对路径，我们也可以使用绝对路径形式配置`publicPath`。这种情况一般发生于静态资源放在CDN上面时，由于其域名和当前页面域名不一致，需要以绝对路径的形式进行指定。当publicPath以协议头或相对协议的形式开始时，代表当前路径是CDN相关。如：  
       ```
       //假设当前HTML地址为 https://example.com/app/index.html
       //异步加载资源名为 0.chunk.js
       publicPath:"http://cdn.com/" 实际路径http://cdn.com/0.chunk.js
       publicPath:"https://cdn.com/"  //实际路径https://cdn.com/0.chunk.js
       publicPath:"//cdn.com/assets/"  //实际路径//cdn.com/assets/0.chunk.js
       ```
4. 预处理器`loader`
    - 一切皆模块  
    在Webpack中所有静态资源都是模块，在CSS中可能会引用图片和字体等。对于Webpac来说，所有这些静态资源都是模块，我们可以在JS中加载CSS文件。
    - loader 概述  
    每个loader本质上都是一个函数。在Webpack 4之前，函数的输入和输出都必须为字符串；在Webpack 4之后，loader也同时支持抽象语法树(AST）的传递，通过这种方式来减少重复的代码解析。用公式表达loader的本质则为以下形式：
    ```output = loader(input)```
    例如：当我们使用babel-loader将ES6+的代码转化为ES5时，上面的公式如下：
    ```ES5 = babel-loader(ES6+)```
    loader可以是链式的。我们可以对一种资源设置多个loader，第一个loader的输入是文件源码，之后所有loader的输入都为上一个loader的输出。用公式表达则为：
    ```output = loaderA(loaderB(loaderC(inout)))```
    如在工程中编译SCSS时，我们可能需要如下loader:
    ```Style 标签 = style-loader(css-loader(sass-loader(SCSS))```
    - loader 的配置  
        - loader 的引入  
        loader都是一些第三方npm模块，需要先安装。  
        例如在js中引入css文件需要：  
        在工程目录下执行：  
        `npm install css-loader`  
        `npm install style-loader`  
        然后将loader引入工程中，具体配置如下：
        ```
        module.exports = {
            //...
            module:{
                rules:[{
                    test:/\.css$/,
                    use:['style-css','css-loader],
                }],
            },
        };
        ```
        和loader相关配置都在module对象中，其中module.rules代表了模块都处理规则。每条规则内部可以包含很多配置项，这里我们只使用最重要的两项--test和use。  
            - test  
            正则匹配，只有匹配上的模块才会使用这条规则。  
            - use
            use 可接受一个数组，数组包含该规则所使用的loader。  
            Webpack打包是按照数组从后往前的顺序将资源交给loader处理的，因此要把最后生效的放在前面。
    - loader options  
    loader会提供一些配置项，在引入loader的时候可以通过options将它们传入。如：
    ```
    rules:[
        {
            test:/\.css$/,
            use: [
                'style-loader',
                {
                    loader:'css-loader',
                    options:{
                        //css-loader 配置项
                    }
                }
            ],
        },
    ],
    ```
    有些loader可能会使用query来代替options,从功能来说没有太大区别。
    - 更多配置
        - 1.exclude和include 是用来排除或包含指定目录下的模块。  
        可接收正则表达式或者字符串(文件绝对路径)，以及由它们组成的数组。  
        例如：
        ```
        //使用exclude
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude:/node_modules/,
            }
        ],
        //上面exclude的含义是，所有被正则匹配到的模块都排除在该规则之外，也就是说node_modules中的模块不会执行这条规则。该配置通常是必加的，否则可能会拖慢整体打包的速度。
        ```
        ```
        //使用include配置
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                include:/src/,
            }
        ],
        //include代表该规则只对匹配到的模块生效。假如我们将include设置为工程的源码目录，自然而然就将node_modules等目录排除掉了。
        ```
        当`exclude`和`include`同时存在时，exclude的优先级更高。  
        所以我们可以对`include`中的子目录进行排除。
        - `resource`与`issuer`可用于更加精确地确定模块规则的作用范围。  
        在webpack中，我们认为被加载模块是resource,而加载者是issuer。  
        前面介绍的test、exclude、include本质上属于对`resource`也就是加载者的配置。  
        如果要对`issuer`加载者也增加条件限制，则需要另外写一些配置。  
        例如：
        ```
        //让/src/pages 目录下对JS可以引用CSS。
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude:/node_modules/,
                issuer:{
                    test:/\.js$/,
                    include:/src/pages/,
                },
            }
        ],
        ```
        只有/src/pages/目录下面的JS文件引用CSS文件，这条规则才会生效。  
        上面例子另外一种等价形式：
        ```
        rules:[
            {
                use:['style-loader','css-loader'],
                resource:{
                    test:/\.css$/,
                    exclude:/node_modules/,
                },
                issuer:{
                    test:/\.js$/,
                    include:/src/pages/,
                },
            }
        ],
        ```
        这两种形式无法并存，只能选择一种风格进行配置。
        - enforce 用来指定一个loader的种类。只接收“pre”或“post”两种字符串类型的值。  
        Webpack中的loader按照执行顺序可分为pre、inline、normal、post四种类型，上面直接定义的loader都属于normal类型，inline形式官方不推荐使用，而pre和post需要使用enfore来指定。  
        例如：
        ```
        rules:[
            {
                test:/\.js$/,
                enforce:'pre',
                use:'eslint-loader',
            }
        ],
        ```
        在配置中添加了一个`eslint-loader`来对源码进行质量检查。  
        其`enforce`的值为"pre",代表它将在所有正常loader之前执行，这样可以保证其检测的代码不被其它loader更改过。  
        当`enforce`的值为"post",代表它将在所有正常loader之后执行。
    - 常用loader介绍
        - babel-loader 用来处理ES6+并将其编译为ES5。  
        安装命令：`npm install babel-loader @babel/core @babel/preset-env`
        - ts-loader  用于连接Webpack与Typescript的模块。
        安装命令：`npm install ts-loader typescript`  
        注意：Typescript本身的配置并不在ts-loader中，而是必须要放在工程目录下的tsconfig.json中。
        - html-loader 用于将HTML文件转化为字符串并进行格式化，这使得我们可以把HTML片段通过JS加载进行。  
        安装命令：`npm install html-loader`
        - handlebars-loader 用于处理handlebars模版，在安装时要额外安装handlebars。  
        安装命令：`npm install handlebars-loader handlebars`
        - file-loader 用于打包文件类型的资源，并返回其publicPath。
        安装命令：`npm install file-loader`
        - url-loader 作用和file-loader一样，不同在于用户可以设置一个文件大小的阀值，大于阀值返回publicPath(资源引用的路径)，小于阀值则返回文件base64编码。  
        安装命令：`npm install url-loader`
        - vue-loader 用于处理vue组件。  
        安装命令：`npm install vue-loader vue vue-template-compiler css-loader`
5. 样式处理
    - 分离样式文件
        - 输出单纯的CSS文件*(因为文件有利于客户端缓存)  
            - 专门的插件：  
            extract-text-webpack-plugin(适用于Webpack4之前的版本)；  
            安装命令： `npm install extract-text-webpack-plugin`  
            单样式文件处理：  
            ```
            //index.js
            import './style.css';
            document.write('My Webpack app');

            /* style.css */
            body{
                display:flex;
                align-items:center;
                justify-content:center;
                text-align:center;
            }

            //webpack.config.js
            const ExtractTextPlugin = require('extract-text-webpack-plugin');

            module.exports = {
                entry:'./app.js',
                output:{
                    filename:'bundle.js',
                },
                mode:'development',
                module:{
                    rules:[
                        {
                            test:/\.css$/,
                            use:ExtractTextPlugin.extract({
                                fallback:'style-loader',
                                use:'css-loader',
                            }),
                        }
                    ],
                },
                plugins:[
                    new ExtractTextPlugin('[name].css')
                ],
            };
            ```
            多样式文件处理：  

            ```
            //  ./src/scripts/foo.js
            import '../style/foo-style.css';
            document.write('foo.js');

            //  ./src/scripts/bar.js
            import '../style/bar-style.css';
            document.write('bar.js');

            /*  ./src/style/foo-style.css */
            body{
                background-color:#eee;
            }

            /*  ./src/style/bar-style.css */
            body{
                color:#09c;
            }

            //webpack.config.js
            const ExtractTextPlugin = require('extract-text-webpack-plugin');

            module.exports = {
                entry:{
                    foo:'./src/scripts/foo.js',
                    bar:'./src/scripts/bar.js',
                },
                output:{
                    filename:'[name].js',
                },
                mode:'development',
                module:{
                    rules:[
                        {
                            text:/\.css$/,
                            use:ExtractTextPlugin.extract({
                                fallback:'style-loader',
                                use:'css-loader',
                            }),
                        }
                    ],
                },
                plugins:[
                    new ExtractTextPlugin('[name].css')
                ],
            };
            ```
            mini-css-extract-plugin(适用于Webpack4之后的版本)； 
    - 样式预处理
        - Sass  
        现在使用更多的是SCSS。
        安装命令：`npm install sass-loader node-sass`
        - Less  
        安装命令：`npm install less-loader less`
        - PostCss 编译插件的容器
        安装命令：`npm install postcss-loader`
        - Autoprefixer 自动前缀  
        安装命令：`npm install autoprefixer`
        - stylelint css质量检查工具  
        安装命令：`npm install stylelint`
        - CSSNext 结合PostCss可以使用最新的CSS语法特性。
        安装命令：`npm install postcss-cssnext`
        - CSS Modules 让CSS模块化  
        不需要额外安装模块，只要开启css-loader中的modules配置即可。
6. 代码分片
    - 通过入口划分代码  
    不常变动的一些库和工具，可以放在一个单独的入口中。
    - CommonsChunkPlugin  
    Webpack4之前自带的插件（Webpack之后就换成了SplitChunks).
    打包后记得在页面中添加一个`script`标签来引入commons.js,并且注意，该JS一定要在其他JS之前引用。
    - 提取vendor  
    单页面提取：单独创建一个入口vendor，使其包含需要提取的模块。这样就把模块变成了app和vendor这两个chunk所共有的模块。
    - 设置提取范围：  
    ```
    ...
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'commons',
            filename:'commons.js',
            chunks:['a','b'],
        })
    ]
    ```
    - 设置提取规则
        - `minChunks`  
        可以接受一个数字，当设置minChunks为n时，只有该模块被n个入口同时引用才会进行提取。这个阀值不会影响通过数组形式入口传入模块的提取。  
        `minChunks`支持传入一个函数。
        - `Infinity`  设置为无穷代表提取的阀值无限高，也就是说所有模块都不会被提取。
    - hash与长效缓存
    - optimization.SplitChunks (Webpack4改进之后的插件)
        - 默认配置
        ```
        splitChunks:{
            chunks:"async",
            minSize:{
                javascript:30000,
                style:50000,
            },
            maxSize:0,
            minChunks:1,
            maxAsyncRequests:5,
            maxInitialRequests:3,
            automaticNameDelimiter:'~',
            name:ture,
            cacheGroups:{
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    priority:-10,
                },
                default:{
                    minChunks:2,
                    priority:-20,
                    reuseExistingChunk:true,
                },
            },
        },
        ```
        1. 匹配模式  
        `chunks`有三个值，分别为：async(默认)、initial和all.  
        async 即只提取异步chunks，initial则只对入口chunk生效，all则是两种模式同时开启。
        2. 匹配条件  
        `minSize`,`minChunks`,`maxAsyncRequests`,`maxInitialRequests`都属于匹配条件。
        3. 命名  
        配置项name默认为ture.
        4. `cacheGroups` 
        可以理解成分离chunks时的规则。默认情况下有两种规则--`vendors`和`default`.  
        `vendors`用于提取所有node_modules中符合条件的模块。  
        `default`则作用于被多次引用的模块。  
        我们可以对这些规则进行增加或者修改，如果想要禁用某种规则，也可以直接将其置为false。
        当一个模块同时符合多个`cacheGroups`时，则根据其中的priority配置项确定优先级。
    - 资源异步加载  
        - `import()`
        - `require.ensure`

             
            
        
        
        




            
            
            








        
         
        


