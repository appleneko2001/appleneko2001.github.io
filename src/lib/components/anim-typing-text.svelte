<script lang="ts">
    let {
        text = "text",
        disabled = false,
        duration = 200,
        initial = 0,
        repeat = $bindable(false),
        playForwardOnLoad = undefined,
        onPlayEnd = undefined
    }: {
        text?: string,
        disabled?: boolean,
        duration?: number,
        initial?: number,
        repeat?: boolean,
        playForwardOnLoad?: boolean | undefined,
        onPlayEnd?: Function | undefined
    } = $props();

    let the_text = text;
    text = "";
    let anim_reverse = false;
    let progress: number;
    let start: number = 0;

    const ongoingIntervals: Array<number> = [];

    export function setPlayEndCallback(func: Function | undefined) {
        onPlayEnd = func;
    }

    export function setText(str: string) {
        the_text = str;
    }

    export function setRepeat(b: boolean) {
        repeat = b;
    }

    export function reset() {
        clearIntervalEvents();
        initialFrame();
    }

    function initialFrame() {
        if (disabled) {
            text = the_text;
            return;
        }

        progress = initial;
        updateText();
    }

    function nextAnimationIteration() {
        start = Date.now();
    }

    function clearIntervalEvents() {
        let item: number | undefined;

        while ((item = ongoingIntervals.pop()) != undefined) {
            clearInterval(item);
        }
    }

    function updateText() {
        text = the_text.slice(0, Math.min(Math.max(progress, 0), the_text.length));
    }

    function triggerOnPlayEnd() {
        const callback = onPlayEnd;

        // symbol or anything else than function should block the way
        if (typeof callback !== "function")
            return;

        try {
            if (callback() === false) {
                console.log("stop playback and throwing callback because onPlayEnd returned false.");
                onPlayEnd = undefined;
                return;
            }
        } catch (e) {
            console.error(e);
            clearIntervalEvents();
        }
    }

    export function startTextAnimation(reverse: boolean = false) {
        if (disabled) {
            text = the_text;
            return;
        }

        nextAnimationIteration();
        const durationMS = duration;
        const durationEach = durationMS / the_text.length;
        let lastFrame = false;

        anim_reverse = reverse;

        clearIntervalEvents();

        const key = setInterval(() => {
            const now = Date.now();
            const delta = now - start;

            if (lastFrame) {
                lastFrame = false;

                triggerOnPlayEnd();

                if (repeat) {
                    initialFrame();
                    nextAnimationIteration();
                    updateText();
                } else {
                    clearIntervalEvents();
                }
                return;
            }

            // next frame and render
            if (delta < durationMS) {
                progress = progress + (anim_reverse ? -1 : 1);
                updateText();
                return;
            }

            progress = anim_reverse ? 0 : the_text.length;
            updateText();
            lastFrame = true;
        }, durationEach);
        ongoingIntervals.push(key);
    }

    reset();

    const init = playForwardOnLoad;
    if (init !== undefined)
        startTextAnimation(!init);
</script>

<span>{text}</span>
