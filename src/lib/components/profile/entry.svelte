<script lang="ts">
    import "$lib/themes/theming.css";
    import IconSource from "../icon-source.svelte";
    import AnimTypingText from "../anim-typing-text.svelte";
    import ModalHost from "$lib/components/modals/modal-host.svelte";
    import ModalLoading from "$lib/layouts/modal-loading.svelte";
    import { GlobalVars } from "$lib/global-accessor";
    import { onMount } from "svelte";

    let {
        icon,
        text = "text",
        secretIcon = undefined,
        secretText = undefined,
        href,
        expanded = false,
        focused = false,
        children = null,
        hint = text,
        showLoading = false,
    }: {
        icon?: any;
        text?: string;
        secretIcon?: any | undefined;
        secretText?: string | undefined;
        href?: string;
        expanded?: boolean;
        focused?: boolean;
        children?: any;
        hint?: string | null;
        showLoading?: boolean;
    } = $props();

    let txt: AnimTypingText | null = null;
    let ico: IconSource | null = null;
    let secretTxt: AnimTypingText | null = null;
    let secretIco: IconSource | null = null;
    let view: HTMLElement;

    const ongoingTimeouts: Array<NodeJS.Timeout | number> = [];

    function reminderIsEmpty() {
        return children === null || children === undefined;
    }

    function clearTimeouts() {
        let item: NodeJS.Timeout | number | undefined;
        while ((item = ongoingTimeouts.pop()) != undefined) {
            clearTimeout(item);
        }
    }

    function timeoutSecret() {
      const key = setTimeout(() => {
        triggerSecret();
      }, 2000);
      ongoingTimeouts.push(key);

    }

    function triggerSecret() {
        const i = secretIco;
        if(i != undefined){
          i.setHidden(false);
          ico?.setHidden(true);
        }

        const t = secretTxt;
        if(t != undefined){
            txt?.startTextAnimation(true);
            secretTxt?.startTextAnimation();
        }
    }

    function hideSecret() {
        ico?.setHidden(false);
        secretIco?.setHidden(true);
        secretTxt?.startTextAnimation(true);
    }

    function onPointerOver() {
        const key = setTimeout(() => {
            focused = true;
            clearTimeouts();
            timeoutSecret();
        }, 50);

        const prevFocusedEntry = GlobalVars.get("focused-entry");
        if (typeof prevFocusedEntry === "object" && prevFocusedEntry !== view) {
            const caller = prevFocusedEntry["__focusout"];
            if (typeof caller === "function") caller();
        }

        ongoingTimeouts.push(key);
        txt?.startTextAnimation();

        GlobalVars.set("focused-entry", view);
    }

    function onPointerLeave() {
        clearTimeouts();
        focused = false;

        hideSecret();
        txt?.startTextAnimation(true);
    }

    function onClick(e: UIEvent) {
        if (!focused && expanded !== true) {
            e.preventDefault();
            return;
        }

        if (!showLoading) return;

        const reminder = children;

        if (reminder === null || reminder === undefined) {
            nextStageAfterReminder();
            return;
        }

        showReminder(reminder);
    }

    let reminderCloseAccessor: Function | null = null;

    function showReminder(reminder: any) {
        const modalHost = GlobalVars.get("ModalHost") as ModalHost;
        modalHost.showModal(reminder, undefined, {
            header: "Reminder",
            onshow: (_, close) => {
                reminderCloseAccessor = close;
            },
            buttons: [
                {
                    text: "Proceed",
                    click: () => {
                        reminderCloseAccessor?.();
                        nextStageAfterReminder();
                    },
                },
            ],
        });
    }

    function nextStageAfterReminder() {
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
        host?.showModal(
            ModalLoading,
            { cancel: closeModalWeakRef, text: "Redirecting" },
            {
                header: null,
                isUserCloseable: false,
                onshow: (_, close) => {
                    closeModal = close;
                },
                dialogProps: {
                    style: "min-width: 120px; min-height: 120px;",
                },
            },
        );

        window.onabort = () => closeModal?.();
        window.onpagehide = () => closeModal?.();

        const cancelLoad = function () {
            window.onbeforeunload = () => closeModal?.();

            document.removeEventListener("DOMContentLoaded", cancelLoad);
        };

        document.addEventListener("DOMContentLoaded", cancelLoad);
    }


    onMount(() => {
      hideSecret();
    });
</script>

<a
    bind:this={view}
    class="profile-button"
    class:expanded
    class:focused
    title={secretText ?? hint}
    href={reminderIsEmpty() ? href : "javascript:void(0)"}
    onfocusin={onPointerOver}
    onfocusout={onPointerLeave}
    onmouseenter={onPointerOver}
    onmouseleave={onPointerLeave}
    onclick={onClick}
>
    <!-- {@render icon?.()} -->
    <div class="content">
        <IconSource bind:this={ico} {icon} size={32} />

        <span class="text">
            <AnimTypingText
                bind:this={txt}
                {text}
                disabled={expanded}
                duration={100}
            />
        </span>
    </div>

    <div class="secret">
        {#if secretIcon != undefined}
            <IconSource bind:this={secretIco} icon={secretIcon} wasHidden={true} size={32} />
        {/if}

        {#if secretText != undefined}
            <span class="text">
                <AnimTypingText
                    bind:this={secretTxt}
                    text={secretText}
                    disabled={expanded}
                    duration={100}
                />
            </span>
        {/if}
    </div>
</a>

<style>
    a {
        text-decoration: none;
        color: var(--foreground-colour);
    }

    .profile-button {
        display: grid;
        grid-template-columns: 1fr;
        padding: 8px;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > div {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        align-items: center;
        grid-area: 1 /1;
    }

    .profile-button .text {
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.2em;
    }

    .profile-button .text :global(span) {
        margin-left: 8px;
    }

    .text :global(span:empty) {
        display: none;
    }

    .profile-button.focused {
        border: var(--foreground-colour) 2px solid;
    }
</style>
