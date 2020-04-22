import React, {Component} from "react";
import "../css/LandingPage.css";
import $ from "jquery";

class LandingPage extends Component {
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
                // console.log("event.wheelDelta값", wheelEvent.wheelDelta);
                // console.log("event.datail값", event);
                if (wheelEvent.wheelDelta) {
                    delta = wheelEvent.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } 
                else if (wheelEvent.detail)
                    delta = -event.detail / 3;
                var moveTop = $(window).scrollTop();
                var elmSelecter = $(elm).eq(index);
                console.log("delta값", delta);
                // console.log("elmSelecter값", elmSelecter);
                // console.log("elmSelecter.prev값", elmSelecter.prev());
                // console.log("elmSelecter.next값", elmSelecter.next());
                // console.log("elmSelecter.presibling값", elmSelecter[0].previousSibling);
                // console.log("elmSelecter.presibling값 jquery", $(elmSelecter).prev().next().offset());
                // // console.log("elmSelecter.presibling.offset.top값", elmSelecter[0].previousSibling.offset());
                // console.log("elmSelecter.nextsibling값 jquery", $(elmSelecter).next());
                // console.log("elmSelecter.nextsibling값", elmSelecter[0].nextSibling);
                // 마우스휠을 위에서 아래로
                if (delta < 0) {
                    console.log("아래로가자");
                    // if (elmSelecter[0].nextSibling !== null) {
                    if ($(elmSelecter).next() !== undefined) {
                        console.log("갈 곳이 있어");
                        try{
                            moveTop = $(elmSelecter).next().offset().top;
                        }catch(e){}
                    }
                        // 마우스휠을 아래에서 위로
                } else {
                    console.log("위로가자");
                    // console.log($(elmSelecter).prev())
                    if ($(elmSelecter).prev() !== undefined) {
                        // console.log("갈곳이 있어");
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

    render(){
      return (
        <div className="landingPage" onWheel={this.onScroll} onScroll={this.onScroll}>
            <div className="box" ref={this.page1} style={{backgroundColor:"#015668", display:"table", textAlign:"left"}}>
            </div>
            <div className="box page2" ref={this.page2}>
            </div>
            <div className="box" ref={this.page3} style={{backgroundColor:"black", display:"table"}}>
            </div>
            <div className="box" ref={this.page4} style={{backgroundColor:"black"}}>
            </div>
        </div> 
        );
    }
}

export default LandingPage;