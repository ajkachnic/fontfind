<script lang="typescript">
import type { Font, ClientMessage, ServerMessage } from "@fontfind/core";
import { tw, setup } from "twind";
import * as colors from "twind/colors";
import tinykeys from "tinykeys";
import { nanoid } from "nanoid";
import { createPopper } from "@popperjs/core";

import { connect } from "./api";
import Content from "./layouts/Content.svelte";

import BottomBar from "./components/BottomBar.svelte";
import IconButton from "./components/IconButton.svelte";
import { onMount } from "svelte";

setup({
  theme: {
    extend: {
      fontFamily: {
        sans: ["Be Vietnam", "sans-serif"],
      },
      colors: {
        gray: colors.blueGray,
      },
    },
  },
});
const socket = connect(import.meta.env.SNOWPACK_PUBLIC_API_URL);
let font: Font = {
  family: "Be Vietnam",
  version: "1",
  lastModified: "",
  variants: ["regular"],
  files: {},
};

// Generate a user ID
const user =
  localStorage.getItem("userid") ||
  (() => {
    const id = nanoid(64);
    localStorage.setItem("userid", id);
    return id;
  })();

const sendLike = (type: "like" | "dislike") => {
  const message: ClientMessage = {
    type,
    data: {
      id: font.family,
      user,
    },
  };
  socket.send(JSON.stringify(message));
  console.log(`sent ${type}`);
  requestRecommendation();
};

const requestRecommendation = () => {
  const message: ClientMessage = {
    type: "recommend",
    data: {
      user,
    },
  };

  socket.send(JSON.stringify(message));
};

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data.toString()) as ServerMessage;

  switch (message.type) {
    case "recommendation":
      // Request new fonts until we don't get a duplicae
      if (JSON.stringify(message.data) === JSON.stringify(font)) {
        requestRecommendation();
      } else {
        font = message.data;
      }
      break;
  }
});

tinykeys(window, {
  ArrowLeft: () => sendLike("dislike"),
  ArrowRight: () => sendLike("like"),
  // VIM SHORTCUTS!
  h: () => sendLike("dislike"),
  l: () => sendLike("dislike"),
});

let style = `font-family: ${font.family}`;

// Adjust the font that's loading reactively
$: {
  style = `font-family: ${font.family}`;
}

let show = false;
let menu: HTMLElement;
let dropdownButton: HTMLButtonElement | undefined;
let menuWrapper: HTMLElement;

const toggleDropdown = () => {
  if (show) {
    show = false;
  } else {
    show = true;
    // @ts-ignore
    // ssshhhh
    createPopper(dropdownButton, menu, {
      placement: "top",
    });
  }
};

onMount(() => {
  const handleOutsideClick = (event: MouseEvent) => {
    // @ts-ignore
    if (show && !menuWrapper.contains(event.target)) {
      show = false;
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (show && event.key === "Escape") {
      show = false;
    }
  };

  document.addEventListener("click", handleOutsideClick, false);
  document.addEventListener("keyup", handleEscape, false);

  return () => {
    document.removeEventListener("click", handleOutsideClick, false);
    document.removeEventListener("keyup", handleEscape, false);
  };
});
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;600;700&display=swap"
    rel="stylesheet" />
  <link
    href="{`https://fonts.googleapis.com/css2?family=${font.family
      .split(' ')
      .join('+')}:wght@400;600;700&display=swap`}"
    rel="stylesheet" />
  <script src="https://unpkg.com/phosphor-icons"></script>
</svelte:head>
<main class="{tw`bg-gray-900 w-full h-screen text-gray-100`}">
  <header>
    <span class="{tw`font-bold text-3xl mx-8 mt-8`}"> fontfind.app </span>
  </header>
  <div class="{tw`container mx-auto`}" style="{style}">
    <Content font="{font}" />
  </div>
  <div class="{tw`absolute bottom-32 left-4 right-4`}">
    <BottomBar font="{font}" sendLike="{sendLike}" />
  </div>
  <div class="{tw`absolute bottom-4 left-4`}" bind:this="{menuWrapper}">
    <IconButton
      name="gear"
      bind:button="{dropdownButton}"
      on:click="{toggleDropdown}" />
    <div
      bind:this="{menu}"
      class="{tw`origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-800
        rounded shadow-md ${show ? 'block' : 'hidden'}`}">
      <a
        href="https://github.com/ajkachnic/fontfind"
        class="{tw`block px-4 py-2 hover:bg-blue-500 hover:text-blue-100`}"
        >View source</a>
    </div>
  </div>
</main>
