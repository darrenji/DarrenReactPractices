## React的Hello World ##

1、模具

    var someClass = React.createClass({});

2、模具出东西

	var element = React.createElement(someClass);

3、模具出来的东西放到页面上

	ReactDOM.render(element, document.body);

## 引用React相关js文件 ##

    <script src="../lib/react.js"></script>
    <script src="../lib/react-dom.js"></script>
    <script src="../lib/browser.min.js"></script>
    
    <script type="text/babel"></script>


