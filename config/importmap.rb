pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "controllers", to: "controllers.js"
pin "@rails/activestorage", to: "activestorage.js"  
pin_all_from "app/javascript/controllers", under: "controllers"
pin "tailwindcss", to: "tailwindcss/tailwind.min.css"




