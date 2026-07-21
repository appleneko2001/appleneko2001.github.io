<script lang="ts">
    const {
      name,
      username
    } = $props();

</script>

<div class="name-card">
    <span class="name">{name}</span>
    <span class="separator">・</span>
    <span class="username">{username}</span>
</div>

<style>
    .name-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .name {
        font-size: 2.4em;
    }

    .separator {
        background-color: var(--foreground-colour);
        width: 100%;
        height: 2px;
        color: transparent;
    }
</style>
