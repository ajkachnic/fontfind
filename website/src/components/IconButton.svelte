<script>
import { tw } from "twind";
import { createEventDispatcher } from 'svelte'
import Icon from './Icon.svelte'

const dispatch = createEventDispatcher()

export let name: string;
export let size = 48;
export let button: HTMLButtonElement | undefined = undefined;

const broadcast = (e: string) => { return () => dispatch(e) }

</script>
<button class={tw`bg-gray-700 p-2`} style={`border-radius: 50%`} bind:this={button} on:click={broadcast('click')}>
  <Icon name={name} size={size}/>
</button>