//实际数据，字段与模具中的变量名对应
var options = {
    thumbnailData:[
        {
            title: 'Show Courses',
            number: 12,
            heder: 'Learn React',
            description: 'React is a fantastic new front end library for rendering web pages.React is a fantastic new front end library.',
            imageUrl: '../images/react.jpg'
        },{
            title: 'Show Courses',
            number: 25,
            heder: 'Learn Gulp',
            description: 'Gulp will speed up your workflow. Gulp will speed up your development workfow',
            imageUrl: '../images/react.jpg'
        }
    ]
};

//让模具出东西，并且给模具中的变量赋值
var element = React.createElement(ThumbnailList, options);

React.render(element, document.querySelector('.container'));
//被嵌套模具中埋下一些变量
//props属性
var MyBadge = React.createClass({displayName: "MyBadge",
    render: function(){
        return React.createElement("button", {className: "btn btn-primary", type: "button"}, 
            this.props.title, " ", React.createElement("span", {className: "badge"}, this.props.number)
        )    
    }
});
//创建一个列表模具
var ThumbnailList = React.createClass({displayName: "ThumbnailList",
    render: function(){
        var list = this.props.thumbnailData.map(function(thumbnailProps){
            return React.createElement(Thumbnail, React.__spread({},  thumbnailProps))
        });

        return React.createElement("div", null, 
            list
        )
    }
});
//创建另外一个嵌套模具
var Thumbnail = React.createClass({displayName: "Thumbnail",
    render: function(){
        return  React.createElement("div", {className: "col-sm-6 col-md-4"}, React.createElement("div", {className: "thumbnail"}, 
            React.createElement("img", {src: this.props.imageUrl}), 
            React.createElement("div", {className: "caption"}, 
                React.createElement("h3", null, this.props.header), 
                React.createElement("p", null, this.props.description), 
                React.createElement("p", null, 
                    React.createElement(MyBadge, {title: this.props.title, number: this.props.number})
                )
            )
        ))
    }
});