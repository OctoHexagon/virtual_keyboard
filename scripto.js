const Keyboard = {
   elements: {
      main: null,
      keysContainer: null,
      keys: []
   },

   eventHandlers: {
      oninput: null,
      onclose: null
   },

   properties: {
      value: "",
      capsLock: false
   },

   init(vall, checker) {
      // Create main elements
      if (checker === 1) {
         this.elements.keysContainer.appendChild(this._createKeys(vall));
      }
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");

      // Setup main elements
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys(vall));
   },
   init_end() {
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);

      // Automatically use keyboard for elements with .use-keyboard-input

      document.querySelectorAll(".use-keyboard-input").forEach(element => {
         element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
               element.value = currentValue;
            });
         });
      });
   },

   _createKeys(value) {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
         "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "en/ru",
         "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
         "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
         "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
         "space"
      ];
      const rusLayout = ["done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "en/ru",
         "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
         "х", "ъ", "caps", "ф", "ы", "в", "а", "п", "р", "о",
         "л", "д", "ж", "э", "ё", "enter", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "?",
         "space"
      ];
      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
         return `<i class="material-icons">${icon_name}</i>`;
      };
      if (value === "en") {
         keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
               case "backspace":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("backspace");

                  keyElement.addEventListener("click", () => {
                     this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                     this._triggerEvent("oninput");
                  });

                  break;

               case "caps":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                  keyElement.innerHTML = createIconHTML("keyboard_capslock");

                  keyElement.addEventListener("click", () => {
                     this._toggleCapsLock();
                     keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                  });

                  break;
               case "en/ru":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("last_page");
                  keyElement.addEventListener("click", () => {
                     this._delete();
                     var brs = document.querySelectorAll("br");
                     for (let br of brs) {
                        br.remove();
                     }
                     Keyboard.elements.keysContainer.appendChild(this._createKeys("ru"));
                     Keyboard.init_end();

                  });
                  break;
               case "enter":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("keyboard_return");

                  keyElement.addEventListener("click", () => {
                     this.properties.value += "\n";
                     this._triggerEvent("oninput");
                  });

                  break;

               case "space":
                  keyElement.classList.add("keyboard__key--extrawide");
                  keyElement.innerHTML = createIconHTML("space_bar");

                  keyElement.addEventListener("click", () => {
                     this.properties.value += " ";
                     this._triggerEvent("oninput");
                  });

                  break;

               case "done":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("check_circle");

                  keyElement.addEventListener("click", () => {
                     this.close();
                     this._triggerEvent("onclose");
                  });

                  break;

               default:
                  keyElement.textContent = key.toLowerCase();

                  keyElement.addEventListener("click", () => {
                     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                     this._triggerEvent("oninput");
                  });

                  break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
               fragment.appendChild(document.createElement("br"));
            }
         });
      }
      else if (value === "ru") {
         rusLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "ъ", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
               case "backspace":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("backspace");

                  keyElement.addEventListener("click", () => {
                     this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                     this._triggerEvent("oninput");
                  });

                  break;

               case "caps":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                  keyElement.innerHTML = createIconHTML("keyboard_capslock");

                  keyElement.addEventListener("click", () => {
                     this._toggleCapsLock();
                     keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                  });

                  break;
               case "en/ru":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("last_page");
                  keyElement.addEventListener("click", () => {
                     this._delete();
                     var brs = document.querySelectorAll("br");
                     for (let br of brs) {
                        br.remove();
                     }
                     Keyboard.elements.keysContainer.appendChild(this._createKeys("en"));
                     Keyboard.init_end();

                  });
                  break;
               case "enter":
                  keyElement.classList.add("keyboard__key--wide");
                  keyElement.innerHTML = createIconHTML("keyboard_return");

                  keyElement.addEventListener("click", () => {
                     this.properties.value += "\n";
                     this._triggerEvent("oninput");
                  });

                  break;

               case "space":
                  keyElement.classList.add("keyboard__key--extrawide");
                  keyElement.innerHTML = createIconHTML("space_bar");

                  keyElement.addEventListener("click", () => {
                     this.properties.value += " ";
                     this._triggerEvent("oninput");
                  });

                  break;

               case "done":
                  keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                  keyElement.innerHTML = createIconHTML("check_circle");

                  keyElement.addEventListener("click", () => {
                     this.close();
                     this._triggerEvent("onclose");
                  });

                  break;

               default:
                  keyElement.textContent = key.toLowerCase();

                  keyElement.addEventListener("click", () => {
                     this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                     this._triggerEvent("oninput");
                  });

                  break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
               fragment.appendChild(document.createElement("br"));
            }
         });
      }

      return fragment;
   },

   _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
         this.eventHandlers[handlerName](this.properties.value);
      }
   },
   _delete() {
      for (const key of this.elements.keys) {
         key.remove();
      }
   },
   _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (const key of this.elements.keys) {
         if (key.childElementCount === 0) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         }
      }
   },

   open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
   },

   close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
   }
};

window.addEventListener("DOMContentLoaded", function () {
   Keyboard.init("en", 0);
   Keyboard.init_end();
});