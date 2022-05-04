<template>
  <div class="carousel-wrapper">
    <VueSlickCarousel v-bind="settings">
      <div class="slideHeight">1</div>
      <div class="slideHeight">2</div>
      <div class="slideHeight">3</div>
      <div class="slideHeight">4</div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: 'Carousel',
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        "dots": true,
        "arrows": false,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": false,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.slideHeight {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// @media (max-width: 767px) {
//   // ::v-deep .slick-prev {
//   //   left: 5%;
//   // }
//   // ::v-deep .slick-next {
//   //   right: 5%;
//   // }
// }
// @media (max-width: 480px) {
//   .carousel-wrapper {
//     max-width: 350px;
//   }
// }
// @media (min-width: 480px) and (max-width: 768px) {
//   .carousel-wrapper {
//     width: 400px;
//   }
// }
// @media (min-width: 768px) and (max-width: 979px) {
//   .carousel-wrapper {
//     width: 400px;
//   }
// }
// @media (min-width: 980px) {
//   // .carousel-wrapper {
//   //   width: 400px;
//   // }
// }
// @media (min-width: 1024px) and (max-width: 1220px) {
//   .carousel-wrapper {
//     width: 430px;
//   }
//   // ::v-deep .slick-prev {
//   //   left: 40%;
//   // }
//   // ::v-deep .slick-next {
//   //   right: 40%;
//   // }
// }
// @media (min-width: 1220px) {
//   .carousel-wrapper {
//     width: 490px;
//   }
// }
</style>