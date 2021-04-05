<script lang="ts">
import type { Font } from "@fontfind/core";

import { tw } from "twind";

export let font: Font;

</script>
<div style={`font-family: ${font.family}`} class={tw`max-w-4xl mx-auto`}>
  <h1 class={tw`text-5xl font-bold my-6 text-gray-200`}>
    This is my header
  </h1>
  <p class={tw`text-gray-300 my-4 text-lg`}>
    And here is my simple body paragraph. Pretty cool right? I think so. Very much copy. Okay now this is just kinda awkward. You’re still reading? Do you have any respect for your time?
  </p>

  <h2 class={tw`text-3xl font-bold my-6 text-gray-200`}>
    Todo List
  </h2>

  <ul class={tw`text-gray-300 text-lg list-disc list-inside`}>
    <li>
      Insult the reader
    </li>
    <li>
      Write fontfind.dev
    </li> 
    <li>
      Write stupid copy
    </li>
    <li>
      Lorem ipsum dolar something something
    </li>
  </ul>
</div>