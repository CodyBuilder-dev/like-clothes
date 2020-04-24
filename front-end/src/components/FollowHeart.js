React.initializeTouchEvents(true);

var D = React.DOM;

function rand(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function cubicBezier(x1, y1, x2, y2, epsilon){

	var curveX = function(t){
		var v = 1 - t;
		return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
	};

	var curveY = function(t){
		var v = 1 - t;
		return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
	};

	var derivativeCurveX = function(t){
		var v = 1 - t;
		return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
	};

	return function(t){

		var x = t, t0, t1, t2, x2, d2, i;

		// First try a few iterations of Newton's method -- normally very fast.
		for (t2 = x, i = 0; i < 8; i++){
			x2 = curveX(t2) - x;
			if (Math.abs(x2) < epsilon) return curveY(t2);
			d2 = derivativeCurveX(t2);
			if (Math.abs(d2) < 1e-6) break;
			t2 = t2 - x2 / d2;
		}

		t0 = 0, t1 = 1, t2 = x;

		if (t2 < t0) return curveY(t0);
		if (t2 > t1) return curveY(t1);

		// Fallback to the bisection method for reliability.
		while (t0 < t1){
			x2 = curveX(t2);
			if (Math.abs(x2 - x) < epsilon) return curveY(t2);
			if (x > x2) t0 = t2;
			else t1 = t2;
			t2 = (t1 - t0) * .5 + t0;
		}

		// Failure
		return curveY(t2);

	};

};

var SVGHeart = React.createClass({
  getClasses: function(){
    var classes = "icon heart";
    if (this.props.liked) {
      return classes + " liked";
    } else {
      return classes;
    }
  },
  render: function(){
    var self = this;
    var classNames = self.getClasses();
    return D.svg({
      className: classNames,
      id: "heart",
      viewBox: "-5 0 69 64",
      onClick: self.props.handleLike,
      onTouchStart: self.props.handleLike
    }, [
      D.path({
        className: "heart-path",
        d: "M30.3,57.8L8.7,37c-0.3-0.2-7.9-7.2-7.9-15.5C0.8,11.3,7,5.2,17.3,5.2c6.1,0,11.7,4.8,14.5,7.5c2.7-2.7,8.4-7.5,14.5-7.5   c10.4,0,16.6,6.1,16.6,16.2c0,8.3-7.6,15.3-7.9,15.6L33.3,57.8c-0.4,0.4-1,0.6-1.5,0.6C31.3,58.4,30.7,58.2,30.3,57.8z"
      })
    ]);
  }
});

var HeartStatus = React.createClass({
  getInitialState: function(){
    return {
      liked: false,
      likesCount: 0
    }
  },
  handleLike: function(e){
    var self = this;
    var svg = Snap.select('#heart');
    var heart = Snap.select('#heart .heart-path');
    var heartPath = heart.attr('d');
    var firstDuration = 1000;
    
    var epsilon = (1000 / 60 / firstDuration) / 4;
    
    var swell = cubicBezier(0.350, 0.760, 0.450, 1.100, epsilon);
    
    svg.path(heartPath).attr({
      class: "fill-heart",
      fill: "#093c4f",
      transform: "translate(30 25) scale(0)"
    }).animate({
      transform: "scale(1.15)"
    }, 900, swell, function(){
      this.animate({
        transform: "scale(1)"
      }, 1000, mina.easein);
    });
    
    heart.animate({
        transform: "translate(-0.5 -0.5) scale(1.15)"
    }, firstDuration, swell, function(){
      for(var i = 1; i < 11; i++) {
        var rando = i % 2 === 0 ? rand(-200, 0) : rand(0, 200);
        var rotation = i % 2 === 0 ? -20 : 20;
        var duration = i > 5 ? (i*100) : 750;
      	svg.path(heartPath).attr({
          fill: "#093c4f",
          transform: "scale(0.3) translate(75 0)"
        }).animate({
          transform: "translate("+rando+" "+rand(-200, -20)+") rotate("+rotation+" 35 35)",
          opacity: 0
        }, duration, mina.easein); 
      }
      heart.animate({
        //"fill-opacity": 1,
        transform: "scale(1)"
      }, 1000, mina.easein, function(){
        self.setState({
          liked: true,
          likesCount: self.state.likesCount + 1
        });
      });
    });
  },
  handleUnlike: function(e){
    var self = this;
    var svg = Snap.select('#heart');
    var heart = Snap.select('#heart .heart-path');
    var heartPath = heart.attr('d');
    
    /*for(var i = 1; i < 11; i++){
      var rando = i % 2 === 0 ? rand(-50, 0) : rand(0, 50);
      var rotation = i % 2 === 0 ? -160 : 160;
      var duration = i > 5 ? (i*150) : 750;
      var fallLen = i > 5 ? (i*10) : (1*30);
      svg.path(heartPath).attr({
        fill: "#093c4f",
        transform: "scale(0.3) translate(75 "+50+")"
      }).animate({
     		transform: "translate("+rando+" "+100+") rotate("+rotation+" 35 35)",
        opacity: 0
      }, duration, mina.easeout);
    }*/
    Snap.select('.fill-heart').remove();
    svg.path("M6.1875,4.525 C3.35,7.325 1.8,11.4 1.8,16.5 C1.8,20.65 3.7,24.475 5.6375,27.2875 C7.575,30.1 9.55,31.9 9.7,32 L31.3,52.8 C31.7,53.2 32.3,53.4 32.8,53.4 C33.3,53.4 33.9,53.2 34.3,52.8 L56,32 C56.3,31.7 63.9,24.7 63.9,16.4 C63.9,6.3 57.7,0.2 47.3,0.2 C41.2,0.2 35.5,5 32.8,7.7 C30,5 24.4,0.2 18.3,0.2 C13.15,0.2 9.025,1.725 6.1875,4.525 C9.025,1.725 13.15,0.2 18.3,0.2 C24.4,0.2 30,5 32.8,7.7 L37.5952156,12.6884768 L29.9418953,20.4873039 L36.9057625,29.3613274 L29.9418953,37.4262688 L36.9057625,45.530761 C36.9057625,45.530761 32.8006258,53.3988008 32.8000001,53.3999999 C32.3,53.4 31.7,53.2 31.3,52.8 L9.7,32 C9.55,31.9 7.575,30.1 5.6375,27.2875 C3.7,24.475 1.8,20.65 1.8,16.5 C1.8,11.4 3.35,7.325 6.1875,4.525 L6.1875,4.525 Z").attr({
    	fill: "#093c4f"  
    }).animate({
      transform: "translate(60 90) rotate(40) ",
      opacity: 0
    }, 650, mina.easeout);
    
    svg.path("M8.7,32 C8.4,31.8 0.8,24.8 0.8,16.5 C0.8,6.3 7,0.2 17.3,0.2 C23.4,0.2 29,5 31.8,7.7 L36.5952156,12.6884768 L28.9418953,20.4873039 L35.9057625,29.3613274 L28.9418953,37.4262688 L35.9057625,45.530761 C35.9057625,45.530761 31.8,53.4000002 31.8,53.4 C31.3,53.4 30.7,53.2 30.3,52.8 L8.7,32 Z").attr({
      fill: "#093c4f"
    }).animate({
      transform: "translate(-50 100) rotate(-40) ",
      opacity: 0
    }, 650, mina.easeout, function(){
      self.setState({
        liked: false,
        likesCount: self.state.likesCount - 1
      });
    });
    
    heart.animate({
      "fill-opacity": 0
    }, 100, mina.easein);
  },
  render: function(){
    var self = this;
    var children = [
      React.createElement(SVGHeart, {
        liked: self.state.liked,
        handleLike: self.state.liked ? self.handleUnlike : self.handleLike
      })
    ];
    if(this.state.likesCount) {
      children.push(
      	D.span({
          className: "heartsCount"
        }, "| " + self.state.likesCount)
      );
    }
    return D.div({
      className: "heart-status"
    }, children);
 	}
});

var Update = React.createClass({
  render: function(){
    return D.article({
      className: "update"
    }, [
      D.img({
        className: "update-avatar",
        src: "https://placekitten.com/g/50/50"
      }),
      D.h5({
        className: "update-user"
      }, "Hip Kitten"),
      D.p({
        className: "update-content"
      }, "If you click on the little heart icon in the bottom-right corner of the update box, you should see some kind of cool animation and a number show up next to the icon."),
      React.createElement(HeartStatus, null)
    ]);
  }
});

var App = React.createClass({
  render: function(){
    return D.section({
      className: "app"
    }, [
      React.createElement(Update, null)
    ]);
  }
});

React.render(React.createElement(App, null), document.body);