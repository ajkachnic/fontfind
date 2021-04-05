<script lang="ts">
import type { Font } from "@fontfind/core";
import Icon from "./Icon.svelte";
import { tw } from "twind";
export let font: Font;

export let sendLike: (type: "like" | "dislike") => void;

const copy = navigator.clipboard.writeText;
</script>

<div
  class="{tw`bg-gray-800 min-w-min max-w-2xl mx-auto py-4 rounded-lg flex-row flex items-center justify-between children:mx-8 shadow-lg`}">
  <span
    class="{tw`font-bold text-2xl text-gray-200`}"
    on:click="{() => {
      copy(font.family);
    }}">
    {font.family}
  </span>

  <div>
    <button on:click="{() => sendLike('like')}">
      <Icon name="thumbs-up" size="{32}" />
    </button>
    <button on:click="{() => sendLike('dislike')}">
      <Icon name="thumbs-down" size="{32}" />
    </button>
  </div>
</div>
