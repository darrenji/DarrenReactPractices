## 0201 渲染静态内容 

【问题】

在Hello World中渲染了一个div,如何渲染包含Bootstrap样式的代码段呢？  

【解决】


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

【问题】  

创建模具的时候，怎样把变量放进去，以及如何对变量赋值呢？  

【思路】


1. 创建模具的时候，把变量放在模具里  
2. 创建元素的时候，给模具中的变量赋值
3. 把元素渲染到页面  

【分析】

创建模具的时候，模具中有一个props属性。

## 0203 模具嵌套 ##

【问题】  

以上，分别尝试了用模具生产静态内容和动态内容。

模具如何嵌套呢？一个模具在另一个模具是以怎样的形式呈现？一个模具的变量在另一个模具中又是怎样呈现？

【思路】

嵌套的模具照常写，被嵌套的模具呈现在其他模具中有其固定写法。

【分析】

创建了一个名称为MyBadge的模具，它有2个变量，一个是title,一个是number。

+ 被嵌套的模具MyBadge在另一个模具中是以元素呈现的：`<MyBadge />`
+ 被嵌套的模具MyBadge的变量tile,number在另一个模具中是以元素属性呈现并赋值的：`<MyBadge title={this.props.title} number={this.props.number} />`

## 0204 渲染一个模具的多个实例 ##
【问题】

以上，可以把嵌套的模具渲染出来，把Thumbnail渲染出来。

那如何把Thumbnail的列表渲染出来呢？

【思路】

需要创建一个Thumbnail列表对应的模具，在这个模具中，遍历数组，把数组元素值赋值给Thumbnail这个模板。

【分析】

Thumbnail列表模具在遍历数组的时候，有了`<Thumbnail {...thumbnailProps} />`的一个写法，意思是，把thumbnailProps中的各个字段值赋值给Thumbnail模具中同名的字段。