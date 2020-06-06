class CATFighting {
    constructor(data) {
      this.data = data;
      this.leftFighter = 0;
      this.rightFighter = 0;
    }
  
    init() {
      this.onClick();
    }
  
    onClick() {
      const leftContainer = document.querySelector("#firstSide");
      const rightContainer = document.querySelector("#secondSide");
      let fighterRight = rightContainer.querySelectorAll(".fighter-box");
      Array.from(fighterRight).forEach((item) => {
        const fighterImage = item.getElementsByTagName("img");
        let id = JSON.parse(item.dataset.info).id;
        fighterImage[0].addEventListener("click", (e) => {
            this.pickFighter("right", id);
        });
      });
      let fighterLeft = leftContainer.querySelectorAll(".fighter-box");
      Array.from(fighterLeft).forEach((item) => {
        const fighterImage = item.getElementsByTagName("img");
        let id = JSON.parse(item.dataset.info).id;
        fighterImage[0].addEventListener("click", (e) => {
         this.pickFighter("left", id);
        });
      });
      const btnRandom = document.querySelector("#randomFight").addEventListener("click", (e) => {
          this.randomFighter();
        });
      document.querySelector("#generateFight").disabled = true;
      const btnGenFight = document.querySelector("#generateFight").addEventListener("click", (e) => {
          this.simulationFight();
        });
    }
  
    randomFighter() {
      let prvaStrana = 0;
      let drugaStrana = 0;
      const fighters = document.querySelector("#firstSide").querySelectorAll(".fighter-box");
      while (prvaStrana == drugaStrana) {
        prvaStrana = Math.floor(Math.random() * temp.length);
        drugaStrana = Math.floor(Math.random() * temp.length);
      }
      this.pickFighter("left", JSON.parse(fighters[left].dataset.info).id);
      this.pickFighter("right", JSON.parse(fighters[right].dataset.info).id);
    }
  
    fightable() {
      if (this.leftFighter != 0 && this.rightFighter != 0) {
        document.querySelector("#generateFight").disabled = false;
      }
    }
  
    pickFighter(side, id) {
        this.reset();
      const fighterBox = document.querySelectorAll(".fighter-box");
      if (
        (side == "right" && id != this.leftFighter) ||
        (side == "left" && id != this.rightFighter)
      ) {
        Array.from(fighterBox).forEach((c) => {
            const _id = JSON.parse(c.dataset.info).id;
          if (_id == id) {
            if (side == "right" && c.classList.contains("right")) {

              this.rightFighter = id;
              c.querySelector("img").style.border="10px solid black";
              this.addNew(id, side);
            } else if (side=="left" && c.classList.contains("left"))
            {
                this.leftFighter=id;
                c.querySelector("img").style.border="10px solid black";
                this.addNew(id, side);
            }
          }
          else {
              if (!(side=="right" && _id==this.leftFighter))
              c.querySelector("img").style.border="";
          }
        });
      }
    }
  
    addNew(id, side) {
        let item=this.getFighter(id);
      const fighterInfo = JSON.parse(item.dataset.info);
      var mSide;
      if (side == "right") {
        mSide = document.querySelector("#secondSide");
      } else {
        mSide = document.querySelector("#firstSide");
      }
      const mImage = mSide.querySelector(".featured-cat-fighter-image");
      const mName = mSide.querySelector(".name");
      const mAge = mSide.querySelector(".age");
      const mInfo = mSide.querySelector(".skills");
      const mRecord = mSide.querySelector(".record");
      mName.textContent = fighterInfo.name;
      mAge.textContent = fighterInfo.age;
      mInfo.textContent = fighterInfo.catInfo;
      mRecord.textContent = "Wins: " + fighterInfo.record.wins+" Loss: "+fighterInfo.record.loss;
      mImage.src = item.getElementsByTagName("img")[0].src;
      this.fightable();
    }
  
    simulationFight() {
        this.reset();
      document.querySelector("body").style.pointerEvents = "none";
      const clock = document.querySelector("#clock");
      document.querySelector("h2").textContent="";
      const gameOverTime = new Date().getTime() + 3000;
      const interval = setInterval(() => {
        let time = new Date().getTime();
        let delta = gameOverTime - time;
        clock.textContent = delta / 1000;
        if (delta <= 0) {
          clearInterval(interval);
          clock.textContent="";
          const fighterLeft = this.getFighter(this.leftFighter);
          const leftFighterInfo = JSON.parse(fighterLeft.dataset.info);
          
          const fighterRight = this.getFighter(this.rightFighter);
          const rightFighterInfo = JSON.parse(fighterRight.dataset.info);
          const leftP =
            leftFighterInfo.record.wins /
            (leftFighterInfo.record.wins + leftFighterInfo.record.loss);
          const rightP =
            rightFighterInfo.record.wins /
            (rightFighterInfo.record.wins + rightFighterInfo.record.loss);

          const valueDiff = leftP - rightP;
          let temp = 0.5;
          let fightWinner;
          if (valueDiff >= 0) {
            if (valueDiff > 0.1) {
              temp = 0.69;
            } else {
              temp = 0.59;
            }
          } else {
            if (valueDiff > -0.1) {
              temp = 0.29;
            } else {
              temp = 0.39;
            }
          }
          const v = Math.random();
          if (v <= temp)
          {
            fightWinner = "left";
          }
          else
          {
            fightWinner = "right";
          }
          const sideRight = document.querySelector("#secondSide");
          const imgRight = sideRight.querySelector(".featured-cat-fighter-image");
          const sideLeft = document.querySelector("#firstSide");
          const imgLeft = sideLeft.querySelector(".featured-cat-fighter-image");
  
          if ((fightWinner == "right")) {
            imgRight.style.border = " 10px solid green";
            imgLeft.style.border = "10px solid red";

            document.querySelector("#message").textContent = "WINNER IS" + rightFighterInfo.name;
            this.update(fighterRight, fighterLeft, fightWineer);
  
          } 
          else {
            imgRight.style.border = "10px solid red";
            imgLeft.style.border = "10px solid green";

            document.querySelector("#message").textContent = "WINNER IS" + leftFighterInfo.name;
            this.update(fighterLeft, fighterRight, fightWineer);

          }
          document.querySelector("body").style.pointerEvents = "auto";
        }
      }, 1);
    }
    
    
    
    getFighter(id)
    {
        const temp = document.querySelector("#firstSide").querySelectorAll(".fighter-box");
        let c;
        Array.from(temp).forEach((item) => {
            const _temp_id = JSON.parse(item.dataset.info).id
            if (id==_temp_id)
            {
                c = item;
            }
        })
        return c;
    }

    update(winner, loser, side)
    {
        const winnerTemp = JSON.parse(winner.dataset.info);
        const loserTemp = JSON.parse(loser.dataset.info);
        let _side;
        if(side=="right")
        {
            _side="left";
        }
        else
        {
             _side="right";
        }
        winnerTemp.record.wins++;
        loserTemp.record.loss++;
        winner.setAttribute("data-info",JSON.stringify(winnerTemp));
        loser.setAttribute("data-info",JSON.stringify(loserTemp));
        this.addNew(winnerTemp.id,side)
        this.addNew(loserTemp.id,_side);

        let data = new FormData();



        data.append('winner',winnerTemp.id);
        data.append('wins',winnerTemp.record.wins);
        data.append('loser',loserTemp.id);
        data.append('loss',loserTemp.record.loss);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            {
                console.log("Success");
            }
        }; 
        xmlhttp.open("GET", "./controller/db/Update.php?winner=" + winnerTemp.id +
                                                      "&wins=" +winnerTemp.record.wins +
                                                        "&loser=" +loserTemp.id +
                                                        "&loss=" + loserTemp.record.loss ,true);
        xmlhttp.send();
    }
    reset() {
      const temp = document.querySelectorAll(".featured-cat-fighter-image");
      document.querySelector("#message").textContent="";
      Array.from(temp).forEach((c) => {
          c.style.border="";
      })
  }
  }

  const game = new CATFighting();
  game.init();