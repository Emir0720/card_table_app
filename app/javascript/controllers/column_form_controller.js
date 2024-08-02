import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form"];

  toggle() {
    if (this.hasFormTarget) {
      this.formTarget.classList.toggle("hidden");
      console.log("Form visibility toggled.");
    } else {
      console.error("Form target not found.");
    }
  }
}
