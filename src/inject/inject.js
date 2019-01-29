const updateAllValues = factor => {
  const inputs = document.getElementsByClassName("input-qty");
  Array.prototype.map.call(inputs, i => {
    i.value = i.dataset.ogvalue * factor;
  });
};

chrome.extension.sendMessage({}, function(response) {
  const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      // ----------------------------------------------------------
      let factor = 1;
      const ingredients = document.getElementsByClassName("ingredient");
      Array.prototype.map.call(ingredients, i => {
        if (!i.innerText.includes("q.b.")) {
          const re = /(\d+)/;
          const recipeQty = re.exec(i.innerHTML)[0];
          i.innerHTML = i.innerHTML.replace(
            recipeQty,
            `<input type="number" value="${recipeQty}" data-ogvalue="${recipeQty}" class="input-qty">`
          );
        }
      });
      const inputs = document.getElementsByClassName("input-qty");
      Array.prototype.map.call(inputs, i => {
        i.addEventListener("change", () => {
          factor = i.value / i.dataset.ogvalue;
          updateAllValues(factor);
        });
      });
    }
  }, 10);
});
