<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {

      caches.keys().then((names) => {
        for (let name of names) {
          caches.delete(name);
        }
      });

      window.location.replace("/");
    });
</script>
