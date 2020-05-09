jQuery(function ($) {
  //diagonalAnimate();
  var winCellIndex = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  var selectedCells = {
    x: [],
    o: [],
  };
  var player = "x";
  $(".wrap").on("click", ".cell:not('.cell-x, .cell-o')", oneStep);

  function oneStep(event) {
    var clickedCell = $(event.currentTarget);
    //console.log(clickCell);
    clickedCell.addClass("cell-" + player);
    var indexCell = $(".cell").index(clickedCell);
    var selectedCellsPlayer = selectedCells[player];
    selectedCellsPlayer.push(indexCell);
    //console.log(selectedCells);
    checkWinner(selectedCellsPlayer);
    if (player === "x") {
      clickedCell.text("x");
      player = "o";
    } else {
      clickedCell.text("o");
      player = "x";
    }
  }

  function checkWinner(selectedCellsPlayer) {
    for (var i = 0; i < winCellIndex.length; i++) {
      var allWinCells = true;
      for (var j = 0; j < winCellIndex[i].length; j++) {
        if ($.inArray(winCellIndex[i][j], selectedCellsPlayer) === -1) {
          allWinCells = false;
        }
      }
      if (allWinCells) {
        // alert(player + " выиграл!");
        $(".wrap").append("<div class='myCanvas'></div>");
        $(".cell").each(function (index, elem) {
          if ($.inArray(index, winCellIndex[i]) !== -1) {
            switch (i) {
              //vertical///////////////////////
              case 0: //[0.1.2]
                console.log(winCellIndex[i]);
                anim("5px", "0px", "0px", "60px", "rotate(0deg)", {
                  height: "390px",
                });
                break;
              case 1: //[3.4.5]
                console.log(winCellIndex[i]);
                anim("5px", "0px", "0px", "190px", "rotate(0deg)", {
                  height: "390px",
                });
                break;
              case 2: //[6.7.8]
                anim("5px", "0px", "0px", "320px", "rotate(0deg)", {
                  height: "390px",
                });
                break;
              //horizontal//////////////////////////
              case 3: //[0.3.6]
                anim("0px", "5px", "60px", "0px", "rotate(0deg)", {
                  width: "390px",
                });
                break;
              case 4: //[1.4.7]
                anim("0px", "5px", "190px", "0px", "rotate(0deg)", {
                  width: "390px",
                });
                break;
              case 5: //[2.5.8]
                anim("0px", "5px", "320px", "0px", "rotate(0deg)", {
                  width: "390px",
                });
                break;
              //diagonal////////////////////////
              case 6: //[0.4.8]
                anim("5px", "0px", "0px", "0px", "rotate(-45deg)", {
                  height: "550px",
                });
                break;
              case 7: //[6.4.2]
                anim("5px", "0px", "0px", "390px", "rotate(45deg)", {
                  height: "550px",
                });
                break;
            }
          }
        });

        $(".wrap").off("click");
        break;
      }
      if (!allWinCells && $(".cell:not('.cell-x, .cell-o')").length === 0) {
        alert("Ничья!");
        $(".wrap").off("click");
        break;
      }
    }
  }

  function anim(width, height, top, left, transform, myAnimate) {
    $(".myCanvas").css({
      width: width,
      height: height,
      top: top,
      left: left,
      transform: transform,
    });
    // $(".myCanvas").animate(myAnimate, 2000);
    //////////////////////////////////
    $(".myCanvas").queue(function () {
      $(".myCanvas").animate(myAnimate, 2000);
      $(".myCanvas").dequeue();
    });
    $(".myCanvas").queue(function () {
      if (player === "x") {
        player = "o";
      } else {
        player = "x";
      }
      alert(player + " выиграл!");
    });
    /////////////////////////////////////////
  }

  function diagonalAnimate() {
    $(".wrap").append("<div class='myCanvas'></div>");
    $(".myCanvas").css({
      width: "5px",
      height: "0px",
      top: "0px",
      left: "0px",
      transformOrigin: "0 0",
      transform: "rotate(-45deg)",
    });
    $(".myCanvas").animate({ height: "550px" }, 2000);
    ////////////////////////////////////////////////
    // $(".wrap").append(
    //   "<canvas id='myCanvas' width='390' height='390'></canvas>"
    // );
    // var myContext = document.getElementById("myCanvas").getContext("2d");
    // //[0.4.8]
    // myContext.strokeStyle = "#400";
    // myContext.lineWidth = 1;

    //   myContext.beginPath();

    //   myContext.moveTo(0, 0);
    //   myContext.lineTo(390, 390);

    //   myContext.closePath();
    //   myContext.stroke();
    ///////////////////////////////////////
  }
});
