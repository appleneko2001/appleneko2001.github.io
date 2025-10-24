<script lang="ts">
    import {fade} from 'svelte/transition'
    import ProfileEntry from "$lib/components/profile/entry.svelte";
    import ProfileEntryWithRemind from "$lib/components/profile/entry-with-reminder.svelte";
    import ProfileAvatar from "$lib/components/profile/avatar.svelte";
    import {AvatarSourceUrl} from "$lib/assets/avatar-source";
    import MyButton from '$lib/components/my-button.svelte';
    import {GlobalVars} from "$lib/global-accessor";
    import ModalHost from '$lib/components/modals/modal-host.svelte';

    import AboutWebsite from '$lib/layouts/modal-about-website.svelte';

    function about(){
        const modalHost = GlobalVars.get("ModalHost") as ModalHost;
        modalHost.showModal(AboutWebsite, undefined, { header: "Info" });
    }
</script>

<svelte:head>
    <title>Portfolio</title>
    <meta name="description" content="My simple portfolio webpage 🫠"/>
    <meta property="og:description" content="My simple portfolio webpage 🫠"/>
    <meta property="og:title" content="Portfolio"/>
    <meta property="og:type" content="profile"/>
    <meta property="og:profile:username" content="appleneko2001"/>
    <meta property="og:image" content={AvatarSourceUrl}/>
</svelte:head>

<div class="profile-page"
     in:fade={{ duration: 300, delay: 100 }}
     out:fade={{ duration: 300 }}>
    <ProfileAvatar src={AvatarSourceUrl}/>

    <br/>

    <div class="entries">

        <!--        <ProfileEntry icon="x" text="Twitter (formerly X)"-->
        <!--                      href="https://twitter.com/appleneko2001"/>-->
        <ProfileEntryWithRemind icon="discord" text="Discord" showLoading={true}
                      href="https://discord.com/users/499588722174459914">
            <style>
                .reminder {
                    margin: 8px;
                    max-width: 320px;
                }
            </style>
            <div class="reminder">
                Due to stupid discord fraud chatbot annoyance, please send me a purpose of chat request before DM-ing me by other ways, otherwise I would ignore your DM request. Thanks for your understanding.
            </div>
        </ProfileEntryWithRemind>
        <ProfileEntry icon="bluesky" text="Bluesky" showLoading={true}
                      href="https://appleneko2001.bsky.social"/>
        <ProfileEntry icon="github" text="GitHub" showLoading={true}
                      href="https://github.com/appleneko2001"/>
        <ProfileEntry icon="osu" text="osu!" showLoading={true}
                      href="https://osu.ppy.sh/users/11455502"/>
    </div>


    <div class="entries">
        <ProfileEntry icon="material:folder_special" text="Works" expanded={true} hint={null}
                      href="/works"/>
    </div>

    <div class="footer-area">
        <MyButton text="Info" icon={{ icon: 'material:info', size: 16 }} click={about}/>
        <!--<MyButton text="Link exchange" icon={{ icon: 'material:badge', size: 16 }} click={exchangeLinks}/>-->
    </div>
</div>

<style>
    .profile-page {
        min-height: max(560px, 100vh);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }

    .entries {
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        align-content: center;
        gap: 1rem;
    }

    .footer-area {
        position: absolute;
        bottom: 0;
        margin: 16px 8px;
        display: flex;
    }

    @media screen and (width < 600px) {
        .entries {
            max-width: 390px;
        }
    }
</style>