import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../css/LandingPage.css";
import $ from "jquery";

class Landing extends Component {
  constructor(props){
    super(props);
    // this.page1 = React.createRef();
    // this.page2 = React.createRef();
    // this.page3 = React.createRef();
    // this.page4 = React.createRef();
    // this.page5 = React.createRef();
    // this.page6 = React.createRef();

    this.state = {
      currentIndex : 0
    }
  }



  onScroll = event => {
    const wheelEvent = event.nativeEvent;
    var elm = ".box";
      $(elm).each(function (index) {
        
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
          e.preventDefault();
          var delta = 0;
          if (!event) event = window.event;
          if (wheelEvent.wheelDelta) {
            delta = wheelEvent.wheelDelta / 120;
            if (window.opera) delta = -delta;
          } 
          else if (wheelEvent.detail)
            delta = -event.detail / 3;
          var moveTop = $(window).scrollTop();
          var elmSelecter = $(elm).eq(index);

          // 마우스휠을 위에서 아래로
          if (delta < 0) {
            if ($(elmSelecter).next() !== undefined) {
              try{
                moveTop = $(elmSelecter).next().offset().top;
              }catch(e){}
            }

          // 마우스휠을 아래에서 위로
          } else {
            if ($(elmSelecter).prev() !== undefined) {
              try{
                moveTop = $(elmSelecter).prev().offset().top;
              }catch(e){}
            }
          }
            
          // 화면 이동 0.8초(800)
          $("html, body").stop().animate({
            scrollTop: moveTop + 'px'
          }, {
            duration: 400, complete: function () {
          }});
        });
      });
    }

    render() {
      return (
        <div className="landingPage" onWheel={this.onScroll} onScroll={this.onScroll}>
          <div className="box" ref={this.page1} style={{backgroundColor: "red"}}>
            <div className='mainLink'><Link to='/'> move to main link </Link></div>
          </div>
          <div className="box" ref={this.page2} style={{backgroundColor: "orange"}}>
            </div>
          <div className="box" ref={this.page3} style={{backgroundColor: "yellow"}}>
            </div>
          <div className="box" ref={this.page4} style={{backgroundColor: "green"}}>
            </div>
          <div className="box" ref={this.page5} style={{backgroundColor: "blue"}}>
            </div>
          <div className="box" ref={this.page6} style={{backgroundColor: "violet"}}>
            </div>
        </div>
      );
    }
  }

export default Landing;