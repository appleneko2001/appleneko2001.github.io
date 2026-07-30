<script lang="ts">
    const {
      name,
      username
    } = $props();

</script>

<p class="name-card">
    <span class="name">{name}</span><span class="separator"></span><span class="username">
        <span class="sym">(@</span>{username}<span class="sym">)</span>
    </span>
</p>

<style>
    .name-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .name-card > span {
        display: inline;
    }

    .name {
        font-size: 2.4em;
    }

    .separator {
        background-color: var(--foreground-colour);
        width: 100%;
        height: 2px;
    }

    .username > .sym{
        display: inline-block;
        max-width: 0;
        overflow: clip;
    }
</style>
