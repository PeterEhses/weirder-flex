<template>
  <div>
    <input type="range" name="weight" id="Sl-Weight" min="0" max="1" step=".0001" v-model="slant"/>
    <input type="range" name="width" id="Sl-Width" min="0" max="1" step=".0001" v-model="weight"/>
    <input type="range" name="slant" id="Sl-Slant" min="0" max="1" step=".0001" v-model="width"/>
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
      if( module.getPadId() === 'Unknown Gamepad (STANDARD GAMEPAD Vendor: 18d1 Product: 9400)'){
        self.width = (module.getAllSticks()['L'].value[0]/2)+.5
        self.slant= module.getAllButtons()['L2'].value
        self.weight = (module.getAllSticks()['L'].value[1]/-2)+.5
        // console.log([...module.getAllSticks()['L'].value, module.getAllButtons()['L2'].value])
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
