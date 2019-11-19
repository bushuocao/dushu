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

        
         
        


