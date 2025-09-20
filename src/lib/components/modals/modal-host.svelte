<script lang="ts">
    import type {Attachment} from "svelte/attachments";
    import {createAttachmentKey} from 'svelte/attachments';
    import ModalView from "./modal-view.svelte";
    import { mount, unmount} from "svelte";

    const modals = $state<any[]>([]);

    let {isForeground = $bindable(false)}: { isForeground: boolean } = $props();

    const openedModals: Map<number, any> = new Map();

    let modalHost: HTMLElement;

    function tryDismissCurrentModal() {

    }

    export async function showModal(
        modal: string | {},
        modalProps: any = undefined,
        {
            header = "Modal!",
            isUserCloseable = true,
            onshow = undefined,
            dialogProps = undefined
        } : {
            header?: string | null | undefined,
            isUserCloseable?: boolean | undefined,
            onshow?: (view: any, closeModal: Function) => void | undefined,
            dialogProps?: any
        } = {})
    {
        switch (typeof modal) {
            case "undefined":
                return;
        }

        if (modal === null)
            return;

        modals.push({ modal, modalProps, header, isUserCloseable, onshow, dialogProps});
    }

    const attachment: Attachment = (hostElement) => {
        console.log(hostElement.nodeName);

        const queue = modals.pop();

        if (queue === undefined)
            return;

        const {modal, modalProps, onshow, header, isUserCloseable, dialogProps} = queue;

        const key = Date.now();

        function close() {
            const view = openedModals.get(key);

            if (view === undefined)
                return;

            unmount(view, {outro: true});
            openedModals.delete(key);

            if (openedModals.size === 0)
                isForeground = false;
        }

        const view = mount(ModalView, {target: modalHost, props: {children: modal, header, isUserCloseable, properties: modalProps, dialogProps}});
        openedModals.set(key, view);

        onshow?.(view, close);

        if (openedModals.size > 0)
            isForeground = true;
    };

    const hooks = {
        [createAttachmentKey()]: attachment
    }
</script>

<div class="modal-host"
     bind:this={modalHost}
     class:front={isForeground}
     {...hooks}>

</div>


<style>
    .modal-host {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.3);

        align-content: center;
        justify-content: center;
        display: flex;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .modal-host:not(.front) {
        pointer-events: none;
    }

    .modal-host.front {
        opacity: 1;
    }

    .modal-host > :global(div) {
        margin: auto;
        padding: 8px;
        position: absolute;
        align-self: center;
        transition: opacity 0.2s;
    }

    .modal-host > :global(div > .modal-layout) {
        min-width: 80px;
        min-height: 80px;
    }

    .modal-host > :global(div:not([inert])) {
        opacity: 0;
    }

    .modal-host > :global(div:nth-last-child(1 of :not([inert]))),
    .modal-host > :global(div:last-child) {
        display: block;
        opacity: 1;
    }
</style>