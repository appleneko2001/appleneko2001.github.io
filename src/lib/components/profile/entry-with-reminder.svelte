<script lang="ts">
    import "$lib/themes/theming.css";
    import IconSource from "../icon-source.svelte";
    import AnimTypingText from "../anim-typing-text.svelte";
    import ModalHost from '$lib/components/modals/modal-host.svelte';
    import ModalLoading from '$lib/layouts/modal-loading.svelte';
    import {GlobalVars} from "$lib/global-accessor";

    let {
        icon,
        text = "text",
        href,
        expanded = false,
        focused = false,
        children = null,
        hint = text,
        showLoading = false,
    }: {
        icon?: any,
        text?: string,
        href?: string,
        expanded?: boolean,
        focused?: boolean,
        children?: any,
        hint?: string | null,
        showLoading?: boolean,
    } = $props();

    let txt: AnimTypingText | null = null;

    const ongoingTimeouts: Array<NodeJS.Timeout | number> = [];

    function clearTimeouts() {
        let item: NodeJS.Timeout | number | undefined;
        while ((item = ongoingTimeouts.pop()) != undefined) {
            clearTimeout(item);
        }
    }

    function onPointerOver() {
        const key = setTimeout(() => {
            focused = true;
            clearTimeouts();
        }, 50);
        ongoingTimeouts.push(key);

        txt?.startTextAnimation();
    }

    function onPointerLeave() {
        clearTimeouts();
        focused = false;

        txt?.startTextAnimation(true);
    }

    function onClick(e: UIEvent) {
        if (!focused && expanded !== true) {
            e.preventDefault();
            return;
        }

        if (!showLoading)
            return;

        showReminder();
    }

    let reminderCloseAccessor: Function | null = null;

    function showReminder() {
        const modalHost = GlobalVars.get("ModalHost") as ModalHost;
        modalHost.showModal(children, undefined, {
            header: "Reminder",
            onshow: (_, close) => {
                reminderCloseAccessor = close;
            },
            buttons: [
                {
                    text: "Proceed",
                    click: nextStageAfterReminder
                }
            ]
        });
    }

    function nextStageAfterReminder() {
        reminderCloseAccessor?.();

        const ev = setTimeout(() => window.open(href ?? "", "_self"), 500);

        // Cancel redirect implementation
        function closeModalWeakRef() {
            clearTimeout(ev);
            window.stop();
            closeModal?.();
        }

        let closeModal: Function;

        // Show modal "redirecting" with cancel button
        const host = GlobalVars.get("ModalHost") as ModalHost;
        host?.showModal(ModalLoading, {cancel: closeModalWeakRef, text: "Redirecting"},
            {
                header: null, isUserCloseable: false,
                onshow: (_, close) => {
                    closeModal = close;
                },
                dialogProps: {
                    style: "min-width: 120px; min-height: 120px;"
                }
            });

        window.onabort = () => closeModal?.();
        window.onpagehide = () => closeModal?.();

        const cancelLoad = function () {
            window.onbeforeunload = () => closeModal?.();

            document.removeEventListener("DOMContentLoaded", cancelLoad);
        }

        document.addEventListener("DOMContentLoaded", cancelLoad);
    }
</script>

<!--{href}-->

<a class="profile-button"
   class:expanded={expanded}
   class:focused={focused}
   title={hint}
   href="javascript:void(0)"
   onfocusin={onPointerOver}
   onfocusout={onPointerLeave}
   onmouseenter={onPointerOver}
   onmouseleave={onPointerLeave}
   onclick={onClick}>
    <!-- {@render icon?.()} -->
    <IconSource icon={icon} size={32}/>

    <span class="text">
        <AnimTypingText bind:this={txt}
                        text={text}
                        disabled={expanded}
                        duration={100}/>
    </span>
</a>

<style>
    a {
        text-decoration: none;
        color: var(--foreground-colour);
    }

    .profile-button {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        padding: 8px;
        align-items: center;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > .text {
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.2em;
    }

    .profile-button > .text :global(span) {
        margin-left: 8px;
    }

    .text :global(span:empty) {
        display: none;
    }

    .profile-button.focused {
        border: var(--foreground-colour) 2px solid;
    }
</style>