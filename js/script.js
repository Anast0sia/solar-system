const nav = document.querySelector(".nav-list");
const info = document.querySelector(".info"),
  facts = document.querySelector(".moon-facts"),
  elems = document.querySelectorAll(".elem");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev"),
  next = document.querySelector(".next");
const text = document.querySelectorAll(".slide__container .front p");
const width = window.innerWidth;
const dotsContainer = document.querySelector(".dots");
const modal = document.querySelector(".modal");
const doc = document.querySelector(".document");
const ok = document.querySelector(".ok");

let currSlide = 0;

slides.forEach((_, i) => dotsContainer.insertAdjacentHTML("beforeend", `<div class="dot" data-slide="${i}"></div>`));
const dots = document.querySelectorAll(".dot");
toSlide();

function handler(el) {
  try {
    el.addEventListener("mouseover", (e) => {
      elems.forEach((el) => {
        el.style.opacity = 0.5;
        el.style.transform = "scale(0.9)";
      });
      let elem = e.target.closest(".elem");
      if (elem) {
        elem.style.opacity = 1;
        elem.style.transform = "scale(1)";
      }
    });

    el.addEventListener("mouseout", () => {
      elems.forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "scale(1)";
      });
    });
  } catch (err) {
    return;
  }
}

handler(info);
handler(facts);

function toSlide() {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currSlide)}%)`;
  });
  dots.forEach((dot, i) => {
    dot.style.background = "#C4C4C4";
    if (i == currSlide) {
      dot.style.background = "#6A6A6A";
    }
  });
}

try {
  next.addEventListener("click", () => {
    currSlide++;
    if (currSlide > slides.length - 1) {
      currSlide = 0;
    }
    toSlide();
  });

  prev.addEventListener("click", () => {
    currSlide--;
    if (currSlide < 0) {
      currSlide = slides.length - 1;
    }
    toSlide();
  });

  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      currSlide = e.target.dataset.slide;
      toSlide();
    }
  })
} catch (err) {
  console.log();
}

if (width < 767) {
  text.forEach((p) => (p.textContent = "Нажми на меня"));
}

try {
  const burger = document.querySelector(".burger");

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("nav-list_active");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      burger.classList.toggle("burger_active");
      nav.classList.remove("nav-list_active");
    }
  });
} catch (err) {
  console.log();
}

try {
  setTimeout(() => {
    try {
      modal.classList.add("modal_active");
      doc.classList.add("document_active");
    } catch (err) {
      console.log();
    }
  }, 5_000);
  ok.addEventListener("click", () => {
    modal.classList.remove("modal_active");
    doc.classList.remove("document_active");
  });
} catch (err) {
  console.log();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
    }
  })
}, {threshold: 0.1});

document.querySelectorAll(".hidden").forEach(el => {
  observer.observe(el);
});