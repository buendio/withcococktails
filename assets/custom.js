$('.quantity-button').on('click', function(){
  		$('.quantity-button').removeClass('selected');
  $(this).addClass('selected');
  var quantity = $(this).data('quantity');
  $('input[name="quantity"]').val(quantity);
});


$('.QuantitySelector__Button').on('click', function(){
  		$('.quantity-button').removeClass('selected');
});

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(event) {
    var addToCartButton = event.target.closest('.ProductForm .ProductItem__ViewButton');
    if (!addToCartButton) return;
    event.preventDefault();
    var form = addToCartButton.closest('.ProductForm');
    var productData = new FormData(form);

    addToCartAjax(productData, addToCartButton);
  });
});

function addToCartAjax(productData, addToCartButton) {
  addToCartButton.setAttribute('disabled', 'disabled');
  document.dispatchEvent(new CustomEvent('theme:loading:start'));
  fetch('/cart/add.js', {
    method: 'POST',
    body: productData,
  })
    .then(response => response.json())
    .then(() => {
      addToCartButton.removeAttribute('disabled');
      document.dispatchEvent(new CustomEvent('theme:loading:end'));
      document.dispatchEvent(new CustomEvent('product:added', {
        bubbles: true,
        detail: {
          quantity: 1
        }
      }));
    })
    .catch(error => {
      addToCartButton.removeAttribute('disabled');
      document.dispatchEvent(new CustomEvent('theme:loading:end'));

      console.error(error);
    });
}