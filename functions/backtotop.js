window.onscroll = function() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 20) {
      document.getElementById("backToTopBtn").style.display = "block";
  } else {
      document.getElementById("backToTopBtn").style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling effect
  });
}