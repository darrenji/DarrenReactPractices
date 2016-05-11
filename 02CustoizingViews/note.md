# React和Bootstrap如何结合使用呢？

→在Bootstrap中，按如下创建Badges

<a href="#">Inbox<span class="badge">42</span></a>


<button class="btn btn-primary" type="button">
    Messages <span class="badge">4</span>
</button>

接下来，按React创建页面元素的三个步骤来写：

var MyBadge = React.createClass({
    render: function(){
        return <button class="btn btn-primary" type="button">
            Messages <span class="badge">4</span>
        </button>    
    }
});

var element = React.createElement(MyBadge);

React.render(element, document.body);

看上去没问题。

但实际报错了：Unknown DOM property class. Did you mean className?

因为<button class="btn btn-primary" type="button">和<span class="badge">4</span>中的class属性和React.createClass发生了冲突。

改成如下：

var MyBadge = React.createClass({
    render: function(){
        return <button className="btn btn-primary" type="button">
            Messages <span className="badge">4</span>
        </button>    
    }
});

