<template>
   <div class="stats">

    <div class="slider">

      <div class="value_label">{{Math.round(((weight*2)-1)*900)}}</div>
      <input class="range" type="range" name="width" id="Sl-Weight" value="0" min="0" max="1" step=".0001" v-model="weight" />
      <p>Weight</p>

    </div>

    <div class="slider">

      <div class="value_label">{{Math.round(((width*2)-1)*900)}}</div>
      <input class="range" type="range" name="slant" id="Sl-Width" value="450" min="0" max="1" step=".0001" v-model="width"/>
      <p>Width</p>

    </div>

    <div class="slider">

      <div class="value_label">{{Math.round(slant*900)}}</div>
      <input class="range" type="range" name="weight" id="Sl-Slant" value="0" min="0" max="1" step=".0001" v-model="slant"/>
      <p>Slant</p>

    </div>

  </div>
</template>

<script>
import {createJoymap, createQueryModule} from 'joymap';
import { join, compact, forEach } from 'lodash/fp';

function setupModule(joymap, padId) {
  const m = createQueryModule({ padId });
  joymap.addModule(m);
  };


export default {
  computed: {
    weight: {
      get(){return this.$store.getters.getFontWeight},
      set(val){this.$store.dispatch("setFontWeight", val)}
    },
    width: {
      get(){return this.$store.getters.getFontWidth},
      set(val){this.$store.dispatch("setFontWidth", val)}
    },
    slant: {
      get(){return this.$store.getters.getFontSlant},
      set(val){this.$store.dispatch("setFontSlant", val)}
    }
  },
  methods: {
    receiveGamepadEvent(e) {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
      );
    },
  },
  mounted() {
    window.addEventListener(
      "gamepadconnected",
      this.receiveGamepadEvent
    );
// Initial joymap setup
var self = this
const joymap = createJoymap({
  onPoll() {
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      forEach((padId) => setupModule(joymap, padId), unusedIds);
    }

    forEach((module) => {
      if( module.getPadId() === 'Unknown Gamepad (Vendor: e502 Product: bbab)'){
        self.width = (module.getAllSticks()['L'].value[1])+.5
        self.slant= -module.getAllSticks()['R'].value[0]
        self.weight = ((module.getAllSticks()['L'].value[0])-.2)*(1/.25)
        // console.log([module.getAllSticks(), module.getAllButtons()])
      }
    }, joymap.getModules());
  },
});

joymap.start();

  },
  unmounted() {
    window.removeEventListener("gamepadconnected", this.receiveGamepadEvent);
  },
};
</script>

<style></style>
