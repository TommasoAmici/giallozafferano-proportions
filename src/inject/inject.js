const updateAllValues = factor => {
  const inputs = document.getElementsByClassName("input-qty");
  Array.prototype.map.call(inputs, i => {
    i.value = i.dataset.ogvalue * factor;
  });
};

const main = () => {
  let factor = 1;
  const ingredients = document.getElementsByClassName("ingredient");
  Array.prototype.map.call(ingredients, i => {
    if (!i.innerText.includes("q.b.")) {
      // no leading zeros
      const re = /([1-9]\d*|0\.\d*)/;
      i.innerHTML = i.innerHTML.replace("½", "0.5");
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
};

const checkIfReady = () => {
  if (document.readyState !== "interactive") {
    checkIfReady();
  }
  main();
};

checkIfReady();
