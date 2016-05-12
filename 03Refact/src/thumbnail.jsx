var React = require('react');//从npm上下载下来的package的名称是唯一的
var MyBadge = require('./badge');//不是从npm下载下来的package,需要确定引用对外具体地址

module.exports = React.createClass({
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