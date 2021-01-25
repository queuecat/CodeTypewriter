# CodeTypewriter

#　使用

1. 设置一个html容器，一般使用pre标签作为容器，将打印字符放置到其中

   ```html
   <pre>
   function main() {
       <div class="codetypewriter"></div>
   }
   </pre>
   ```
   
   

2. 引入CodeTypewriter.js文件，导入该文件后将会获得一个构造函数CodeTypewriter

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

     ![](https://github.com/queuecat/CodeTypewriter/blob/main/image/%E5%85%89%E6%A0%87%E6%A0%B7%E5%BC%8F.gif?raw=true)

   - **animation**  

     ![](https://github.com/queuecat/CodeTypewriter/blob/main/image/%E5%8A%A8%E7%94%BB%E6%A0%B7%E5%BC%8F.gif?raw=true)

3. 使用new关键字构造一个对象并调用init方法即可