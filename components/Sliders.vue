<template>
  <div>
    <input type="range" name="weight" id="Sl-Weight" />
    <input type="range" name="width" id="Sl-Width" />
    <input type="range" name="slant" id="Sl-Slant" />
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
const joymap = createJoymap({
  onPoll() {
    const unusedIds = joymap.getUnusedPadIds();

    if (unusedIds.length > 0) {
      forEach((padId) => setupModule(joymap, padId), unusedIds);
    }

    forEach((module) => {
      if( module.getPadId() === 'Unknown Gamepad (STANDARD GAMEPAD Vendor: 18d1 Product: 9400)'){
        console.log([...module.getAllSticks()['L'].value, module.getAllButtons()['L2'].value])
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
