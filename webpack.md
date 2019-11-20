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
        写法1:  
        ```
        export const name = 'calculator';
        export const add = function(a,b) { return a+b; };
        ```
          写法2:
        ```
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
        如果工程有多个入口，我们需要为每个入口定义chunk name，来作为该chunk的唯一标示。entry的配置可以有多种形式L：字符串、数组、对象、函数. 


        
         
        


