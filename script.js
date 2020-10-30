const keyboard = {
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
   init() {
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");

      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());

      this.elements.main.appendChild(this.elements.keyContainer);
      document.body.appendChild(this.elements.main);
   },
   _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
         "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
         "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
         "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
         "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
         "space"
     ];
      const rusLayout = ["done","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
      "х", "ъ", "ф", "caps", "ы", "в", "а", "п", "р", "о",
      "л", "д", "ж", "э", "ё", "enter",  "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "?",
      "space"
   ];
      const createIconHTML = (icon_name) => {
         return `<i class="material-icons">${icon_name}</i>`;
      };
       
   _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
         this.eventHandlers[handlerName](this.properties.value);
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
}};
window.addEventListener("DOMContentLoader", function () {
   KeyboardEvent.init();
})