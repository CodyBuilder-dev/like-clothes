import React, {Component} from "react";
import "../css/LandingPage.css";
import $ from "jquery";

class Landing extends Component {
  constructor(props){
    super(props);
    this.page1 = React.createRef();
    this.page2 = React.createRef();
    this.page3 = React.createRef();
    this.page4 = React.createRef();
    this.page5 = React.createRef();
    this.page6 = React.createRef();

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
                    }
                });
            });
        });
    };

    render() {
      return (
        <div className="landingPage boxwrap" onWheel={this.onScroll} onScroll={this.onScroll}>
        <div class="box" ref={this.page1} style={{backgroundColor: "red"}}>1</div>
        <div class="box" ref={this.page2} style={{backgroundColor: "orange"}}>2</div>
        <div class="box" ref={this.page3} style={{backgroundColor: "yellow"}}>3</div>
        <div class="box" ref={this.page4} style={{backgroundColor: "green"}}>4</div>
        <div class="box" style={{backgroundColor: "blue"}}>5</div>
        <div class="box" style={{backgroundColor: "violet"}}>6</div>
      </div>
      );
    }
  }

export default Landing;