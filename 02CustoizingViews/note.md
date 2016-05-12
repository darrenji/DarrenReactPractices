## 0201 渲染静态内容 

【问题】

在Hello World中渲染了一个div,如何渲染包含Bootstrap样式的代码段呢？


**比如，在Bootstrap中，是按如下创建Badges**


    <a href="#">Inbox<span class="badge">42</span></a>
    
    
    <button class="btn btn-primary" type="button">
    Messages <span class="badge">4</span>
    </button>


**接下来，按React创建页面元素的三个步骤来写**  


    var MyBadge = React.createClass({
    	render: function(){
    			return <button class="btn btn-primary" type="button">
    			Messages <span class="badge">4</span></button>
    		}
    	});
    
    var element = React.createElement(MyBadge);
    
    React.render(element, document.body);


看上去没问题。


> 但实际报错了：Unknown DOM property class. Did you mean className?

因为`<button class="btn btn-primary" type="button">`和`<span class="badge">4</span>`中的class属性和React.createClass发生了冲突。


改成如下：

    var MyBadge = React.createClass({
    	render: function(){
    		return <button className="btn btn-primary" type="button">
    			Messages <span className="badge">4</span></button>
    	}
    });




## 0202 渲染动态内容 ##

1. 创建模具的时候，把变量放在模具里
2. 创建元素的时候，给模具中的变量赋值
3. 把元素渲染到页面