### vuejs study note
1. App.vue中使用stylus时候,安装完stylus-loader提示ERROR in Cannot find module 'stylus' vue.

    安装一下stylus即可.

    命令: npm install stylus --save-dev
2. 组合css属性实现行尾省略号效果
     
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
