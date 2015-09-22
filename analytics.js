
function ClickAnalyzer() {
  var clicks = {};

  this.test = function(rows, cols) {
    var buttons = new Array(rows);
    var grid = document.createElement('div');
    var report = document.getElementById('analyze');
    var self = this;

    for (var i = 0; i < rows; i++) {
      buttons[i] = new Array(cols);     // make each row;
      for (var j = 0; j < cols; j++) {
        buttons[i][j] = document.createElement('div');
        buttons[i][j].className = 'button';
        buttons[i][j].id = 'x' + j + 'y' + i;
      }
    }
    for (var i = 0; i < rows; i++) {
      var temp = document.createElement('div');
      temp.className = 'row';
      for (var j = 0; j < cols; j++) {
        temp.appendChild(buttons[i][j]);
      }
      grid.appendChild(temp);
    }

    report.addEventListener('click', function() {
      self.report();
    });
    document.getElementById('content').appendChild(grid);
  };

  this.analyze = function() {
    var descendents = document.body.getElementsByTagName('*');
    for (var i = 0; i < descendents.length; i++) {
      descendents[i].addEventListener('click', function(event) {
        if (!clicks[this.id])
          clicks[this.id] = 0;
        clicks[this.id] += 1;
        this.style.background = 'yellow';
        var thisButton = this;
        setTimeout(function (){ thisButton.style.background = 'white'; }, 100);
        event.stopPropagation();
        return false;
      });
    }
  };

  this.report = function() {
    var keys = Object.keys(clicks);
    str = '';
    for (var i = 0; i < keys.length; i++) {
      str += keys[i] + ': clicks ' + clicks[keys[i]] + '  -  ';
    }
    document.getElementById('report').innerHTML = str;
  };
}

var analyzer = new ClickAnalyzer();
analyzer.test(24, 48);
analyzer.analyze();
