


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};




// my actual code starts here
const userInput = document.getElementById("value")
const userInput2 = document.getElementById("value2")
const button = document.getElementById("click")
const result = document.getElementById("result")
const result2 = document.getElementById("result2")
const loader = document.querySelector(".loader")







button.addEventListener("click", function() {

  // bring loader
loader.style.display = 'inline-block'

// greeting users with hashing message
result.innerHTML = `Hashing the hash you sent ${ parseFloat(userInput2.value).toLocaleString('en')  } times...`

// getting data from API
      const dataToSend = { gameHash: userInput.value, gameID: userInput2.value }; // Replace with the data you want to send
  
      fetch('http://localhost:3000/send-data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Response from server:', data);


          
          let random2 = JSON.stringify(data)
          random2 = JSON.parse(random2)


          random2 = random2.message
          random2 = random2.split(",")

          let hashResult = random2[0]
          let bust = random2[1]

          if (hashResult === "86728f5fc3bd99db94d3cdaf105d67788194e9701bf95d049ad0e1ee3d004277") {
              result2.style.color = 'rgb(82, 226, 74)'
              result2.innerHTML = `Successfully ran through and hashed ${ parseFloat(userInput2.value).toLocaleString('en') } games`
              result.innerHTML = `✅ This game was <span class="green">provably fair</span>. The hash you entered is on the same hash chain as the genesis hash "86728f5fc3bd99db94d3cdaf105d67788194e9701bf95d049ad0e1ee3d004277". <span class="bust">Game busted at ${bust}.</span>`
              loader.style.display = 'none'

          }
              else {
                result2.style.color = 'red'
                result2.innerHTML = `Successfully ran through and hashed ${ parseFloat(userInput2.value).toLocaleString('en') } games`
                  result.innerHTML = `❌ This game was not provably fair. The hash/game ID combo you entered returned ${hashResult}, which is not the genesis hash.`
                  loader.style.display = 'none'
              }


            // if user is on mobile, let them know about the provably fair explanation page
              if (matchMedia('(max-width: 999px)').matches && matchMedia('max-height: 500px')) {
                document.getElementById("result3").style.display = 'block'


              }
       

 

          console.log(random2)
          console.log(random2[0])
          console.log(random2[1])
      



  
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  
  
  




})









// code for navbar menu





