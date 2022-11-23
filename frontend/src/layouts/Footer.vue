<template>
  <q-footer style="background-color: #003366" class="text-white">
    <div class="row flex-center">
      <q-btn flat label="Home" class="footer-style" id="footer-home" href="https://www.gov.bc.ca/"></q-btn>
      <q-btn flat label="About gov.bc.ca" class="footer-style" id="footer-about" href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca"></q-btn>
      <q-btn flat label="Disclaimer" class="footer-style" id="footer-disclaimer" href="http://gov.bc.ca/disclaimer"></q-btn>
      <q-btn flat label="Privacy" class="footer-style" id="footer-privacy" href="http://gov.bc.ca/privacy"></q-btn>
      <q-btn flat label="Accessibility" class="footer-style" id="footer-accessibility" href="http://gov.bc.ca/webaccessibility"></q-btn>
      <q-btn flat label="Copyright" class="footer-style" id="footer-copyright" href="http://gov.bc.ca/copyright"></q-btn>
      <q-btn flat label="Contact Us" class="footer-style" id="footer-contact" href="https://www2.gov.bc.ca/gov/content/home/contact-us"></q-btn>
    </div>
  </q-footer>
</template>

<script>
export default {};
</script>

<style>
  .footer-style{
    font-weight: 500;
    letter-spacing: .0892857143em;
  }
  .q-footer{
    border-top: 2px solid rgb(252, 186, 25) !important;
    min-width: 100%;
  }
  .q-btn--active.footer:before,
  .q-btn.footer:focus:before,
  .q-btn.footer:hover:before {
    background: none;
  }
  .q-btn{
    text-transform: initial;
  }
</style>
