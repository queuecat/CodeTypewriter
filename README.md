# CodeTypewriter

#　使用

1. 引入CodeTypewriter.js文件，导入该文件后将会获得一个构造函数CodeTypewriter

   ```javascript
   new CodeTypewriter({
       element: document.querySelector(".codetypewriter"),//html容器
       data: "\tcout << \"Hello World\";\n\treturn 0;",//内容字符串
       animation: "lineFeed", //动画样式line | both | lineFeed
       cursor: "vertical" //光标样式 transverse | vertical
       time: 200 // 打印每个字符的时间
   }).init();
   ```

   - **cursor**  

     ![](/image/光标样式)

   - **animation**  

     ![](/image/动画样式)

2. 使用new关键字构造一个对象并调用init方法即可