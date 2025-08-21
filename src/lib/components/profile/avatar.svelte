<script lang="ts">
    // icon provider: simple-icons
    let { src } = $props();
</script>

<div class="profile-avatar" style="background-image: url({src})">

</div>

<style>
    .profile-avatar{
        width:320px;
        height:320px;
        background-size:cover;
        border-radius: 50%;
    }
</style>