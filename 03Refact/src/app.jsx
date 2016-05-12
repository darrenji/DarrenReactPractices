var React = require('react');
var ThumbnailList = require('./thumbnail-list');


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

console.log('hey');

//让模具出东西，并且给模具中的变量赋值
var element = React.createElement(ThumbnailList, options);

React.render(element, document.querySelector('.container'));