// BRAVVA settings. Change a value here, save, then Commit + Push in GitHub Desktop.
// PAYPAL: paste your PayPal payment link (or button link) between the quotes.
window.BRAVVA_PAYPAL = "https://www.paypal.com/ncp/payment/G8E4ATWLSL334";
// Where buyers can reach you (used on Terms, Privacy, Refund and Thank-you pages).
window.BRAVVA_CONTACT = "hello@bravvaclub.com";
// Every Join / Claim button goes to PayPal once BRAVVA_PAYPAL is set. Until then they scroll to Pricing.
window.BRAVVA_LINKS = {
  join: window.BRAVVA_PAYPAL || "#pricing",
  founding: window.BRAVVA_PAYPAL || "#pricing"
};
