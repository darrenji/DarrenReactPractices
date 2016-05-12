## 0301 重构第二节 ##

→ 把的第二节中的包含在`<script type="text/babel">`和`</script>`之间的js文件分离出来，保存在src文件夹下，文件以jsx为后缀。

→ 安装node, https://nodejs.org/en/

→ 在命令行窗口中查看nodejs的版本

node -v

→ 来到本项目根文件夹下，打开命令行窗口

→ 初始化npm

npm init  
然后一直按回车键

这样，在项目根文件夹下会多了一个package.json文件，用来描述装了哪些package。

→ 安装gulp, gulp-react和gulp-concat

npm install --save gulp gulp-react gulp-concat

这样，在项目根文件夹下会多了一个node_modules文件夹以及各种package。

→ 安装gulp-cli,这是一个命令行工具

npm install -g gulp-cli

→ 查看gulp的版本

gulp -v

这样我们就可以使用gulp把jsx文件转换成js文件了。

→ 在项目根文件夹下创建一个gulpfile.js文件，当我们在命令窗口输入gulp命令的时候，就是找这里的gulpfile.js文件的。

    var gulp = require('gulp');
	var react = require('gulp-react');
	var concat = require('gulp-concat');
	
	gulp.task('default', function(){
	    return gulp.src('03Refact/src/**')
	        .pipe(react()) 
	        .pipe(concat('03.js'))
	        .pipe(gulp.dest('03Refact/'));
	});


→ 在命令行窗口输入gulp命令

gulp

这样，在`03Refact/`文件夹下生成了一个`03.js`文件，该js文件是通过把`03Refact/src/`下的所有jsx文件经`gulp-react`这个package编译而成。

→ 页面现在只需要引入03.js文件即可

	<html>
	    <head>
	    <script src="../lib/react.js"></script>
	    <script src="../lib/react-dom.js"></script>
	    <script src="03.js"></script>
	    <link rel="stylesheet" href="../bootstrap-3.3.5-dist/css/bootstrap.min.css">
	    </head>
	    <body>
	    
	    <div class="container">
	       
	    </div>
	    </body>
	</html>

此时，浏览`0301.html`文件，发现报错。

> Uncaught Invariant Violation: _registerComponent(...): Target container is not a DOM element.

这是因为，在`03.js`文件中执行`var element = React.createElement(ThumbnailList, options);`的时候，ThumbnailList这个模具还没有被创建。

也就是说：在编译jsx文件的时候，我们应该注意或设置编译的顺序。

解决思路是：通过设置jsx之间的依赖关系。这需要修改现在的jsx文件。在修改之前，先把当前各个jsx文件贴出来。

badge.jsx

    var MyBadge = React.createClass({
    render: function(){
    	return <button className="btn btn-primary" type="button">
    		{this.props.title} <span className="badge">{this.props.number}</span>
    	</button>
    	}
    });

thumbnail.jsx

	//创建另外一个嵌套模具
	var Thumbnail = React.createClass({
	    render: function(){
	        return  <div className="col-sm-6 col-md-4"><div className="thumbnail">
	            <img src={this.props.imageUrl} />
	            <div className="caption">
	                <h3>{this.props.header}</h3>
	                <p>{this.props.description}</p>
	                <p>
	                    <MyBadge title={this.props.title} number={this.props.number} />
	                </p>
	            </div>
	        </div></div>
	    }
	});

thumbnail-list.jsx

	//创建一个列表模具
	var ThumbnailList = React.createClass({
	    render: function(){
	        var list = this.props.thumbnailData.map(function(thumbnailProps){
	            return <Thumbnail {...thumbnailProps} />
	        });
	
	        return <div>
	            {list}
	        </div>
	    }
	});

app.jsx

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

→ 接下来需要理清各个jsx文件之间的关系了。首先安装几个package

npm install --save browserify reactify vinyl-source-stream watchify gulp-util

- gulp-util：用来控制台输出内容
- vinyl-source-stream：在gulp和vinyl的pipeline中使用文本流
- browserify：声明组件中的依赖关系和加载顺序
- watchify：用来侦测文件源的变化，而不需要每次都执行gulp命令
- reactify：与browserify协同工作，把jsx文件转换成js文件


→ 修改gulpfile.js文件。

	var gulp = require('gulp');
	var gutil = require('gulp-util');
	var source = require('vinyl-source-stream');
	var browserify = require('browserify');
	var watchify = require('watchify');
	var reactify = require('reactify');
	
	gulp.task('default', function(){
	   var bundler = watchify(browserify({
	       entries:['03Refact/src/app.jsx'],
	       transform: [reactify],
	       extensions: ['.jsx'],
	       debug: true,
	       cache: {},
	       packageCache: {},
	       fullPath: true
	   }));
	    
	    function build(file){
	        if(file){
	            gutil.log('Recompiling ' + file);
	        }
	        
	        return bundler
	            .bundle()
	            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	            .pipe(source('main.js'))
	            .pipe(gulp.dest('03Refact/'))
	    };
	    
	    build()
	    bundler.on('update', build)
	    
	});


→ 执行gulp命令

gulp

在`03Refact/`文件夹下多了`main.js`文件。

→ 通过npm安装React,注意版本号

npm install --save react@0.14.7

→ 修改各个jsx文件

→ 执行gulp命令

gulp

→ 引用`main.js`文件



## 重构后的思考 ##

1. 把各个模板放到jsx文件中
2. 在每个jsx文件中，通过`require('react')`来引用其它module,通过`module.exports`把当前的module导出能被其它module引用
3. gulpfile.js文件的编写似乎是一个难点