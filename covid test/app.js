const healthTips = [
  "An apple a day keeps the doctor away.",
  "Don't drink sugar calories.",
  "Take care of your gut health with probiotics and fiber.",
  "Drink some water, especially before meals.",
  "Don't fear coffee.",
  "Eat fatty fish",
  "Get enough sleep",
  "Drink some water, especially before meals",
  "Don’t overcook or burn your meat",
  "Avoid bright lights before sleep",
];

const funFacts = [
  "Laughing is good for the heart and can increase blood flow by 20 percent.",
  "Your skin works hard. Not only is it the largest organ in the body, but it defends against disease and infection, regulates your temperature and aids in vitamin production.",
  "Exercise will give you more energy, even when you’re tired.",
  "Sitting and sleeping are great in moderation, but too much can increase your chances of an early death.",
  "Nearly 30% of the world’s population is obese.",
  "Between 2000 and 2015, the average global life expectancy increased by five years.",
  "Less than 1% of Americans ride their bike to work, while 50% of Copenhagen residents bike to work or school.",
  "The US spends almost three times more on healthcare than any other country in the world, but ranks last in life expectancy among the 12 wealthiest industrialized countries.",
  "Learning a new language or playing a musical instrument gives your brain a boost.",
  "Feeling stressed? Read. Getting lost in a book can lower levels of cortisol, or other unhealthy stress hormones, by 67 percent.",
];
document.getElementById("check").addEventListener("click", () => {
  location.href = "fillup.html";
  console.log("clicked");
});

window.onload = () => {
  const num = Math.floor(Math.random() * 10);
  axios
    .get("https://api.covid19api.com/summary")
    .then((response) => {
      response.data.Countries.map((el) => {
        if (el.Country === "India") {
          document.getElementById(
            "deaths"
          ).innerHTML = el.TotalDeaths.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
          document.getElementById(
            "recovered"
          ).innerHTML = el.TotalRecovered.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
          document.getElementById(
            "totalConfirmed"
          ).innerHTML = el.TotalConfirmed.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
        }
      });
    })
    .catch((error) => console.error(error));

  if (num >= 8) {
    document.querySelector(".tip-1").innerHTML = healthTips[num];
    document.querySelector(".tip-2").innerHTML = healthTips[num - 1];
    document.querySelector(".tip-3").innerHTML = healthTips[num - 2];
    document.querySelector(".fact-1").innerHTML = funFacts[num];
    document.querySelector(".fact-2").innerHTML = funFacts[num - 1];
    document.querySelector(".fact-3").innerHTML = funFacts[num - 2];
  } else {
    document.querySelector(".tip-1").innerHTML = healthTips[num];
    document.querySelector(".tip-2").innerHTML = healthTips[num + 1];
    document.querySelector(".tip-3").innerHTML = healthTips[num + 2];
    document.querySelector(".fact-1").innerHTML = funFacts[num];
    document.querySelector(".fact-2").innerHTML = funFacts[num + 1];
    document.querySelector(".fact-3").innerHTML = funFacts[num + 2];
  }
};
