## 创建class，创建模具 ##
    var MyClass = React.createClass({
		render: function(){
			return <div></div>
		}
    });

## 模具出东西 ##

	var element = React.createElement(MyClass);

## 把模具出的东西渲染到页面 ##
	ReactDOM.render(element, document.body);