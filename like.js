document.addEventListener("DOMContentLoaded", () => {
    (async () => {
      let response = await fetch("http://localhost:3000/like");
      let products = await response.json();
      console.log(products);
  
      products.forEach((product) => {
        let card = document.querySelector(".card");
  
        let productContainer = document.createElement("div");
        productContainer.classList.add("product");
        productContainer.classList.add("product-container");
        productContainer.setAttribute("data-id", product.id);
  
        let productImage = document.createElement("img");
        productImage.src = product.img;
        productImage.classList.add("product-image");
  
        let productName = document.createElement("h3");
        productName.textContent = product.name;
        productName.classList.add("product-name");
  
        let productInfo = document.createElement("p");
        productInfo.textContent = product.info;
        productInfo.classList.add("product-info");
  
        let productPrice = document.createElement("p");
        productPrice.textContent = product.price;
        productPrice.classList.add("product-price");
  
        let like = document.createElement("button");
        like.setAttribute("product-id", product.id);
        like.textContent = "Liked";
        like.classList.add("like");
  
        productContainer.append(
          productImage,
          productName,
          productInfo,
          productPrice,
          like
        );
  
        card.append(productContainer);
  
        like.addEventListener("click", async (e) => {
          let btn = e.target;
          let id = btn.getAttribute("product-id");
  
          await fetch(`http://localhost:3000/like/${id}`, {
            method: "DELETE",
          });
  
          let containerToRemove = document.querySelector(
            `.product-container[data-id="${id}"]`
          );
          if (containerToRemove) {
            containerToRemove.remove();
          }
  
          await fetch(`http://localhost:3000/product/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: false,
            }),
          });
        });
      });
    })();
  });
  