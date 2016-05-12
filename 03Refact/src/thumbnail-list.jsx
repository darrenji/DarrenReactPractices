var React = require('react');
var Thumbnail = require('./thumbnail');

//创建一个列表模具
module.exports = React.createClass({
    render: function(){
        var list = this.props.thumbnailData.map(function(thumbnailProps){
            return <Thumbnail {...thumbnailProps} />
        });

        return <div>
            {list}
        </div>
    }
});