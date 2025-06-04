// Our clock setup

let display = document.getElementsByTagName("h1")[0];
let value1, value2;
[value1, value2] = getCurrentTime();
display.innerHTML = value1;
setInterval(() => {
  [value1, value2] = getCurrentTime();
  display.innerHTML = value1;
  display.id = value2;
}, 1000);
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  val1 = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} ${ampm}`;
  val2 = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} : ${ampm}`;
  return [val1, val2];
}

// our alarm setup

let setBtn = document.getElementsByTagName("button")[0];
let clearBtn = document.getElementsByTagName("button")[1];
let errorMsg = document.getElementsByTagName("p")[0];
let displayArray, userArray, intv;
let clockImg = document.getElementsByTagName("img")[0];
let audio = document.getElementsByTagName("audio")[0];
let timeIn = document.getElementsByTagName("input")[0];
let userValue;
setBtn.addEventListener("click", () => {
  if (timeIn.value == "") {
    errorMsg.style.display = "flex";
    errorMsg.innerHTML = "...";
    setTimeout(() => {
      errorMsg.innerHTML = `<ion-icon name="warning"></ion-icon> Please try again !`;
    }, 300);
  } else {
    errorMsg.style.display = "none";
    setBtn.style.display = "none";
    clearBtn.style.display = "block";
    alarm();
  }
});

clearBtn.addEventListener("click", () => {
  newSetup();
});

const newSetup = () => {
  audio.pause();
  clockImg.classList.remove("alarm-img");
  clearInterval(intv);
  clearBtn.style.display = "none";
  setBtn.style.display = "block";
};
let arr, newArr;
const alarm = () => {
  userValue = timeIn.value;
  arr = userValue.split(":");
  newArr = [];
  if (arr[0] >= 12 && arr[0] < 24) {
    if (arr[0] == 12) {
      newArr.push(arr[0]);
    } else {
      newArr.push(arr[0] - 12);
    }
    newArr.push(arr[1]);
    newArr.push("PM");
  } else {
    if (arr[0] == "00") {
      newArr.push("12");
    } else {
      newArr.push(arr[0]);
    }
    newArr.push(arr[1]);
    newArr.push("AM");
  }
  intv = setInterval(() => {
    displayArray = display.id.split(" : ");
    if (
      Number(displayArray[0]) == Number(newArr[0]) &&
      Number(displayArray[1]) == Number(newArr[1]) &&
      displayArray[3] == newArr[2]
    ) {
      audio.play();
      clockImg.classList.add("alarm-img");
      clearInterval(intv);
    }
  }, 1000);
};
