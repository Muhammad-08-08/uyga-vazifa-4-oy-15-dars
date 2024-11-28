document.addEventListener("DOMContentLoaded", () => {
    let search = document.querySelector(".search");
    let datas;
    (async () => {
      let response = await fetch("http://localhost:3000/product");
      let products = await response.json();
      datas = products;
      console.log(products);

      search.addEventListener("keydown", () => {
        let value = search.value.toLowerCase();
        let filterdatas = datas.filter((data) => {
            return data.name.toLowerCase().includes(value);
        });
    
        resultContainer.innerHTML = "";
    
        if (filterdatas.length > 0) {
            filterdatas.forEach((data) => {
                let card = document.createElement("div");
                card.classList.add("product-card");
    
                card.innerHTML = `
                    <img src="${data.img}" alt="${data.name}" class="product-image">
                    <h3 class="product-name">${data.name}</h3>
                    <p class="product-info">${data.info}</p>
                    <p class="product-price">${data.price}</p>
                `;
    
                resultContainer.appendChild(card);
            });
        } else {
            resultContainer.textContent = "No results found";
        }
    });
    
  
      products.forEach((product) => {
        let card = document.querySelector(".card");
  
        let productContainer = document.createElement("div");
        productContainer.classList.add("product");
        productContainer.classList.add("product-container");
  
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
        like.textContent = product.liked ? "Liked" : "Like";
        like.classList.add("like");
  
        productContainer.append(
          productImage,
          productName,
          productInfo,
          productPrice
        );
        productContainer.append(like);
  
        card.append(productContainer);
  
        like.addEventListener("click", async (e) => {
          let btn = e.target;
          let id = btn.getAttribute("product-id");
  
          let isLiked = btn.textContent === "Like";
          btn.textContent = isLiked ? "Liked" : "Like";
  
          await fetch(`http://localhost:3000/product/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: isLiked,
            }),
          });
  
          if (isLiked) {
            await fetch(`http://localhost:3000/like`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: product.id,
                name: product.name,
                img: product.img,
                info: product.info,
                price: product.price,
              }),
            });
          } else {
            await fetch(`http://localhost:3000/like/${id}`, {
              method: "DELETE",
            });
          }
        });
      });
    })();
  });
  