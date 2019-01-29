const updateAllValues = factor => {
  const inputs = document.getElementsByClassName("input-qty");
  Array.prototype.map.call(inputs, i => {
    i.value = Math.round(i.dataset.ogvalue * factor * 10) / 10;
  });
};

const re = /([1-9]\d*|0\.\d*)/;
const makeInputField = ingredient => {
  // no leading zeros
  ingredient.innerHTML = ingredient.innerHTML.replace("½", "0.5");
  const recipeQty = re.exec(ingredient.innerHTML)[0];
  return ingredient.innerHTML.replace(
    recipeQty,
    `<input type="number" value="${recipeQty}" data-ogvalue="${recipeQty}" class="input-qty">`
  );
};

// yield
const main = () => {
  let factor = 1;
  const ingredients = document.getElementsByClassName("ingredient");
  const numPersons = document.getElementsByClassName("yield")[0];
  numPersons.innerHTML = makeInputField(numPersons);
  Array.prototype.map.call(ingredients, i => {
    if (!i.innerText.includes("q.b.")) {
      i.innerHTML = makeInputField(i);
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    main();
  });
} else {
  main();
}
