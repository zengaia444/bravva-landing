// BRAVVA settings. Change a value here, save, then Commit + Push in GitHub Desktop.
// PAYPAL LINK: fallback checkout page (used if the embedded button can't load).
window.BRAVVA_PAYPAL = "https://www.paypal.com/ncp/payment/G8E4ATWLSL334";
// PAYPAL EMBED: paste the client-id from PayPal's embed code here to show checkout right on the page.
// (PayPal > Pay Links & Buttons > your button > Embed code. The client-id is the long code after "client-id=".)
window.BRAVVA_PAYPAL_CLIENT_ID = "BAA5mS_Z7OouCBKw55DDjF4LXp_pw5jmGegdFBT2W3jwctpPUfwRrLDGJXvN9S3N_TX44TIrQSYFuYRU1U";
window.BRAVVA_PAYPAL_BUTTON_ID = "G8E4ATWLSL334";
// DISCORD: paste the BRAVVA Discord invite link here (e.g. https://discord.gg/xxxx). The thank-you page shows the Join card once it is set.
window.BRAVVA_DISCORD = "https://discord.gg/x2WtAkQHR";
// Where buyers can reach you (used on Terms, Privacy, Refund and Thank-you pages).
window.BRAVVA_CONTACT = "hello@bravvaclub.com";
// Join / Claim buttons: scroll to the on-page checkout when the embed is set up, otherwise open the PayPal link.
window.BRAVVA_LINKS = {
  join: window.BRAVVA_PAYPAL_CLIENT_ID ? "#pricing" : (window.BRAVVA_PAYPAL || "#pricing"),
  founding: window.BRAVVA_PAYPAL || "#pricing"
};

// NEWSLETTER POPUP: paste the script URL from your Systeme.io form embed code here (the src="..." part).
// The popup stays off while this is empty.
window.BRAVVA_NEWSLETTER_SCRIPT = "https://bravva-club.systeme.io/public/remote/page/457634451fbb052f690113fedeae3acb89dd9163.js";
