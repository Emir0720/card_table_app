import { Application } from "@hotwired/stimulus"
import "./controllers";


const application = Application.start()

application.debug = false
window.Stimulus   = application

export { application }
