<script lang="ts">
    import "$lib/themes/theming.css";
    import IconSource from "../icon-source.svelte";
    import AnimTypingText from "../anim-typing-text.svelte";
    import ModalHost from "$lib/components/modals/modal-host.svelte";
    import ModalLoading from "$lib/layouts/modal-loading.svelte";
    import { GlobalVars } from "$lib/global-accessor";
    import { onMount } from "svelte";
    import type { SnsEntryReminderModalText } from "../text-parts";

    let {
        icon,
        text = "text",
        modalTexts = {
          header: "Reminder",
          proceed: "Click here to Proceed",
          loading: "Redirecting",
          cancel: "Cancel"
        },
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
        modalTexts?: SnsEntryReminderModalText;
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

    const ongoingTimeouts: Array<number> = [];

    function reminderIsEmpty() {
        return children === null || children === undefined;
    }

    function clearTimeouts() {
        let item: number | undefined;
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

    const unfocusAccessor = () => onPointerLeave();

    function onPointerOver() {
        const key = setTimeout(() => {
            focused = true;
            clearTimeouts();
            timeoutSecret();
        }, 50);

        const prevFocusedEntry = GlobalVars.get("entry-unfocus");
        if (typeof prevFocusedEntry === "function" && prevFocusedEntry != unfocusAccessor) {
          prevFocusedEntry();
        }

        ongoingTimeouts.push(key);
        txt?.startTextAnimation();

        GlobalVars.set("entry-unfocus", unfocusAccessor);
    }

    export function onPointerLeave() {
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
            header: modalTexts.header,
            onshow: (_, close) => {
                reminderCloseAccessor = close;
            },
            buttons: [
                {
                    text: modalTexts.proceed,
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
            { cancel: closeModalWeakRef, text: modalTexts.loading, buttonText: modalTexts.cancel },
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

      const button = view as HTMLLinkElement;

      if(button === null)
        throw new EvalError("Cannot get Button instance while onMount stage");

      button.addEventListener("focusin", onPointerOver);
      button.addEventListener("pointerenter", onPointerOver);

      // button.addEventListener("focusout", onPointerLeave);
      //button.addEventListener("pointerleave", onPointerLeave);

      return () => {
        button.removeEventListener("focusin", onPointerOver);
        button.removeEventListener("pointerenter", onPointerOver);

        // button.removeEventListener("focusout", onPointerLeave);
        //button.removeEventListener("pointerleave", onPointerLeave);
      };
    });
</script>

<!-- onfocusin={onPointerOver}
onfocusout={onPointerLeave}
onmouseenter={onPointerOver}
onmouseleave={onPointerLeave} -->

<a
    bind:this={view}
    class="profile-button"
    class:expanded
    class:focused
    title={secretText ?? hint}
    href={reminderIsEmpty() ? href : "javascript:void(0)"}
    onclick={onClick}
>
    <span class="copy-only-text">
        <span>{text}</span>{#if secretText != undefined}
            <span>
                <span> </span>
                <span>({secretText})</span>
        </span>{/if}<span>: {reminderIsEmpty() ? href : "(*)"}</span>
    </span>
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

    a > * {
        user-select: none;
    }

    .profile-button {
        display: grid;
        grid-template-columns: 1fr;
        padding: 8px;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > .copy-only-text{
        user-select: text;
        width: 0;
        height: 0;
        overflow: clip;
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
